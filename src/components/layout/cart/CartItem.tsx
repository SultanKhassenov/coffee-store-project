"use client";

import { CartItem as CartItemType } from "@/types/index";
import QtyControl from "@/components/shared/QtyControl";
import { useGetProductByIdQuery } from "@/store/api/productsApi";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { data: product } = useGetProductByIdQuery(item.productId);

  if (!product) return null;
  
  return (
    <div className="flex items-start py-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-14 h-14 object-contain"
      />
      <div className="flex flex-col ml-2 text-sm text-[#777] flex-1">
        <p className="text-black">{product.title}</p>
        <p>{product.details.volume} g</p>

        <div className="flex flex-row my-2 space-x-1">
          <p className="text-black">{product.price}₸</p>
          <p className="font-light">/шт</p>
        </div>

        <QtyControl
          product={product}
          className="bg-gray1 text-white w-8 h-8 rounded-[10px] flex justify-center items-center"
        />
      </div>
    </div>
  );
}
