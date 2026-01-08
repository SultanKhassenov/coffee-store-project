// Кнопка добавления товара в корзину
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addToCart } from "@/store/cart/cartSlice";
import { AddToCartButtonProps } from "@/types";
import { useProductToast } from "@/hooks/useProductToast";

/**
 * Компонент кнопки добавления товара в корзину
 * Проверяет наличие товара на складе и его наличие в корзине
 * Показывает соответствующие уведомления (toast)
 * 
 * @param product - товар для добавления в корзину
 * @param className - доп. CSS классы для кастомизации кнопки
 */
export default function AddToCartButton({ product, className = "" }: AddToCartButtonProps) {
  const dispatch = useDispatch();
  // Хуки для показа уведомлений
  const { showAddedToast, showOutOfStockToast } = useProductToast();

  // Ищем товар в корзине
  const item = useSelector((state: RootState) =>
    state.cart.items.find(i => i.productId === product.id)
  );

  /**
   * Обработчик клика на кнопку добавления в корзину
   * Проверяет наличие товара и не позволяет добавить его дважды
   */
  const handleAdd = () => {
    // Проверяем наличие товара на складе
    if (product.amount === 0) {
        showOutOfStockToast(product, 0);
        return;
    }

    // Если товар уже в корзине, ничего не делаем (управление через QtyControl)
    if (item) {
        return;
    }

    // Добавляем товар в корзину в первый раз
    dispatch(addToCart(product.id));
    showAddedToast(product);
  };

  return (
    <button
        className={`bg-coffee flex items-center justify-center text-white
            min-md:rounded-xl max-md:rounded-lg hover:bg-[#76533b] transition ${className}`}
        onClick={handleAdd}
    >
        Добавить в корзину
    </button>
  );
}
