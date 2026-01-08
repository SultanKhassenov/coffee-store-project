// Компонент навигационной панели
// Отображает разные версии для десктопа и мобильных устройств
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

/**
 * Главный компонент навигационной панели
 * Отображает адаптивное меню:
 * - DesktopNavbar для экранов шириной >= 768px
 * - MobileNavbar для мобильных устройств
 */
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-100 bg-white shadow-md">
      {/* Десктопное меню (скрыто на мобилках) */}
      <div className="hidden md:block">
        <DesktopNavbar />
      </div>

      {/* Мобильное меню (скрыто на десктопе) */}
      <div className="block md:hidden">
        <MobileNavbar />
      </div>
    </nav>
  );
}
