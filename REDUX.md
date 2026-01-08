# Redux State Management в Coffeino

## Обзор

Приложение использует Redux Toolkit для управления глобальным состоянием. Основные части:

1. **Redux Store** - централизованное хранилище состояния
2. **Slices** - группы reducers и actions для конкретной части состояния
3. **RTK Query** - специализированная библиотека для работы с API
4. **Selectors** - функции для безопасного доступа к состоянию

## Структура Store

```
store
├── cart
│   ├── items: CartItem[]
│   ├── actions:
│   │   ├── addToCart(productId)
│   │   ├── changeQuantity({ productId, delta })
│   │   └── clearCart()
│   └── selectors:
│       └── selectCartItemsDetailed (мемоизированный)
│
├── ui
│   ├── isCartOpen: boolean
│   └── actions:
│       ├── openCart()
│       ├── closeCart()
│       └── toggleCart()
│
└── productsApi (RTK Query)
    ├── queries:
    │   ├── getProducts
    │   └── getProductById(id)
    ├── reducer
    └── middleware
```

## 1. Cart Slice (src/store/cart/cartSlice.ts)

Управляет состоянием корзины товаров.

### Состояние

```typescript
interface CartState {
  items: CartItem[]  // Массив товаров в корзине
}

// CartItem
{
  productId: number
  quantity: number
}
```

### Начальное состояние

```typescript
const initialState = {
  items: []  // Пустая корзина при загрузке
}
```

### Actions (reducers)

#### addToCart
Добавляет товар в корзину или не делает ничего если он там уже есть.

```typescript
dispatch(addToCart(productId: number))

// Поведение:
// - Если товара нет в корзине → добавляет с quantity = 1
// - Если товар уже есть → ничего не делает (используй changeQuantity)
```

#### changeQuantity
Изменяет количество товара в корзине на delta.

```typescript
dispatch(changeQuantity({
  productId: number
  delta: number  // +1 или -1
}))

// Поведение:
// - Добавляет delta к текущему quantity
// - Если quantity <= 0 → удаляет товар из корзины
```

#### clearCart
Очищает корзину полностью.

```typescript
dispatch(clearCart())

// Результат: items = []
```

### Использование в компонентах

```typescript
import { useDispatch, useSelector } from "react-redux";
import { addToCart, changeQuantity, clearCart } from "@/store/cart/cartSlice";
import { RootState } from "@/store/store";

export function MyComponent() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const handleAdd = () => {
    dispatch(addToCart(productId));
  };
  
  const handleIncrease = () => {
    dispatch(changeQuantity({ productId, delta: 1 }));
  };
  
  const handleClear = () => {
    dispatch(clearCart());
  };
  
  return (
    // JSX
  );
}
```

## 2. UI Slice (src/store/ui/uiSlice.ts)

Управляет UI состоянием приложения.

### Состояние

```typescript
type UiState = {
  isCartOpen: boolean  // Открыта ли панель корзины
}
```

### Начальное состояние

```typescript
const initialState = {
  isCartOpen: false  // Корзина закрыта при загрузке
}
```

### Actions

#### openCart
```typescript
dispatch(openCart())
// Результат: isCartOpen = true
```

#### closeCart
```typescript
dispatch(closeCart())
// Результат: isCartOpen = false
```

#### toggleCart
```typescript
dispatch(toggleCart())
// Результат: isCartOpen = !isCartOpen
```

### Использование в компонентах

```typescript
import { useDispatch, useSelector } from "react-redux";
import { openCart, closeCart, toggleCart } from "@/store/ui/uiSlice";
import { RootState } from "@/store/store";

export function MyComponent() {
  const dispatch = useDispatch();
  const isCartOpen = useSelector((state: RootState) => state.ui.isCartOpen);
  
  const handleToggleCart = () => {
    dispatch(toggleCart());
  };
  
  return (
    <div>
      {isCartOpen && <Cart />}
      <button onClick={handleToggleCart}>
        Корзина {isCartOpen ? "открыта" : "закрыта"}
      </button>
    </div>
  );
}
```

## 3. Products API (src/store/api/productsApi.ts)

RTK Query для управления данными товаров.

### Возможности

RTK Query предоставляет:
- Автоматическое кэширование
- Автоматическую синхронизацию
- Отслеживание состояния загрузки (loading, error, success)
- Переиспользуемые хуки

### Endpoints

#### getProducts
Получает список всех товаров.

```typescript
const { 
  data: products = [],
  isLoading,
  isError,
  error
} = useGetProductsQuery()
```

**Параметры:** нет

**Возвращает:** `Product[]`

**Кэширование:** автоматическое

**Когда используется:**
- На главной странице (CatalogCarousel)
- На странице каталога (CatalogSection)
- Для populating корзины с информацией о товарах

#### getProductById
Получает один товар по ID.

```typescript
const { 
  data: product,
  isLoading,
  isError
} = useGetProductByIdQuery(productId)
```

**Параметры:** `id: number`

**Возвращает:** `Product | undefined`

**Кэширование:** автоматическое (кэш общий с getProducts)

