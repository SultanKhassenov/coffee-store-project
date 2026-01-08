/**
 * Изображение на слайде героя
 * Используется для карусели на главной странице
 */
export type SlideImage = {
  src: string;           // URL изображения
  alt: string;           // Альтернативный текст
  className?: string;    // CSS классы для стилизации
};

/**
 * Текст на слайде героя
 * Может быть заголовком, описанием или другим текстом
 */
export type SlideText = {
  text: string;          // Текстовое содержимое
  className?: string;    // CSS классы для стилизации
};

/**
 * Структура одного слайда на главной странице (Hero секция)
 * Содержит изображения, тексты и call-to-action кнопку
 */
export type HeroSlide = {
  id: string;                        // Уникальный идентификатор слайда
  content: {
    className?: string;              // CSS классы контейнера
  };
  images: SlideImage[];              // Массив изображений на слайде
  texts: SlideText[];                // Массив текстов на слайде
  containerClassName?: string;       // CSS классы контейнера
  cta?: {                            // Call-to-action кнопка (необязательно)
    label: string;                   // Текст кнопки
    href: string;                    // Ссылка при клике
    className?: string;              // CSS классы кнопки
  };
};
