import { NextResponse } from "next/server";
import { HeroSlide } from "@/types/index";

const heroSlides: HeroSlide[] = [
  {
    id: "hero-0",
    content: {
      className: "w-9/10 h-full flex flex-col justify-center mx-auto text-center bg-[radial-gradient(ellipse_at_center,_var(--color-coffee-light)_30%,_transparent_70%)] min-md:px-20 rounded-lg z-10",
    },
    images: [
        {
            src: "/assets/images/hero-carousel-img-2.png",
            alt: "coffee-bag-0",
            className: "absolute max-md:opacity-70 right-0 top-0 object-cover w-1/4 max-lg:w-2/7 max-md:w-2/5 max-sm:w-1/2"
        },
        {
            src: "/assets/images/hero-carousel-img-3.png",
            alt: "coffee-bag-1",
            className: "absolute max-md:opacity-70 left-0 bottom-0 object-cover w-1/4 max-lg:w-2/7 max-md:w-2/5 max-sm:w-1/2"
        }
    ],
    texts: [
        {
            text: "Добро пожаловать в Coffeeino",
            className: "text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-2xl font-bold text-white"
        },
        {
            text: "Ваш источник качественного кофе и аксессуаров для идеального кофепития",
            className: "mt-4 text-white max-sm:text-sm"
        }
    ],
    containerClassName: "bg-[radial-gradient(circle_at_center,_var(--color-coffee-light)_3%,_var(--color-coffee)_80%)]"
  },
  {
    id: "hero-1",
    content: {
      className: "w-1/2 max-sm:w-9/10 text-center",
    },
    images: [
        {
            src: "/assets/images/hero-carousel-img-4.png",
            alt: "coffee-new",
            className: "object-cover w-1/4 max-lg:w-1/3 max-md:w-2/5 max-sm:w-1/2 h-fit drop-shadow-[0_4px_50px_#0b6]"
        }
    ],
    texts: [
        {
            text: "Успейте попробовать новинки!",
            className: "text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-xl font-bold text-white"
        },
        {
            text: "Кофе от лучших обжарщиков мира уже в нашем магазине",
            className: "min-sm:mt-4 text-white max-md:text-sm max-sm:text-[12px]"
        }
    ],
    containerClassName: "bg-[linear-gradient(135deg,#052_30%,#0b6)] gap-4 justify-center items-center max-sm:flex-col-reverse",
    cta: {
        label: "Перейти к новинкам",
        href: "/catalog",
        className: "min-sm:mt-6 max-sm:mt-2 inline-block px-6 py-3 max-md:px-4 max-md:py-2 bg-[linear-gradient(-45deg,#074,#0b6)] text-white font-medium rounded-md hover:brightness-110 transition"
    },
 },
 {
    id: "hero-2",
    content: {
      className: "w-3/5 max-sm:w-9/10 m-auto text-center",
    },
    images: [
        {
            src: "/assets/images/hero-carousel-img-0.png",
            alt: "coffee-bag",
            className: "absolute object-cover w-1/3 max-md:w-2/3 bottom-[-7%] max-md:left-[-10%] max-sm:bottom-[-2%] max-sm:w-2/3"
        },
        {
            src: "/assets/images/hero-carousel-img-1.png",
            alt: "coffee-cup",
            className: "absolute object-cover w-1/4 max-md:w-2/5 right-[-2%] top-[-5%] max-md:top-[-15%] max-md:right-[-10%] max-sm:top-[-5%] max-sm:w-2/5"
        }
    ],
    texts: [
        {
            text: "Отборный кофе для истинных ценителей",
            className: "text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-[14px] font-bold"
        },
        {
            text: "Лишь лучшие сорта со всего мира в нашем ассортименте. Попробуйте и убедитесь сами!",
            className: "mt-4 max-md:text-sm max-sm:text-[10px]"
        }
    ],
    containerClassName: "bg-[#f0f0f0]"
  }
];

export async function GET() {
  return NextResponse.json(heroSlides);
}
