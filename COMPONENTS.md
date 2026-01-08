# Компоненты приложения Coffeino

## Структура компонентов

Все компоненты разделены на следующие категории:

### 1. Layout компоненты (src/components/layout/)

Компоненты, используемые во всех страницах приложения.

#### Navbar (Навигационная панель)
- **Navbar.tsx** - основной компонент (выбирает Desktop/Mobile версию)
- **DesktopNavbar.tsx** - навигация для десктопа (горизонтальное меню)
- **MobileNavbar.tsx** - навигация для мобилок (может быть свернутым меню)

#### Cart (Корзина)
- **CartIcon.tsx** - иконка корзины в навигации с количеством товаров
- **FloatingCart.tsx** - плавающая корзина в углу экрана (десктоп)
- **DrawerCart.tsx** - выдвижная корзина (мобильная версия)
- **CartSidebar.tsx** - боковая панель корзины (страница каталога)
- **CartContent.tsx** - содержимое корзины (список товаров)
- **CartHeader.tsx** - заголовок корзины
- **CartFooter.tsx** - подвал корзины (сумма и кнопка)
- **CartItem.tsx** - один товар в корзине
- **EmptyCartSvg.tsx** - SVG иллюстрация пустой корзины

#### Footer (Подвал)
- **Footer.tsx** - компонент подвала сайта

#### Sidebar (Боковое меню)
- **SidebarMenu.tsx** - компонент бокового меню (если используется)

### 2. Product компоненты (src/components/product/)

Компоненты для отображения товаров.

#### ProductCard
Основная карточка товара с полной информацией.

**Props:**
```typescript
{ product: Product }
```

**Структура:**
- Разбита на подкомпоненты для лучшей организации
- Адаптивная сетка (2 колонки на десктопе, другое расположение на мобилке)

**Подкомпоненты:**
- **ProductCardImage.tsx** - изображение товара
- **ProductCardDescription.tsx** - описание товара
- **ProductCardDetails.tsx** - технические детали товара
- **ProductCardFooter.tsx** - цена и кнопка добавления в корзину

### 3. Shared компоненты (src/components/shared/)

Переиспользуемые компоненты.

#### AddToCartButton
Кнопка добавления товара в корзину.

**Props:**
```typescript
{
  product: Product
  className?: string
}
```

**Поведение:**
- Проверяет наличие товара на складе
- Не позволяет добавить товар дважды
- Показывает уведомление об успешном добавлении или ошибке

#### QtyControl
Управление количеством товара в корзине.

**Props:**
```typescript
{
  product: Product
  className?: string
}
```

**Функции:**
- Увеличить количество (+1)
- Уменьшить количество (-1)
- Удалить товар при количестве = 1 (кнопка превращается в иконку корзины)
- Показывает "Нет в наличии" если товар закончился

### 4. Section компоненты (src/components/sections/)

Компоненты больших секций на страницах.

#### Hero секция (src/components/sections/hero/)
- **HeroCarousel.tsx** - карусель слайдов на главной странице
- **HeroSlideRenderer.tsx** - рендеринг одного слайда героя

#### Catalog секция (src/components/sections/catalog/)
- **CatalogCarousel.tsx** - карусель товаров на главной странице (Swiper)
- **CatalogSection.tsx** - полная страница каталога со всеми товарами
- **ProductMiniCard.tsx** - мини-карточка товара для карусели
- **MiniCardSkeleton.tsx** - скелетон загрузки мини-карточки

#### About Us секция (src/components/sections/about-us/)
- **AboutUsLayout.tsx** - макет секции "О нас"
- **AboutUsSection.tsx** - содержимое секции "О нас"

### 5. UI компоненты (src/components/ui/)

Базовые UI компоненты.

#### Logo
Логотип приложения.

#### GlassFilter
Стекловидный фильтр (может использоваться для фона или фильтрации).

## Используемые библиотеки для компонентов

### UI Framework
- **React 19** - основной фреймворк
- **Next.js 15** - фреймворк и маршрутизация
- **Tailwind CSS** - стилизация

### Иконки и изображения
- **Lucide React** - иконки (ShoppingCart, Trash2, и др.)
- **Simple Icons** - социальные иконки

### Интерактивность
- **Swiper** - карусели и слайдеры
- **React Redux** - доступ к состоянию
- **Sonner** - уведомления (toast)

## Паттерны компонентов

### Client Component Pattern
```typescript
"use client"; // Директива в начале файла

import { useDispatch, useSelector } from "react-redux";

// Компонент может использовать:
// - React hooks (useState, useEffect, etc)
// - Redux hooks (useDispatch, useSelector)
// - Event handlers (onClick, onChange, etc)
```

### Мемоизированные Selectors
```typescript
// В cartSelector.ts
export const selectCartItemsDetailed = createSelector(
  [/* зависимости */],
  (/* параметры */) => {
    // Сложная логика вычисления
    return результат;
  }
);

// Использование в компоненте
const detailedItems = useSelector(selectCartItemsDetailed);
```

## Адаптивные компоненты

### Использование Tailwind breakpoints

```typescript
// Скрыть на мобилке, показать на десктопе
className="hidden md:block"

// Показать на мобилке, скрыть на десктопе
className="block md:hidden"

// Разные размеры для разных экранов
className="text-sm max-md:text-xs max-sm:text-[10px]"

// Разные поля для разных экранов
className="p-4 max-md:p-2 max-sm:p-1"
```

### Компоненты со своей логикой адаптивности

```typescript
// ProductCard
const isMobile = useIsMobile();
return (
  <div className={isMobile ? "mobile-layout" : "desktop-layout"}>
    {/* разное содержимое для мобилки и десктопа */}
  </div>
)
```

## Примеры использования компонентов

### Добавление товара в корзину

```typescript
import AddToCartButton from "@/components/shared/AddToCartButton";

// В родительском компоненте
<AddToCartButton 
  product={product}
  className="w-full mt-4"
/>
```

### Управление количеством

```typescript
import QtyControl from "@/components/shared/QtyControl";

// В родительском компоненте
<QtyControl 
  product={product}
  className="text-lg"
/>
```

### Отображение карточки товара

```typescript
import ProductCard from "@/components/product/ProductCard";

// На странице каталога
<ProductCard product={product} />
```

### Использование карусели

```typescript
import { CatalogCarousel } from "@/components/sections/catalog/CatalogCarousel";

// На главной странице
<CatalogCarousel products={products} />
```

## Стилизация компонентов

Все компоненты используют Tailwind CSS для стилизации.

### Цветовая схема
- **Основной цвет кофе** - `bg-coffee` (коричневый)
- **Фон** - `bg-white` или светло-серый
- **Текст** - `text-coffee` или `text-black`
- **Ошибки** - `text-red-500`, `bg-red-500`
- **Успех** - `text-green-500`, `bg-green-500`

### Отступы и размеры
- Используются стандартные значения Tailwind (4, 8, 12, 16, etc)
- Часто используется `gap-` для расстояний между элементами
- `p-` для padding, `m-` для margin

## Лучшие практики

1. **Разделение ответственности** - каждый компонент должен делать одно
2. **Переиспользуемость** - использовать shared компоненты везде где можно
3. **Типизация** - использовать TypeScript для props
4. **Комментарии** - документировать сложную логику
5. **Адаптивность** - убедиться что компонент работает на всех размерах экрана
6. **Производительность** - использовать мемоизацию когда необходимо

