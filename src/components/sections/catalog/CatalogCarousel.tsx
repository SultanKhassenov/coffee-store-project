"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Product } from "@/types";
import { ProductMiniCard } from "@/components/sections/catalog/ProductMiniCard";
import { useState } from "react";
import CatalogSkeleton from "./MiniCardSkeleton";

export function CatalogCarousel({ products }: { products: Product[] }) {
  const [isReady, setIsReady] = useState(false);

  return (
    <section className="w-full my-30 bg-coffee-light py-5 relative">
      <div className="w-9/10 mx-auto relative">
        <h2 className="text-4xl text-white text-center font-medium my-8">Каталог</h2>

        {/* Навигация справа сверху */}
        <div className="absolute top-0 right-0 flex z-10">
          <button className="catalog-prev catalog-btn rounded-md rounded-r-none">‹</button>
          <button className="catalog-next catalog-btn rounded-md rounded-l-none">›</button>
        </div>

        {/* skeleton */}  
        {!isReady && <CatalogSkeleton />}

        <Swiper
          modules={[FreeMode, Mousewheel, Pagination, Navigation]}
          freeMode={{ enabled: true, momentumBounce: false }}
          mousewheel={{ forceToAxis: true }}
          loop
          slidesPerView="auto"
          spaceBetween={16}
          navigation={{
            prevEl: '.catalog-prev',
            nextEl: '.catalog-next',
          }}
          pagination={{ clickable: true }}
          className={`catalog-carousel ${!isReady ? "absolute opacity-0 pointer-events-none" : ""}`}
          onSwiper={() => setIsReady(true)}
        >
          {products.map(product => (
            <SwiperSlide key={product.id} className="!w-fit">
              <ProductMiniCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
