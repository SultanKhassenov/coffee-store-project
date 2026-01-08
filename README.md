# ☕ Coffee Store

Современный e-commerce магазин кофе и чая, построенный на Next.js 15 с React 19. Приложение предоставляет быстрый и интуитивный интерфейс для покупки премиум напитков с полной информацией о составе и происхождении товаров.

## 🚀 Технологии

| Категория | Технология | Версия |
|-----------|-----------|--------|
| **Framework** | Next.js | 15.5.4 |
| **React** | React | 19.1.0 |
| **Язык** | TypeScript | ^5 |
| **State Management** | Redux Toolkit + RTK Query | ^2.9.0 |
| **Styling** | Tailwind CSS | ^4.1.14 |
| **UI Components** | Lucide React | ^0.544.0 |
| **Carousel** | Swiper | ^12.0.3 |
| **Notifications** | Sonner | ^2.0.7 |
| **Icons** | Simple Icons | ^15.16.1 |

## 📁 Структура проекта

```
coffeino/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout с providers
│   │   ├── providers.tsx            # Redux & React providers
│   │   ├── (landing)/               # Главная страница
│   │   ├── about-us/                # О компании
│   │   ├── catalog/                 # Каталог товаров
│   │   ├── product/[id]/            # Страница товара (динамическая)
│   │   └── api/                     # API routes
│   │
│   ├── components/
│   │   ├── layout/                  # Компоненты макета
│   │   │   ├── navbar/              # Навигационная панель
│   │   │   ├── footer/              # Подвал сайта
│   │   │   ├── cart/                # Компоненты корзины
│   │   │   └── sidebar/             # Боковое меню
│   │   │
│   │   ├── product/                 # Компоненты товаров
│   │   │   ├── ProductCard.tsx      # Карточка товара
│   │   │   ├── ProductCardImage.tsx # Изображение товара
│   │   │   ├── ProductCardDetails.tsx # Детали товара
│   │   │   └── ...
│   │   │
│   │   ├── sections/                # Секции страниц
│   │   │   ├── hero/                # Hero carousel
│   │   │   ├── catalog/             # Каталог с миникарточками
│   │   │   └── about-us/            # О компании
│   │   │
│   │   ├── shared/                  # Переиспользуемые компоненты
│   │   │   ├── AddToCartButton.tsx
│   │   │   └── QtyControl.tsx
│   │   │
│   │   └── ui/                      # Базовые UI компоненты
│   │       └──  Logo.tsx
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useIsMobile.tsx         # Определение мобильного устройства
│   │   └── useProductToast.tsx     # Toast-уведомления для товаров
│   │
│   ├── store/                       # Redux store
│   │   ├── store.ts                # Конфигурация store
│   │   ├── api/                    # RTK Query endpoints
│   │   │   └── productsApi.ts      # API для товаров
│   │   ├── cart/                   # Cart slice & selectors
│   │   │   ├── cartSlice.ts
│   │   │   └── cartSelector.ts
│   │   └── ui/                     # UI slice
│   │       └── uiSlice.ts
│   │
│   ├── types/                       # TypeScript типы
│   │   ├── index.ts                # Re-экспорты (main entry)
│   │   └── domain/                 # Типы по доменам
│   │       ├── product.ts          # Product, ProductDetails
│   │       ├── cart.ts             # CartItem
│   │       ├── api.ts              # PAGE_LINK, Props типы
│   │       └── hero.ts             # HeroSlide, SlideImage, SlideText
│   │
│   ├── lib/                        # Утилиты и константы
│   │   ├── MINICARD_SKELETONS.ts
│   │   ├── PAGES_LINKS.ts          # Ссылки на страницы
│   │   ├── PRODUCT_DETAILS_LABELS.ts
│   │   └── SIDEBAR_LINKS.ts
│   │
│   └── style/
│       └── globals.css             # Глобальные стили
│
├── public/
│   ├── api/
│   │   └── products.json           # БД товаров
│   └── assets/
│       ├── icons/                  # SVG иконки
│       └── images/                 # Изображения товаров
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
├── postcss.config.js
└── README.md
```

## 🏗️ Архитектура

### State Management (Redux)

```
Redux Store
├── cart (cartSlice)
│   ├── items: CartItem[]
│   ├── actions: addToCart, changeQuantity, removeFromCart
│   └── selectors: cartSelector
├── ui (uiSlice)
└── productsApi (RTK Query)
    ├── getProducts(): Product[]
    └── getProductById(id): Product
```

### Data Flow

```
Product JSON (public/api/products.json)
         ↓
    RTK Query (caching)
         ↓
    Redux Store
         ↓
    React Components
         ↓
    User Interface
```

### Cart Management

```
AddToCartButton / QtyControl
         ↓
   cartSlice actions
         ↓
    Redux State
         ↓
    CartSidebar / FloatingCart / DrawerCart
         ↓
    User sees changes
```

## 🎯 Ключевые компоненты

### Pages (Маршруты)

| Маршрут | Назначение |
|---------|-----------|
| `/` | Главная страница с hero carousel |
| `/catalog` | Каталог товаров с миникарточками |
| `/product/[id]` | Страница товара (динамическая) |
| `/about-us` | О компании |

### Layout Components

- **Navbar** — адаптивная навигация (мобильная + десктопная)
- **Footer** — подвал с информацией
- **CartSidebar** — выдвижная корзина (DrawerCart)
- **FloatingCart** — плавающая кнопка корзины
- **SidebarMenu** — боковое меню навигации

### Sections

