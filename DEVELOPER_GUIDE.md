# Гайд для разработчиков Coffeino

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
# или
yarn install
```

### 2. Запуск dev сервера

```bash
npm run dev
# или
yarn dev
```

Приложение запустится на `http://localhost:3000`

### 3. Сборка для продакшена

```bash
npm run build
npm start
```

## Структура проекта

```
src/
├── app/              # Next.js страницы и маршруты
├── components/       # React компоненты
├── hooks/           # Кастомные hooks
├── lib/             # Утилиты и константы
├── store/           # Redux состояние
├── style/           # Глобальные стили
└── types/           # TypeScript типы
```

## Основные технологии

| Технология | Назначение | Версия |
|---|---|---|
| Next.js | Framework | 15.5.4 |
| React | UI Library | 19.1.0 |
| TypeScript | Язык программирования | ^5 |
| Redux Toolkit | Управление состоянием | ^2.9.0 |
| RTK Query | API клиент | в составе Redux Toolkit |
| Tailwind CSS | Стилизация | ^4.1.14 |
| Swiper | Карусели | ^12.0.3 |
| Sonner | Уведомления | ^2.0.7 |

## Разработка

### Создание нового компонента

```typescript
// src/components/MyComponent.tsx
"use client"; // если используются hooks

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

/**
 * Описание компонента
 * @param title - заголовок
 * @param onAction - callback при действии
 */
export default function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div className="p-4 bg-white rounded-lg">
      <h2 className="text-lg font-semibold">{title}</h2>
      <button onClick={onAction} className="bg-coffee text-white px-4 py-2 rounded">
        Действие
      </button>
    </div>
  );
}
```

### Использование Redux в компоненте

```typescript
"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addToCart } from "@/store/cart/cartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const handleAdd = () => {
    dispatch(addToCart(product.id));
  };
  
  return (
    <div>
      <h3>{product.title}</h3>
      <p>{product.price} ₸</p>
      <button onClick={handleAdd}>Добавить в корзину</button>
    </div>
  );
}
```

### Использование API с RTK Query

```typescript
"use client";

import { useGetProductsQuery } from "@/store/api/productsApi";

export default function ProductList() {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  
  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки</div>;
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <div key={product.id} className="border p-4 rounded">
          <h3>{product.title}</h3>
          <p>{product.price} ₸</p>
        </div>
      ))}
    </div>
  );
}
```

### Добавление новой страницы

```typescript
// src/app/new-page/page.tsx
"use client";

/**
 * Описание страницы
 */
export default function NewPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Новая страница</h1>
      {/* Содержимое */}
    </div>
  );
}
```

## Стилизация

Приложение использует Tailwind CSS для всей стилизации.

### Основные классы

```typescript
// Цвета
className="bg-coffee"     // Основной цвет (коричневый)
className="text-coffee"   // Текст основного цвета

// Размеры экрана
className="max-md:hidden"  // Скрыть на мобилке
className="hidden md:block" // Показать на десктопе

// Отступы
className="p-4"           // padding: 1rem
className="m-4"           // margin: 1rem
className="gap-4"         // gap: 1rem (для flexbox/grid)

// Размеры шрифта
className="text-sm"       // 14px
className="text-lg"       // 18px
className="text-2xl"      // 24px

// Закругления
className="rounded"       // border-radius: 0.25rem
className="rounded-xl"    // border-radius: 0.75rem
```

### Адаптивные стили

```typescript
// На разных экранах
className="text-lg max-md:text-sm max-sm:text-xs"

// Разные размеры
className="w-full md:w-1/2 lg:w-1/3"

// Разные паддинги
className="p-4 md:p-6 lg:p-8"
```

## TypeScript типизация

### Типы Props компонента

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function Button({ label, onClick, disabled, className }: ButtonProps) {
  // ...
}
```

### Типы из Redux

```typescript
import { RootState } from "@/store/store";

// Получение типизированного селектора
const items = useSelector((state: RootState) => state.cart.items);

// Типизация dispatch
import { AppDispatch } from "@/store/store";
const dispatch = useDispatch<AppDispatch>();
```

### Типы товаров

```typescript
import { Product, CartItem, ProductDetails } from "@/types";

function showProduct(product: Product) {
  console.log(product.title, product.price);
}
```

## Общие паттерны

### 1. Управление состоянием

```typescript
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

