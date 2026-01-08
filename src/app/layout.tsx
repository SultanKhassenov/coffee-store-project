// Основной макет приложения (Next.js root layout)
// Содержит: глобальные стили, шрифты, провайдеры Redux, навигацию и компоненты шапки/подвала

import '../style/globals.css'
import StoreProvider from './providers';
import type { ReactNode } from 'react';
import { Montserrat } from 'next/font/google';
import Navbar from '../components/layout/navbar/Navbar';
import { Toaster } from 'sonner';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FloatingCart from '@/components/layout/cart/FloatingCart';
import DrawerCart from '@/components/layout/cart/DrawerCart';

// Подключение шрифта Montserrat для всего приложения
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

// Метаданные сайта (SEO)
export const metadata = {
  title: 'Coffeino',
}

// Root компонент приложения
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={montserrat.className}>
      <body>
        {/* Redux провайдер для управления глобальным состоянием */}
        <StoreProvider>
          {/* Навигационная панель */}
          <Navbar />
          {/* Уведомления (toast) в правом нижнем углу */}
          <Toaster position="bottom-right" richColors closeButton />
          {/* Боковая панель с корзиной (для мобильных) */}
          <DrawerCart />
          {/* Плавающая корзина (для десктопа) */}
          <FloatingCart />
          {/* Основной контент приложения */}
          <main className="w-1/1 h-1/1 mx-auto">
            {children}
          </main>
        </StoreProvider>
      </body>
    </html>
  )
}