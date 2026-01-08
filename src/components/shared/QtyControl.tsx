"use client"; // Клиентский компонент для использования Redux

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Trash2 } from "lucide-react";
import { Product } from "@/types/index";
import { addToCart, changeQuantity, } from "@/store/cart/cartSlice";

type QtyControlProps = {
    product: Product;
    className?: string;
};

/**
 * Компонент управления количеством товара в корзине
 * Позволяет увеличивать/уменьшать количество товара
 * Учитывает наличие товара на складе
 * 
 * @param product - товар для управления количеством
 * @param className - доп. CSS классы
 */
export default function QtyControl({ product, className = "" }: QtyControlProps) {
    const dispatch = useDispatch();
    
    // Получаем товар из корзины (если он там есть)
    const item = useSelector((state: RootState) =>
        state.cart.items.find((i) => i.productId === product.id)
    );

    // Текущее количество товара в корзине
    const quantity = item?.quantity ?? 0;
    // Количество товара на складе
    const stock = product.amount;

    /**
     * Увеличить количество товара
     * Проверяет наличие товара на складе
     */
    const handleIncrease = () => {
        if (quantity >= stock) return;

        if (!item) {
            // Если товара еще нет в корзине, добавляем его
            dispatch(addToCart(product.id));
        } else {
            // Если товар уже в корзине, увеличиваем количество
            dispatch(changeQuantity({ productId: product.id, delta: +1 }));
        }
    };

    /**
     * Уменьшить количество товара
     * Удаляет товар при количестве = 0
     */
    const handleDecrease = () => {
        if (!item) return;
        dispatch(changeQuantity({ productId: product.id, delta: -1 }));
    };


    // Если товара нет на складе
    if (stock === 0) {
        return (
            <div className="text--white text-sm select-none">
                Нет в наличии
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center space-x-3 text-black">
                {/* Кнопка уменьшения количества / Удаления товара */}
                <button
                    onClick={handleDecrease}
                    disabled={quantity === 0}
                    className={`group bg-white qty-btn btn ${
                        quantity === 0 ? "opacity-40" : "hover:bg-gray1/30"
                    }`}
                >
                    {quantity > 0 
                    ? (quantity === 1 
                        ? <Trash2 size={16} className="text-red1 group-hover:text-black transition-all duration-200"/> 
                        : "-") 
                    : "-"}
                </button>
                
                {/* Отображение текущего количества */}
                <span className={`text-lg w-8 text-center select-none ${className}`}>
                    {quantity}
                </span>
                
                {/* Кнопка увеличения количества */}
                <button
                    onClick={handleIncrease}
                    disabled={quantity >= stock}
                    className={`bg-white qty-btn btn ${
                        quantity >= stock ? "opacity-30" : "hover:bg-gray1/50"
                        }`
                    }
                >
                    +
                </button>
                
                
            </div>
            {quantity >= stock && (
                <span className="text-[10px] text-[#cc5d5d] m-2 select-none">
                    осталось {stock} шт на складе
                </span>
            )}
        </>
    );
}