**Когда используется:**
- На странице товара `/product/[id]`

### Как это работает

```
1. Компонент монтируется
   ↓
2. useGetProductsQuery() вызывается
   ↓
3. RTK Query проверяет кэш
   ↓
   - Если данные в кэше и свежие → возвращает их
   - Если кэш пуст или устарел → делает запрос
   ↓
4. Запрос отправляется на /api/products.json
   ↓
5. Данные приходят и кэшируются
   ↓
6. Компонент перерисовывается с новыми данными
```

## 4. Cart Selector (src/store/cart/cartSelector.ts)

Мемоизированный selector для получения детальной информации о товарах в корзине.

### selectCartItemsDetailed

```typescript
const detailedItems = useSelector(selectCartItemsDetailed)
```

**Возвращает:**
```typescript
Array<{
  productId: number
  quantity: number
  product: Product  // Полная информация о товаре
  totalPrice: number  // цена × количество
}>
```

**Как это работает:**

```typescript
export const selectCartItemsDetailed = createSelector(
  [
    (state: RootState) => state.cart.items,
    productsApi.endpoints.getProducts.select()
  ],
  (cartItems, productsResult) => {
    const products = productsResult.data ?? [];
    
    return cartItems.map((item) => {
      const product = products.find(p => p.id === item.productId);
      
      if (!product) return null;
      
      return {
        ...item,
        product,
        totalPrice: product.price * item.quantity
      };
    }).filter(Boolean);
  }
)
```

**Зачем мемоизировать?**
- Selector пересчитывается только когда меняются его зависимости
- Если количество товаров не изменилось, selector вернет тот же объект
- Это предотвращает ненужные перерисовки компонентов

**Использование в компонентах:**

```typescript
// В CartContent или других компонентах корзины
const detailedItems = useSelector(selectCartItemsDetailed);

// Теперь можно отобразить товары со всей информацией
const totalPrice = detailedItems.reduce((sum, item) => sum + item.totalPrice, 0);
```

## Типы

### RootState
```typescript
export type RootState = ReturnType<typeof store.getState>;

// Используется для типизации в useSelector
const items = useSelector((state: RootState) => state.cart.items);
```

### AppDispatch
```typescript
export type AppDispatch = typeof store.dispatch;

// Используется для типизации dispatch
const dispatch = useDispatch<AppDispatch>();
```

## Middleware

Redux store настроен с следующими middleware:

1. **Default middleware** - от Redux Toolkit
2. **RTK Query middleware** - для синхронизации API

```typescript
middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(productsApi.middleware)
```

## Примеры использования

### Пример 1: Добавление товара в корзину

```typescript
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cart/cartSlice";

function AddButton({ productId }) {
  const dispatch = useDispatch();
  
  const handleAdd = () => {
    dispatch(addToCart(productId));
    // showAddedToast(product);
  };
  
  return <button onClick={handleAdd}>Добавить</button>;
}
```

### Пример 2: Проверка товара в корзине

```typescript
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

function CartBadge() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  return <span className="badge">{totalQuantity}</span>;
}
```

### Пример 3: Отображение деталей корзины

```typescript
import { useSelector } from "react-redux";
import { selectCartItemsDetailed } from "@/store/cart/cartSelector";

function CartSummary() {
  const detailedItems = useSelector(selectCartItemsDetailed);
  
  const totalPrice = detailedItems.reduce((sum, item) => sum + item.totalPrice, 0);
  
  return (
    <div>
      {detailedItems.map(item => (
        <div key={item.productId}>
          <p>{item.product.title}</p>
          <p>Количество: {item.quantity}</p>
          <p>Сумма: {item.totalPrice} ₸</p>
        </div>
      ))}
      <p>Итого: {totalPrice} ₸</p>
    </div>
  );
}
```

### Пример 4: Получение товаров из API

```typescript
import { useGetProductsQuery } from "@/store/api/productsApi";

function ProductList() {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  
  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка</div>;
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## Отладка

### Redux DevTools

Redux Toolkit автоматически интегрируется с Redux DevTools browser extension.

Для отладки:
1. Установите Redux DevTools extension в браузер
2. Откройте DevTools и перейдите на вкладку Redux
3. Вы сможете видеть:
   - Все actions которые были dispatched
   - Как менялось состояние после каждого action
   - Разницу между состояниями
   - Время выполнения actions

### Console logging

```typescript
// В reducers или selectors можно добавить логирование
console.log("Old state:", state);
console.log("Action:", action);
console.log("New state after action:", newState);
```

## Лучшие практики

1. **Используй правильные hooks:**
   - `useSelector` для доступа к состоянию
   - `useDispatch` для изменения состояния

2. **Типизируй селекторы:**
   - Используй `RootState` для правильной типизации

3. **Используй мемоизированные селекторы:**
   - Создавай селекторы с `createSelector` для сложной логики

4. **Избегай тяжелых вычислений в компонентах:**
   - Делай вычисления в селекторах

5. **Логируй actions для отладки:**
   - Используй Redux DevTools для слежения за состоянием

