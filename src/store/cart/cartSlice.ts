// Redux slice для управления состоянием корзины
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types";

// Интерфейс состояния корзины
interface CartState {
  items: CartItem[]; // Массив товаров в корзине
}

// Начальное состояние корзины (пустая)
const initialState: CartState = {
  items: [],
};

/**
 * Redux slice для управления корзиной товаров
 * Содержит функции для добавления, удаления и изменения количества товаров
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Добавить товар в корзину или увеличить его количество
     * @param state - текущее состояние корзины
     * @param action - ID продукта для добавления
     */
    addToCart: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (i) => i.productId === action.payload
      );
      console.log("ADD TO CART:", action.payload);
      
      // Если товара нет в корзине, добавляем его с количеством 1
      if (!item) {
        state.items.push({ productId: action.payload, quantity: 1 });
      }
      // Если товар уже есть, компонент сам увеличит количество через changeQuantity
    },

    /**
     * Изменить количество товара в корзине
     * @param state - текущее состояние корзины
     * @param action - ID продукта и изменение количества (delta)
     */
    changeQuantity: (
      state,
      action: PayloadAction<{ productId: number; delta: number }>
    ) => {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId
      );
      console.log("CHANGE QTY:", action.payload);
      
      if (!item) return;

      // Изменяем количество на delta (может быть +1 или -1)
      item.quantity += action.payload.delta;

      // Если количество <= 0, удаляем товар из корзины
      if (item.quantity <= 0) {
        state.items = state.items.filter(
          (i) => i.productId !== action.payload.productId
        );
      }
    },

    /**
     * Очистить корзину полностью
     */
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Экспортируем actions для использования в компонентах
export const { addToCart, changeQuantity, clearCart } =
  cartSlice.actions;

// Экспортируем reducer для подключения в store
export default cartSlice.reducer;
