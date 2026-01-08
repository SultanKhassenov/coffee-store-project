"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import SlidebarMenu from "../sidebar/SidebarMenu";
import Logo from "../../ui/Logo";
import CartIcon from "../cart/CartIcon";
import { useDispatch } from "react-redux";
import { toggleCart } from "@/store/ui/uiSlice";

export default function MobileNavbar() {
  const [isSlidebarOpen, setSlidebarOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex items-center justify-between px-4 py-3 max-sm:py-2">
        <div className="flex flex-row space-x-3">
          {/* Бургер */}
          <button 
            onClick={() => setSlidebarOpen(() => !isSlidebarOpen)} 
            className="nav-btn btn">
            <Menu />
          </button>

          {/* Переключатель языка */}
          <button className="nav-btn btn p-2 flex items-center space-x-1">
            <p>ENG</p>
            <ChevronDown className="w-3" />
          </button>
        </div>

        {/* Лого */}
        <Logo media="sm"/>

        <div className="flex flex-row space-x-3">
        {/* Каталог */}
          <Link
            href="/catalog"
            className="font-medium text-coffee p-2 nav-btn btn"
          >
            Каталог
          </Link>

          {/* Корзина */}
          <button 
            className="nav-btn btn"
            onClick={() => dispatch(toggleCart())}
          >
            <CartIcon />
          </button>
        </div>
      </div>

      

      {/* Сайдбар */}
      <SlidebarMenu isOpen={isSlidebarOpen} onClose={() => setSlidebarOpen(false)} />
    </>
  );
}
