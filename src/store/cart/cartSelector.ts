// Selector для получения детальной информации об товарах в корзине
// Объединяет данные из корзины с информацией о продуктах
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { productsApi } from "../api/productsApi";

/**
 * Selector для получения детальной информации о товарах в корзине
 * Объединяет товары из корзины с их полной информацией из API
 * и рассчитывает общую стоимость для каждого товара
 * 
 * @returns Массив товаров с полной информацией и расчетной стоимостью
 */
export const selectCartItemsDetailed = createSelector(
  [
    // Берем товары из state.cart.items
    (state: RootState) => state.cart.items,
    // Берем результат запроса всех продуктов
    productsApi.endpoints.getProducts.select(),
  ],
  (cartItems, productsResult) => {
    // Получаем массив всех продуктов (или пустой массив если данных нет)
    const products = productsResult.data ?? [];

    // Преобразуем товары корзины, обогащая их полной информацией
    return cartItems.map((item) => {
      const product = products.find(
        (p) => p.id === item.productId
      );

      // Фильтруем null значения (товары, которых нет в продуктах)
      if (!product) return null;

      return {
        ...item,
        product,                              // Полная информация о товаре
        totalPrice: product.price * item.quantity, // Сумма для этого товара
      };
    }).filter(Boolean); // Удаляем null значения
  }
);
