// Конфигурация Redux store приложения
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import uiReducer from "./ui/uiSlice";
import { productsApi } from "./api/productsApi";

/**
 * Глобальное Redux хранилище приложения
 * Содержит срезы для:
 * - cart: управление корзиной товаров
 * - ui: управление UI состоянием (открытие/закрытие модалей)
 * - productsApi: кэширование данных с API продуктов
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,          // Состояние корзины
    ui: uiReducer,              // Состояние UI
    [productsApi.reducerPath]: productsApi.reducer, // API слой для продуктов
  },
  // Добавляем middleware для RTK Query (кэширование API)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

// Типы для использования в компонентах
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
