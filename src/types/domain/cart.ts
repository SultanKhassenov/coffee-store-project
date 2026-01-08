/**
 * Элемент корзины
 * Содержит минимальную информацию для управления товаром в корзине
 */
export interface CartItem {
  productId: number; // ID продукта
  quantity: number;  // Количество товара
}
