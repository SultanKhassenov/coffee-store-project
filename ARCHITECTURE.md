# Архитектура проекта Coffeino

## Общее описание

Coffeino - это современное веб-приложение для продажи кофе и чая, построенное на Next.js 15 с React 19. Приложение использует Redux Toolkit для управления состоянием и RTK Query для кэширования данных API.

## Структура папок

```
src/
├── app/                          # Next.js App Router - страницы приложения
│   ├── layout.tsx               # Root макет приложения (содержит провайдеры)
│   ├── providers.tsx            # Redux провайдер
│   ├── (landing)/               # Главная страница (route group)
│   │   └── page.tsx            # Главная страница с всеми секциями
│   ├── about-us/                # Страница "О нас"
│   ├── catalog/                 # Страница каталога товаров
│   │   └── page.tsx            # Список всех товаров
│   ├── product/[id]/            # Динамическая страница товара
│   │   ├── page.tsx            # Server component для загрузки товара
│   │   └── ProductPageClient.tsx # Client component с интерактивностью
│   └── api/                     # API routes (если используются)
│       ├── hero/               # API для получения слайдов героя
│       └── products/           # API для работы с товарами
│
├── components/                   # Компоненты React
│   ├── layout/                  # Компоненты макета
│   │   ├── cart/               # Компоненты корзины
│   │   │   ├── CartContent.tsx     # Содержимое корзины
│   │   │   ├── CartFooter.tsx      # Подвал корзины
│   │   │   ├── CartHeader.tsx      # Заголовок корзины
│   │   │   ├── CartIcon.tsx        # Иконка корзины в навигации
│   │   │   ├── CartItem.tsx        # Элемент товара в корзине
│   │   │   ├── CartSidebar.tsx     # Боковая панель корзины
│   │   │   ├── DrawerCart.tsx      # Выдвижная корзина (мобильная)
│   │   │   ├── EmptyCartSvg.tsx    # SVG для пустой корзины
│   │   │   └── FloatingCart.tsx    # Плавающая корзина (десктоп)
│   │   ├── navbar/              # Компоненты навигации
│   │   │   ├── Navbar.tsx       # Main navbar component
│   │   │   ├── DesktopNavbar.tsx # Навигация для десктопа
│   │   │   └── MobileNavbar.tsx  # Навигация для мобилки
│   │   ├── footer/              # Подвал сайта
│   │   │   └── Footer.tsx       # Компонент подвала
│   │   └── sidebar/             # Боковое меню
│   │       └── SidebarMenu.tsx  # Меню сайдбара
│   │
│   ├── product/                 # Компоненты товара
│   │   ├── ProductCard.tsx      # Основная карточка товара
│   │   ├── ProductCardDescription.tsx  # Описание товара
│   │   ├── ProductCardDetails.tsx      # Детали товара
│   │   ├── ProductCardFooter.tsx       # Цена и кнопка корзины
│   │   └── ProductCardImage.tsx        # Изображение товара
│   │
│   ├── sections/                # Секции страниц
│   │   ├── about-us/            # Секция "О нас"
│   │   │   ├── AboutUsLayout.tsx
│   │   │   └── AboutUsSection.tsx
│   │   ├── catalog/             # Секция каталога
│   │   │   ├── CatalogCarousel.tsx  # Карусель товаров
│   │   │   ├── CatalogSection.tsx   # Страница каталога
│   │   │   ├── MiniCardSkeleton.tsx # Скелетон загрузки
│   │   │   └── ProductMiniCard.tsx  # Мини-карточка товара
│   │   └── hero/                # Hero секция на главной
│   │       ├── HeroCarousel.tsx # Карусель героя
│   │       └── HeroSlideRenderer.tsx # Рендеринг слайда
│   │
│   ├── shared/                  # Общие компоненты
│   │   ├── AddToCartButton.tsx  # Кнопка добавления в корзину
│   │   └── QtyControl.tsx       # Управление количеством
│   │
│   └── ui/                      # UI компоненты
│       ├── GlassFilter.tsx      # Стекловидный фильтр
│       └── Logo.tsx             # Логотип приложения
│
├── hooks/                       # Кастомные React хуки
│   ├── useIsMobile.tsx         # Определение мобильного устройства
│   └── useProductToast.tsx     # Уведомления о товарах
│
├── lib/                         # Утилиты и константы
│   ├── MINICARD_SKELETONS.ts   # Скелетоны мини-карточек
│   ├── PAGES_LINKS.ts          # Ссылки на страницы
│   ├── PRODUCT_DETAILS_LABELS.ts # Метки для деталей товара
│   └── SIDEBAR_LINKS.ts        # Ссылки в сайдбаре
│
├── store/                       # Redux store
│   ├── store.ts                # Конфигурация store
│   ├── api/                    # RTK Query API
│   │   └── productsApi.ts      # API для товаров
│   ├── cart/                   # Redux slice для корзины
│   │   ├── cartSlice.ts        # Actions и reducers
│   │   └── cartSelector.ts     # Memoized selectors
│   └── ui/                     # Redux slice для UI
│       └── uiSlice.ts          # UI state (открыта ли корзина)
│
├── style/                       # Глобальные стили
│   └── globals.css             # Глобальный CSS
│
├── types/                       # TypeScript типы
│   ├── index.ts                # Экспорт всех типов
│   └── domain/                 # Доменные типы
│       ├── api.ts              # Типы для API
│       ├── cart.ts             # Типы для корзины
│       ├── hero.ts             # Типы для hero секции
│       └── product.ts          # Типы для товара
│
└── public/                      # Статические файлы
    ├── api/
    │   └── products.json       # JSON данные товаров
    └── assets/
        ├── icons/              # SVG иконки
        └── images/             # Изображения товаров
```

