import React from "react";
import { Product } from "@/types/index";
import { PRODUCT_DETAILS_LABELS } from "@/lib/PRODUCT_DETAILS_LABELS";

type ProductDetails = {
  product: Product;
  className?: string;
};

const DETAILS_ORDER = [
  "type",
  "roast",
  "form",
  "composition",
  "volume",
  "originCountry",
  "manufacturerCountry",
] as const;

export default function ProductCardDetails({product, className = "",}: ProductDetails) {
  // Определяем — мобильная ли версия
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Если мобильная — показываем только первые 3
  const visibleKeys = isMobile
    ? DETAILS_ORDER.slice(0, 5)
    : DETAILS_ORDER;

  return (
    <div
      className={`${className} flex flex-row mt-6 space-x-[10%] text-xs max-md:text-[3.5vw] text-coffee/75`}
    >
      {/* labels */}
      <div className="space-y-1">
        {visibleKeys.map((key) => (
          <div key={key}>
            <span>{PRODUCT_DETAILS_LABELS[key]}:</span>
          </div>
        ))}
      </div>

      {/* values */}
      <div className="space-y-1">
        {visibleKeys.map((key) => {
          const value = product.details[key];

          return (
            <div key={key} className="flex flex-row p-[0.8px]">
              {key === "roast" ? (
                [...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="/assets/icons/coffee-bean.png"
                    alt="roast"
                    className={`w-2 h-2 max-md:w-[2vw] max-md:h-[2vw] max-md:my-[0.5vw] ${
                      i < product.details.roast ? "opacity-100" : "opacity-25"
                    }`}
                  />
                ))
              ) : key === "volume" ? (
                `${value} g`
              ) : (
                value
              )}
            </div>
          );
        })}
      </div>    
    </div>
  );
}