### 2. Эффекты и жизненный цикл

```typescript
"use client";

import { useEffect } from "react";

export function DataLoader() {
  useEffect(() => {
    // Код выполняется при монтировании компонента
    console.log("Component mounted");
    
    return () => {
      // Cleanup function
      console.log("Component unmounted");
    };
  }, []); // Пустой массив - эффект выполняется один раз
  
  return <div>Data Loader</div>;
}
```

### 3. Обработка форм

```typescript
"use client";

import { useState } from "react";

export function SearchForm() {
  const [query, setQuery] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search:", query);
    // Отправить запрос
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск..."
      />
      <button type="submit">Поиск</button>
    </form>
  );
}
```

## Отладка

### 1. Redux DevTools

Установите [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools-extension) в браузер.

В DevTools можно:
- Видеть все actions
- Путешествовать по времени (time travel debugging)
- Смотреть разницу между состояниями

### 2. Console логирование

```typescript
// В компонентах
useEffect(() => {
  console.log("Product loaded:", product);
}, [product]);

// В reducers
console.log("Dispatching action:", action);
```

### 3. React DevTools

Установите [React DevTools Extension](https://react.dev/learn/react-developer-tools) для инспекции компонентов.

## Частые проблемы

### Problem: Бесконечный loop в useEffect

```typescript
// ❌ Неправильно - создает новый объект каждый раз
useEffect(() => {
  fetchData();
}, [{ id: 1 }]); // Зависимость меняется на каждый рендер

// ✅ Правильно
useEffect(() => {
  fetchData();
}, [id]); // Используй примитивные значения
```

### Problem: "Cannot read property of undefined"

```typescript
// ❌ Неправильно
const title = product.title; // product может быть undefined

// ✅ Правильно
const title = product?.title; // Optional chaining
const price = product?.price ?? 0; // Nullish coalescing
```

### Problem: Компонент не перерисовывается

```typescript
// ❌ Неправильно - мутируешь состояние
state.items.push(newItem);

// ✅ Правильно - создаешь новый массив
setState([...state.items, newItem]);
```

## Коммит сообщения

Используй semantic commit messages:

```
feat: добавил новую функцию
fix: исправил баг
docs: обновил документацию
style: изменил стили
refactor: переорганизовал код
test: добавил тесты
chore: обновил зависимости
```

Пример:
```
git commit -m "feat: добавил фильтр товаров в каталоге"
```

## Ссылки на документацию

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Swiper](https://swiperjs.com)
- [Sonner Toasts](https://sonner.emilkowal.ski)
- [Lucide Icons](https://lucide.dev)

## Контрибьютинг

При добавлении новой функции:

1. Создай новую ветку
   ```bash
   git checkout -b feature/название-функции
   ```

2. Разработай функцию

3. Протестируй локально
   ```bash
   npm run dev
   ```

4. Закоммитись с понятным сообщением
   ```bash
   git commit -m "feat: описание функции"
   ```

5. Push в репозиторий
   ```bash
   git push origin feature/название-функции
   ```

6. Создай Pull Request

## Performance Tips

1. **Используй React.memo для дорогих компонентов**
   ```typescript
   const ProductCard = React.memo(({ product }) => {
     return <div>{product.title}</div>;
   });
   ```

2. **Мемоизируй селекторы**
   ```typescript
   export const selectCartTotal = createSelector(
     [selectCartItems],
     items => items.reduce((sum, item) => sum + item.price * item.qty, 0)
   );
   ```

3. **Используй Next.js Image компонент**
   ```typescript
   import Image from "next/image";
   
   <Image src={product.image} alt={product.title} width={300} height={300} />
   ```

4. **Lazy load компоненты**
   ```typescript
   import dynamic from "next/dynamic";
   
   const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
     loading: () => <div>Loading...</div>
   });
   ```

## Развертывание

### На Vercel (рекомендуется)

1. Push код на GitHub
2. Зайди на [vercel.com](https://vercel.com)
3. Импортируй проект
4. Vercel автоматически развернет приложение

### На другие платформы

Приложение использует стандартный Next.js, поэтому может быть развернуто на:
- Netlify
- AWS Amplify
- DigitalOcean
- Heroku
- Любой сервер с Node.js

