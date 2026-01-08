// RTK Query API для управления данными продуктов
// Обеспечивает автоматическое кэширование и синхронизацию данных
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "@/types";

/**
 * API для получения данных о продуктах
 * Данные берутся из public/api/products.json
 * RTK Query автоматически кэширует результаты и управляет синхронизацией данных
 */
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/", // JSON файл находится в папке public
  }),
  endpoints: (builder) => ({
    /**
     * Получить все продукты
     * Кэшируется и автоматически обновляется при необходимости
     */
    getProducts: builder.query<Product[], void>({
      query: () => "api/products.json",
    }),

    /**
     * Получить один продукт по ID
     * Берет все продукты и фильтрует нужный из них
     */
    getProductById: builder.query<Product | undefined, number>({
      query: (id) => "api/products.json", // всё равно получаем весь json
      transformResponse: (products: Product[], _meta, id: number) =>
        products.find((p) => p.id === id),
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productsApi;