- **HeroCarousel** — карусель с промо слайдами
- **CatalogSection** — каталог с сеткой миникарточек
- **AboutUsSection** — информационная секция

## 💾 Типы данных

### Product (товар)

```typescript
interface Product {
  id: number;              // Уникальный ID
  article: string;         // Артикул товара
  title: string;           // Название
  image: string;           // URL изображения
  price: number;           // Цена в копейках
  amount: number;          // Кол-во в наличии
  description: string;     // Описание
  details: ProductDetails; // Детальная информация
  badge: boolean;          // Наличие бейджа (новинка и т.п.)
}

interface ProductDetails {
  type: "Кофе" | "Чай";
  roast: 1 | 2 | 3 | 4 | 5;  // Уровень обжарки
  form: "Зерна" | "Молотый" | "Растворимый";
  composition: string;        // Состав (например, "Арабика 100%")
  volume: number;             // Объём в граммах
  originCountry: string;      // Страна происхождения
  manufacturerCountry: string; // Страна производителя
}
```

### Cart (корзина)

```typescript
interface CartItem {
  productId: number;
  quantity: number;
}
```

### Hero Carousel

```typescript
type HeroSlide = {
  id: string;
  content: { className?: string };
  images: SlideImage[];
  texts: SlideText[];
  containerClassName?: string;
  cta?: {
    label: string;
    href: string;
    className?: string;
  };
}
```

## 🚀 Установка и запуск

### Требования
- Node.js 18+ 
- npm или yarn

### Setup

```bash
# Установить зависимости
npm install

# Запустить dev server
npm run dev

# Открыть браузер
# http://localhost:3000
```

### Build

```bash
# Production build
npm run build

# Запустить production сервер
npm start
```

### Linting

```bash
npm run lint
```

## 🎨 Стилизация

Проект использует **Tailwind CSS v4** с кастомной конфигурацией:
- PostCSS для обработки стилей
- Глобальные стили в `src/style/globals.css`
- Компоненты используют className утилиты Tailwind

## 📡 API интеграция

### RTK Query (productsApi)

```typescript
// Получить все товары
const { data: products, isLoading } = useGetProductsQuery();

// Получить товар по ID
const { data: product } = useGetProductByIdQuery(productId);
```

**Endpoint'ы:**
- `GET /api/products.json` — получить все товары
- По ID фильтруется клиентом (трансформация данных)

## 🛒 Корзина

Состояние корзины хранится в Redux:

```typescript
// Добавить товар
dispatch(addToCart(productId));

// Изменить количество
dispatch(changeQuantity({ productId, delta: 1 }));

// Удалить товар
dispatch(removeFromCart(productId));
```

Компоненты корзины:
- **DrawerCart** — выдвижной ящик (мобильная версия)
- **FloatingCart** — плавающая кнопка
- **CartSidebar** — основной контейнер
- **CartItem** — элемент в корзине
- **CartHeader/Footer/Content** — структура корзины

## 🎯 UI/UX особенности

- ✅ **Responsive Design** — адаптивна для мобильных и десктопов
- ✅ **Toast Notifications** — уведомления через Sonner
- ✅ **Carousels** — красивые карусели через Swiper
- ✅ **Lazy Loading** — скелетоны для миникарточек
- ✅ **Dynamic Pages** — динамические страницы товаров

## 🔧 Утилиты и константы

- `PAGES_LINKS.ts` — массив ссылок навигации
- `PRODUCT_DETAILS_LABELS.ts` — интерпретация деталей товаров
- `SIDEBAR_LINKS.ts` — ссылки бокового меню
- `MINICARD_SKELETONS.ts` — конфигурация скелетонов
- `useIsMobile()` — hook для определения мобильного экрана
- `useProductToast()` — hook для toast-уведомлений

## 📋 Структура типов (types/)

Типы организованы по доменам в папке `src/types/domain/`:

- **product.ts** — `Product`, `ProductDetails`
- **cart.ts** — `CartItem`
- **api.ts** — `PAGE_LINK`, `FooterProps`, `AddToCartButtonProps`
- **hero.ts** — `HeroSlide`, `SlideImage`, `SlideText`

Все типы переэкспортируются из `src/types/index.ts` для удобного импорта:

```typescript
import { Product, CartItem, HeroSlide } from '@/types';
```

## ⚠️ Known Issues & Future Improvements

### Текущие ограничения:
1. **Static JSON** — товары хранятся в JSON файле
   - *Рекомендация*: Мигрировать на реальное API (Express, Firebase, Supabase и т.д.)

2. **getProductById неэффективный** — загружает весь JSON и фильтрует клиентом
   - *Решение*: Сделать отдельный endpoint `/api/products/[id]`

3. **No Error Handling** — отсутствует обработка ошибок при загрузке товаров
   - *Добавить*: Error UI и retry-логику

4. **No Pagination** — все товары загружаются сразу
   - *Добавить*: Pagination или infinite scroll

### Планы развития:
- [ ] Backend API (Node.js, Django, или другое)
- [ ] База данных (PostgreSQL, MongoDB)
- [ ] Система заказов и оплаты
- [ ] Система авторизации пользователей
- [ ] Избранное / Wishlist
- [ ] Отзывы и рейтинги
- [ ] Фильтрация и поиск товаров
- [ ] Analytics и tracking
- [ ] SEO оптимизация

## 📝 Contributing

Если хочешь улучшить проект:
1. Создай ветку для фичи (`git checkout -b feature/amazing-feature`)
2. Commit изменения (`git commit -m 'Add amazing feature'`)
3. Push ветку (`git push origin feature/amazing-feature`)
4. Открой Pull Request
