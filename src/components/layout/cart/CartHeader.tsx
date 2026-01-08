import { useIsMobile } from "@/hooks/useIsMobile";
import { clearCart } from "@/store/cart/cartSlice";
import { closeCart } from "@/store/ui/uiSlice";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";


export default function CartHeader() {
    const isMobile = useIsMobile();
    const dispatch = useDispatch();
    const pathname = usePathname();

    const isCatalogLike = pathname.startsWith("/catalog") || pathname.startsWith("/product");
    
    const handleClear = () => {
        dispatch(clearCart());
      };

    return (
        <div className="p-4 flex items-center justify-between border-b-1 border-gray-200">
          <h4 className="font-medium">Корзина</h4>

          {isMobile || !isCatalogLike ? (
            <button onClick={() => dispatch(closeCart())}>
              <X className="w-8 h-8 text-black/70" />
            </button>
          ) : (
            <button
              onClick={handleClear}
              className="py-2 px-4 rounded-lg bg-[#fff5f5] text-[#cc5d5d] hover:bg-[#ffeaea] transition"
            >
              Очистить
            </button>
          )}
        </div>
    );
}