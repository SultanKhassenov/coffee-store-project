import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CartItem from "./CartItem";
import EmptyCartSvg from "./EmptyCartSvg";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePathname } from "next/navigation";

export default function CartContent() {
    const cartItems = useSelector((s: RootState) => s.cart.items);

    const isMobile = useIsMobile();
    const pathname = usePathname();
    
    const isCatalogLike = pathname.startsWith("/catalog") || pathname.startsWith("/product");  

    if (cartItems.length === 0) {
        return <EmptyCartSvg />;
    }

      return (
        <div
          className={
            isCatalogLike && !isMobile
            ? "flex flex-col gap-y-4 divide-y divide-gray-200"
            : "grid md:grid-cols-3 lg:grid-cols-4 max-md:grid-cols-1 max-md:divide-y divide-gray-200 gap-x-4"
          }
        >
          {cartItems.map(item => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>
    );
}