## Основные концепции

### Redux Store

```
store
├── cart          // Управление корзиной товаров
│   ├── items[]   // Массив товаров в корзине
│   └── actions: addToCart, changeQuantity, clearCart
├── ui            // UI состояние
│   └── isCartOpen // Открыта ли панель корзины
└── productsApi   // RTK Query кэш для API
```

### Типы данных

#### Product (Товар)
```typescript
{
  id: number
  article: string        // Артикул
  title: string         // Название
  image: string         // URL картинки
  price: number         // Цена в тенге
  amount: number        // Количество на складе
  description: string   // Описание
  details: {
    type: "Кофе" | "Чай"
    roast: 1-5          // Уровень обжарки
    form: "Зерна" | "Молотый" | "Растворимый"
    composition: string
    volume: number      // Объем в граммах
    originCountry: string
    manufacturerCountry: string
  }
  badge: boolean        // Есть ли специальный бейдж
}
```

#### CartItem (Элемент корзины)
```typescript
{
  productId: number
  quantity: number
}
```

## Поток данных

### Добавление товара в корзину

```
User clicks "Добавить в корзину"
    ↓
AddToCartButton component
    ↓
dispatch(addToCart(productId))
    ↓
Redux state.cart.items updated
    ↓
Component re-renders with updated quantity
    ↓
Toast notification shows "Добавлено в корзину"
```

### Загрузка товаров

```
Component mounts
    ↓
useGetProductsQuery() called
    ↓
RTK Query checks cache
    ↓
If fresh: return cached data
Else: fetch from /api/products.json
    ↓
Data stored in Redux store
    ↓
Components subscribe to updates
    ↓
UI re-renders with products
```

## Адаптивность

Приложение полностью адаптивно с использованием Tailwind CSS breakpoints:

- **max-sm** (< 640px) - Маленькие телефоны
- **max-md** (< 768px) - Планшеты и большие телефоны
- **min-md** (>= 768px) - Десктоп и выше

Примеры адаптивных компонентов:
- **Navbar** - два разных компонента (Desktop/Mobile)
- **Cart** - DrawerCart для мобилок, FloatingCart для десктопа
- **ProductCard** - разная сетка и расположение элементов

## Ключевые особенности

### Redux Toolkit + RTK Query
- Автоматическое кэширование данных товаров
- Управление состоянием корзины
- Синхронизация UI состояния (открыта ли корзина)

### Server vs Client Components
- Страницы товаров используют Server Components для SEO
- Интерактивные компоненты (корзина, навигация) - Client Components

### Оптимизация производительности
- Memoized selectors для корзины (selectCartItemsDetailed)
- Lazy loading изображений
- Условный рендеринг компонентов по размеру экрана

### Уведомления (Toast)
- Кастомный hook `useProductToast()` для показа уведомлений
- Используется библиотека `sonner` для красивых уведомлений
- Разные типы: успешное добавление, ошибка (нет товара)

## Файлы конфигурации

- **tsconfig.json** - конфигурация TypeScript (алиас `@/` для `src/`)
- **next.config.ts** - конфигурация Next.js
- **tailwind.config.js** - конфигурация Tailwind CSS
- **postcss.config.js** - конфигурация PostCSS
- **eslint.config.mjs** - конфигурация ESLint

## Точки входа

- **Главная страница** - `/src/app/(landing)/page.tsx`
- **Каталог** - `/src/app/catalog/page.tsx`
- **Страница товара** - `/src/app/product/[id]/page.tsx`
- **О нас** - `/src/app/about-us/page.tsx`
