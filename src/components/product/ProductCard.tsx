"use client"; // Клиентский компонент для использования хуков

import React from "react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";
import ProductCardDescription from "./ProductCardDescription";
import ProductCardDetails from "./ProductCardDetails";
import ProductCardImage from "./ProductCardImage";
import ProductCardFooter from "./ProductCardFooter";
import { Product } from "@/types/index";

/**
 * Компонент карточки товара
 * Отображает основную информацию о товаре (изображение, название, цена, описание, детали)
 * Адаптивен - меняет расположение элементов для мобильных и десктопных устройств
 * 
 * @param product - объект товара для отображения
 */
export default function ProductCard({ product }: { product: Product }) {
    // Определяем, мобильное ли устройство
    const isMobile = useIsMobile();

    return (
        <div
            // Сетка 2 колонки на десктопе, 2 колонки на мобилке
            className={`grid relative h-full p-4 bg-white ${!isMobile
                ? "grid-cols-[35%_65%] grid-rows-[auto_auto] gap-6 w-fit pr-15"
                : "w-full gap-3 grid-cols-[auto_auto] grid-rows-[auto_auto_auto]"
            }`}
        >
            {/* Грид ячейка 1: Изображение товара */}
            <ProductCardImage product={product} />

            {/* Грид ячейка 2: Название, артикул, описание/детали */}
            <div className="flex flex-col md:col-start-2 md:row-start-1 col-start-2 row-start-1">
                {/* Артикул товара */}
                <p className="text-sm text-coffee/75">
                    Артикул: {product.article}
                </p>
                
                {/* Ссылка на страницу товара */}
                <Link href={`/product/${product.id}`} className="text-2xl font-medium my-3 text-coffee">
                    {product.title}
                </Link>

                {/* Показываем описание на десктопе, детали на мобилке */}
                {!isMobile
                    ? <ProductCardDescription text={product.description} />
                    : <ProductCardDetails product={product} />
                }
            </div>
            

            {/* Грид ячейка 3: Объем, цена и кнопка добавления в корзину */}
            <div className="md:col-start-2 md:row-start-2 col-span-2 row-start-3 flex flex-col justify-between relative">
                {/* Бейдж с объемом товара */}
                <div className="flex items-center gap-4">
                    <div className="px-3.5 py-2 mb-4 rounded text-white bg-coffee text-sm max-md:text-lg">
                        {product.details.volume} g
                    </div>
                </div>

                {/* Показываем детали на десктопе, описание на мобилке */}
                {!isMobile 
                    ? <ProductCardDetails product={product} />
                    : <ProductCardDescription text={product.description} />
                }
                
                {/* Цена и кнопка добавления в корзину */}
                <ProductCardFooter product={product} isMobile={isMobile} />
            </div>
        </div>
    );
}
