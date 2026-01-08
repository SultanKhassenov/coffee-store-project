"use client";

import { useDispatch, useSelector } from "react-redux";
import CartIcon from "./CartIcon";
import { RootState } from "@/store/store";
import { useIsMobile } from "@/hooks/useIsMobile";
import { toggleCart } from "@/store/ui/uiSlice";
import { usePathname } from "next/navigation";

export default function FloatingCart() {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const isCartOpen = useSelector(
    (state: RootState) => state.ui.isCartOpen
);
  const isMobile = useIsMobile();

  const isCatalogLike = pathname.startsWith("/catalog") || pathname.startsWith("/product");
  
  if (isMobile || isCatalogLike) return null;

  return (
    <button
      onClick={() => dispatch(toggleCart())}
      className={`fixed z-50 bottom-5 right-5 rounded-[50px] bg-white
        flex justify-center items-center shadow-[0_5px_15px_#000]/15 hover:bg-coffee-light hover:text-white hover:-translate-y-2 transition-all duration-500
            ${!isCartOpen
                ? "translate-x-0 scale-100 opacity-100 w-16 h-16"
                : "min-md:rounded-2xl min-md:-translate-x-1/2 min-md:top-1/2 min-md:left-1/2 min-md:-translate-y-1/2" + 
                " min-md:hover:-translate-y-1/2 lg:w-[800px] md:w-[600px] lg:h-[250px] md:h-[300px]"
            }
        `}
        aria-label="Открыть корзину"
    >
      <CartIcon />
    </button>
  );
}

