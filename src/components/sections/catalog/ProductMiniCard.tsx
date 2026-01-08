"use client"; // Клиентский компонент

import Link from "next/link";
import { Product } from "@/types";
import AddToCartButton from "@/components/shared/AddToCartButton";

/**
 * Мини-карточка товара для карусели каталога
 * Компактная версия карточки товара с основной информацией
 * Используется в слайдере на главной странице
 * 
 * @param product - товар для отображения
 */
export function ProductMiniCard({ product }: { product: Product }) {
  
  return (
    <div className="w-[220px] max-md:w-[130px] max-sm:w-[110px] mb-10 bg-white rounded-xl p-4 max-md:p-2 shadow-lg/20 flex flex-col">
      {/* Изображение товара (ссылка на страницу товара) */}
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-36 min-lg:p-2 min-md:p-1 max-md:h-20 max-sm:h-16 object-contain mx-auto"
        />
      </Link>

      {/* Название товара (ссылка на страницу товара) */}
      <Link
        href={`/product/${product.id}`}
        className="mt-2 font-semibold max-md:text-[12px] max-sm:text-[9px] line-clamp-2"
      >
        {product.title}
      </Link>

      {/* Объем и цена */}
      <div className="mt-auto">
        {/* Объем товара */}
        <p className="text-sm max-md:text-[10px] max-sm:text-[8px]">
          {product.details.volume} g
        </p>
        {/* Цена */}
        <div className="text-lg max-md:text-[13px] max-sm:text-[10px] font-semibold">
          {product.price} ₸
        </div>

        {/* Кнопка добавления в корзину */}
        <AddToCartButton 
          product={product}
          className="text-sm max-md:text-[8px] max-sm:text-[7px] w-full p-2 max-sm:p-1.5"
        />
      </div>
    </div>
  );
}
