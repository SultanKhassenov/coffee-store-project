"use client";

import React from "react";
import QtyControl from "@/components/shared/QtyControl";
import { FooterProps } from "@/types/index";
import AddToCartButton from "../shared/AddToCartButton";

export default function ProductCardFooter({ product, isMobile }: FooterProps) {
    return (
        <div className="flex justify-end max-sm:justify-between items-center mt-4 space-x-3">
            <div className="text-lg font-medium">{product.price}₸</div>

            {/* на десктопах quantity control */}
            {!isMobile ? (
                <div
                    className={`flex h-fit py-1 rounded-md items-center ${
                    product.amount === 0
                        // если товаров нет в наличии - серый фон
                        ? "bg-gray1 text-white px-4"
                        : "bg-[#f7f7f7] min-w-58 px-1 flex justify-center items-center"
                    }`}
                >
                    <QtyControl product={product} />
                </div>
            ) : product.amount === 0 ? (
                // тоже серый фон с текстом но
                <span className="bg-gray1 py-3 px-5 text-white rounded-lg">
                    Нет в наличии
                </span>
                ) : (
                    // кнопка "добавить в корзину" для мобилок
                    <AddToCartButton 
                        product={product}
                        className="text-lg py-3 px-4 rounded-xl"
                    />
                )
            }
        </div>
    );
}
