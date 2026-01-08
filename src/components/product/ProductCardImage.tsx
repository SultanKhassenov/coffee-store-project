import React from "react";
import { Product } from "@/types/index";

export default function ProductCardImage({ product }: { product: Product }) {
  return (
    <div className="bg-soft flex items-center justify-center relative min-md:max-h-[40vw]
        min-md:row-span-2 min-md:col-span-1 max-md:col-span-1 max-md:row-span-1">
      {product.badge && (
        <div className="absolute left-0 top-0 bg-[#d32e00] text-white px-3 py-1 text-xs">
          НОВИНКА
        </div>
      )}
      <img src={product.image} alt={product.title} className="object-contain p-5" />
    </div>
  );
}
