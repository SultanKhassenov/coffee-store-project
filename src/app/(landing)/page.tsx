"use client"; // Клиентский компонент для использования хуков Redux

import { CatalogCarousel } from "@/components/sections/catalog/CatalogCarousel";
import { useGetProductsQuery } from "@/store/api/productsApi";
import Footer from "@/components/layout/footer/Footer";
import HeroCarousel from "@/components/sections/hero/HeroCarousel";
import { AboutUsSection } from "@/components/sections/about-us/AboutUsSection";

/**
 * Главная страница приложения
 * Содержит следующие секции:
 * - Hero: Слайдер с баннерами
 * - Catalog: Карусель популярных товаров
 * - About Us: Информация о компании
 * - Footer: Подвал сайта
 */
export default function Home() {
  // Получаем список всех продуктов из API
  const { data: products = [] } = useGetProductsQuery();

  return (
    <>
      {/* Слайдер на главной странице */}
      <HeroCarousel />
      
      {/* Карусель каталога товаров */}
      <CatalogCarousel products={products}/>
      
      {/* Секция "О нас" */}
      <AboutUsSection />
      
      {/* Подвал сайта */}
      <Footer />
    </>
  )
}