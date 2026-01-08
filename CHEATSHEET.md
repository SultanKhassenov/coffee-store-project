# ⚡ Шпаргалка Coffeino

Быстрый справочник для разработчиков.

---

## 🚀 Быстрый старт

```bash
# Установка
npm install

# Разработка
npm run dev

# Сборка
npm run build
npm start

# Лinting
npm run lint
```

---

## 📁 Главные файлы

```
src/
├── app/layout.tsx              # Root компонент (провайдеры)
├── store/store.ts              # Redux store
├── components/product/ProductCard.tsx  # Основной компонент
└── types/domain/product.ts     # Типы товара
```

---

## 🎯 Основные команды Redux

### Добавить товар в корзину
```typescript
import { addToCart } from "@/store/cart/cartSlice";
dispatch(addToCart(productId));
```

### Изменить количество
```typescript
import { changeQuantity } from "@/store/cart/cartSlice";
dispatch(changeQuantity({ productId, delta: 1 })); // +1
dispatch(changeQuantity({ productId, delta: -1 })); // -1
```

### Получить товары из API
```typescript
import { useGetProductsQuery } from "@/store/api/productsApi";
const { data: products = [], isLoading } = useGetProductsQuery();
```

### Получить товары в корзине
```typescript
import { useSelector } from "react-redux";
import { selectCartItemsDetailed } from "@/store/cart/cartSelector";
const detailedItems = useSelector(selectCartItemsDetailed);
```

### Проверить открыта ли корзина
```typescript
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
const isCartOpen = useSelector((state: RootState) => state.ui.isCartOpen);
```

---

## 🎨 Tailwind классы

### Адаптивность
```typescript
className="hidden md:block"         // Скрыть на мобилке
className="block md:hidden"         // Показать на мобилке
className="max-md:text-sm"          // На мобилке - меньше
className="p-4 md:p-6 lg:p-8"      // Разные паддинги
```

### Цвета
```typescript
className="bg-coffee"               // Основной фон
className="text-coffee"             // Основной текст
className="text-green-500"          // Успех
className="text-red-500"            // Ошибка
```

### Размеры
```typescript
className="text-sm"                 // 14px
className="text-lg"                 // 18px
className="text-2xl"                // 24px
className="text-3xl"                // 30px
```

### Отступы
```typescript
className="p-4"                     // padding
className="m-4"                     // margin
className="gap-4"                   // расстояние в flexbox
className="mb-4"                    // margin-bottom
className="mt-4"                    // margin-top
```

### Позиционирование
```typescript
className="flex"                    // flexbox
className="grid"                    # grid
className="absolute"                // position: absolute
className="sticky"                  // position: sticky
```

---

## 💻 Создание компонента

### Client Component с Redux
```typescript
"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

/**
 * Описание компонента
 */
export default function MyComponent({ title, onAction }: MyComponentProps) {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.cart.items);
  
  return (
    <div className="p-4">
      <h2>{title}</h2>
      {/* JSX */}
    </div>
  );
}
```

---

## 🔄 Типичные паттерны

### Управление состоянием
```typescript
const [count, setCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);
const [data, setData] = useState(null);
```

### Эффекты
```typescript
useEffect(() => {
  // код при монтировании
  return () => {
    // cleanup при размонтировании
  };
}, []); // пустой массив = выполнить один раз
```

### Условный рендер
```typescript
{isLoading && <div>Загрузка...</div>}
{error && <div>Ошибка</div>}
{data && <div>{data}</div>}
```

### Списки
```typescript
{products.map(product => (
  <ProductCard key={product.id} product={product} />
))}
```

---

## 📊 Типы данных

### Product
```typescript
{
  id: number
  title: string
  price: number
  amount: number          // на складе
  image: string
  description: string
  details: {
    type: "Кофе" | "Чай"
    roast: 1 | 2 | 3 | 4 | 5
    form: "Зерна" | "Молотый" | "Растворимый"
    composition: string
    volume: number
    originCountry: string
    manufacturerCountry: string
  }
  badge: boolean
}
```

### CartItem
```typescript
{
  productId: number
  quantity: number
}
```

---

## 🔗 Импорты

### Redux
```typescript
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { addToCart, changeQuantity } from "@/store/cart/cartSlice";
import { useGetProductsQuery } from "@/store/api/productsApi";
import { selectCartItemsDetailed } from "@/store/cart/cartSelector";
```

