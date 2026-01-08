// Redux slice для управления UI состоянием приложения
import { createSlice } from "@reduxjs/toolkit";

// Интерфейс состояния UI
type UiState = {
  isCartOpen: boolean; // Открыта ли боковая панель корзины
};

// Начальное состояние (корзина закрыта)
const initialState: UiState = {
  isCartOpen: false,
};

/**
 * Redux slice для управления UI компонентами приложения
 * В данном случае управляет состоянием корзины (открыто/закрыто)
 */
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Открыть корзину
    openCart: (state) => {
      state.isCartOpen = true;
    },
    // Закрыть корзину
    closeCart: (state) => {
      state.isCartOpen = false;
    },
    // Переключить состояние корзины
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

// Экспортируем actions
export const { openCart, closeCart, toggleCart } = uiSlice.actions;

// Экспортируем reducer
export default uiSlice.reducer;
