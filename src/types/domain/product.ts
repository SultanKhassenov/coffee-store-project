/**
 * Детальная информация о продукте
 * Содержит специфические параметры для кофе и чая
 */
export interface ProductDetails {
  type: "Кофе" | "Чай";           // Тип напитка
  roast: 1 | 2 | 3 | 4 | 5;        // Уровень обжарки (1-5)
  form: "Зерна" | "Молотый" | "Растворимый"; // Форма продукта
  composition: string;              // Состав (100% арабика и т.д.)
  volume: number;                   // Объем в граммах
  originCountry: string;            // Страна происхождения
  manufacturerCountry: string;      // Страна производителя
}

/**
 * Основной интерфейс продукта
 * Используется во всем приложении для работы с товарами
 */
export interface Product {
  id: number;                       // Уникальный идентификатор
  article: string;                  // Артикул товара
  title: string;                    // Название товара
  image: string;                    // URL картинки
  price: number;                    // Цена в рублях
  amount: number;                   // Количество на складе
  description: string;              // Описание товара
  details: ProductDetails;          // Детальная информация
  badge: boolean;                   // Есть ли бейдж (например "Новинка", "Скидка")
}
