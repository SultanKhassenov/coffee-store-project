"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { closeCart } from "@/store/ui/uiSlice";
import CartHeader from "./CartHeader";
import CartFooter from "./CartFooter";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePathname } from "next/navigation";
import CartContent from "./CartContent";

export default function DrawerCart() {
  const dispatch = useDispatch();
  const isOpen = useSelector((s: RootState) => s.ui.isCartOpen);
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const isCatalogLike = pathname.startsWith("/catalog") || pathname.startsWith("/product");
  if (!isMobile && isCatalogLike) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={() => dispatch(closeCart())}
        className={`
          fixed inset-0 bg-black/40 z-100 transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* DRAWER */}
      <aside
        className={`
          fixed z-110 bg-white rounded-xl shadow-xl transition-transform duration-300 ease-out
          lg:w-[800px] md:w-[600px] max-md:w-[350px] max-sm:w-[275px] max-md:top-20 max-md:right-3
          min-md:top-1/2 min-md:left-1/2 min-md:-translate-x-1/2 min-md:-translate-y-1/2
          ${isOpen
            ? "max-md:translate-x-0 scale-100 opacity-100"
            : "max-md:translate-x-12/10 max-md:translate-y-0 min-md:scale-0 min-md:opacity-0 max-md:opacity-0"}
        `}
      >
        <CartHeader />
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <CartContent />
        </div>
        <CartFooter />
      </aside>
    </>
  );
}
