"use client"; // Клиентский компонент для работы с useEffect
import { useEffect, useState } from "react";

/**
 * Кастомный hook для определения мобильного устройства
 * Отслеживает изменения размера окна и обновляет состояние при resize событии
 * 
 * @param breakpoint - ширина в пикселях, ниже которой считается мобильным устройством (по умолчанию 768px)
 * @returns boolean - true если ширина окна меньше breakpoint, false иначе
 */
export function useIsMobile(breakpoint = 768) {
  // Состояние для отслеживания мобильного устройства
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    // Функция для обработки изменения размера окна
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    
    // Добавляем слушатель события resize
    window.addEventListener("resize", handleResize);
    
    // Очищаем слушатель при размонтировании компонента
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}
