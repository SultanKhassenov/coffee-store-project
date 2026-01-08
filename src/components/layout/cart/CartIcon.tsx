// Иконка корзины с индикатором количества товаров
import { RootState } from "@/store/store";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

/**
 * Компонент иконки корзины
 * Отображает иконку корзины с количеством товаров в виде бейджа
 * Используется в навигационной панели
 */
export default function CartIcon () {
    // Получаем товары из корзины
    const cartItems = useSelector((state: RootState) => state.cart.items);

    // Суммируем количество всех товаров в корзине
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
    return (
        <div className="relative">
            {/* Иконка корзины */}
            <ShoppingCart className="w-10 h-10 min-md:pr-1 max-md:w-6 max-md:h-6 max-sm:w-5.5 max-sm:h-5.5"/>
            
            {/* Бейдж с количеством товаров (отображается только если есть товары) */}
            {totalQuantity > 0 && (
                <span className="absolute top-[-30%] right-[-30%]
                    min-md:w-5 min-md:h-5 max-md:w-4 max-md:h-4 max-sm:w-3 max-sm:h-3 
                    min-md:text-[13px] max-md:text-[11px] max-sm:text-[8px] rounded-full bg-red-500 text-white font-black flex items-center justify-center">
                    {totalQuantity}
                </span>
            )}
        </div>
    )
}