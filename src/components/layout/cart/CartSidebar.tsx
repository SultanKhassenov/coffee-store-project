"use client";

import CartHeader from "./CartHeader";
import CartContent from "./CartContent";
import CartFooter from "./CartFooter";

export default function CartSidebar() {
  return (
    <aside className="sticky top-20 w-1/4 h-fit rounded-xl max-md:hidden">
      <CartHeader />
      <div className="p-4 max-h-[60vh] overflow-y-auto">
        <CartContent />
      </div>
      <CartFooter />
    </aside>
  );
}
