import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "@/store/api/productsApi";
import { clearCart } from "@/store/cart/cartSlice";
import { RootState } from "@/store/store";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePathname } from "next/navigation";

export default function CartFooter() {
    const isMobile = useIsMobile();
    const dispatch = useDispatch();
    const pathname = usePathname();
    
    const { data: products } = useGetProductsQuery();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const isCatalogLike = pathname.startsWith("/catalog") || pathname.startsWith("/product");

    const total = cartItems.reduce((sum, item) => {
      const product = products?.find(p => p.id === item.productId);
      return product ? sum + product.price * item.quantity : sum;
    }, 0);

    const handleClear = () => {
      dispatch(clearCart());
    };

    if (cartItems.length > 0) return (
        <div className="p-4  border-t-1 border-gray-200">
          {/* Total price */}
          <div className="flex items-center justify-between mb-4">
            <p>Итого к оплате</p>
            <div className="text-xl max-lg:text-[14px]">
              {total.toLocaleString()}₸
            </div>
          </div>

          <div className="flex max-md:flex-col-reverse max-md:gap-y-2 justify-between">
            {/* Order button */}
            <button className={`w-full ${!isCatalogLike && "min-md:w-29/50"} py-2 rounded-lg bg-coffee text-white button-shimmer`}>
                Оформить заказ
            </button>

            {(isMobile || !isCatalogLike) && (
                <button
                    onClick={handleClear}
                    className="max-md:w-full min-md:w-2/5 py-2 rounded-lg bg-[#fff5f5] text-[#cc5d5d] hover:bg-[#ffeaea] transition"
                >
                    Очистить корзину
                </button>
            )}
          </div>
        </div>
      
    );
}