"use client"; // Клиентский компонент для использования хуков Redux

import CartSidebar from "@/components/layout/cart/CartSidebar";
import ProductCard from "@/components/product/ProductCard";
import { useGetProductsQuery } from "@/store/api/productsApi";

/**
 * Страница каталога товаров
 * Отображает полный список всех товаров в виде карточек
 * Имеет боковую панель с корзиной
 */
export default function CatalogPage() {
  // Получаем все товары из API
  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  // Отображаем загрузку
  if (isLoading) return <div>Загрузка...</div>;
  // Отображаем ошибку
  if (isError) return <div>Ошибка загрузки</div>;

  return (
    <>
      {/* Заголовок страницы */}
      <h2 className="text-lg max-md:text-2xl m-10 ">Каталог товаров</h2>

      {/* Основной контент: список товаров + боковая панель */}
      <div className="flex flex-row w-[95%] space-x-4 mx-auto mb-[5vw]">
        {/* Список товаров */}
        <div className="space-y-5 min-md:w-3/4">
          {products.map((p) => (
            <div key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        
        {/* Боковая панель с корзиной */}
        <CartSidebar />
      </div>
    </> 
    );
}