### Типы
```typescript
import { Product, CartItem } from "@/types";
import { Product } from "@/types/domain/product";
```

### Компоненты
```typescript
import ProductCard from "@/components/product/ProductCard";
import AddToCartButton from "@/components/shared/AddToCartButton";
import QtyControl from "@/components/shared/QtyControl";
```

### Hooks
```typescript
import { useIsMobile } from "@/hooks/useIsMobile";
import { useProductToast } from "@/hooks/useProductToast";
```

### Next.js
```typescript
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
```

### Иконки
```typescript
import { ShoppingCart, Trash2, Menu } from "lucide-react";
```

---

## 🐛 Отладка

### Console логирование
```typescript
console.log("value:", value);
console.error("error:", error);
console.table(array);
```

### React DevTools
- Установить расширение в браузер
- Смотреть компоненты и props
- Изменять state на лету

### Redux DevTools
- Установить расширение в браузер
- Видеть все actions
- Time-travel debugging

---

## ⚠️ Частые ошибки

### ❌ Мутация состояния
```typescript
// Неправильно
state.items.push(newItem);

// Правильно
setState([...state.items, newItem]);
```

### ❌ Забыли "use client"
```typescript
// Неправильно (в компоненте с hooks)
import { useState } from "react";

// Правильно
"use client";
import { useState } from "react";
```

### ❌ Нет типов для Redux
```typescript
// Неправильно
const state = useSelector(state => state.cart);

// Правильно
const state = useSelector((state: RootState) => state.cart);
```

### ❌ Бесконечный loop
```typescript
// Неправильно
useEffect(() => {
  fetchData();
}, [fetchData]); // функция создается каждый раз

// Правильно
useEffect(() => {
  fetchData();
}, []); // или useCallback для fetchData
```

---

## 📚 Ссылки на доки

| Что | Где |
|-----|-----|
| Структура | ARCHITECTURE.md |
| Компоненты | COMPONENTS.md |
| Redux | REDUX.md |
| Разработка | DEVELOPER_GUIDE.md |
| Навигация | DOCUMENTATION.md |

---

## 🎯 Основной поток

```
Пользователь кликает на товар
    ↓
AddToCartButton dispatch(addToCart(id))
    ↓
Redux обновляет state.cart.items
    ↓
Компоненты которые слушают это состояние перерисовываются
    ↓
CartIcon показывает новое количество товаров
    ↓
Показывается toast уведомление
```

---

## 📝 Комментарии в коде

```typescript
// Строчный комментарий
const x = 5; // объяснение

/**
 * Блочный комментарий
 * для функций и компонентов
 * @param name - описание параметра
 */
function myFunction(name) {}

{/* JSX комментарий */}
<div>content</div>
```

---

## 🔍 Поиск в проекте

### Найти компонент товара
```
src/components/product/
```

### Найти Redux логику
```
src/store/
```

### Найти типы
```
src/types/domain/
```

### Найти страницы
```
src/app/
```

---

## ⚡ Горячие клавиши

| Действие | Горячая клавиша |
|----------|-----------------|
| Поиск в файле | Ctrl+F |
| Поиск в проекте | Ctrl+Shift+F |
| Перейти к файлу | Ctrl+P |
| Переименовать | F2 |
| Форматировать | Shift+Alt+F |
| Comment | Ctrl+/ |

---

## 📱 Адаптивные размеры

| Breakpoint | Размер | Класс |
|-----------|--------|-------|
| sm | 640px | max-sm |
| md | 768px | max-md / md |
| lg | 1024px | lg |
| xl | 1280px | xl |
| 2xl | 1536px | 2xl |

---

## 🎨 Цветовая схема

```css
/* Основные цвета */
--coffee: #8B6F47        /* коричневый */
--white: #FFFFFF         /* белый */
--black: #000000         /* черный */
--gray: #F3F4F6          /* светло-серый */

/* Семантические цвета */
success: green-500       /* успех */
error: red-500          /* ошибка */
warning: yellow-500     /* предупреждение */
```

---

**Обновлено:** 9 января 2026 года

Эта шпаргалка содержит самую важную информацию для быстрого старта разработки в проекте Coffeino.

