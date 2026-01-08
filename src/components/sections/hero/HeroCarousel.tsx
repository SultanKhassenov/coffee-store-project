"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import { HeroSlide } from "@/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeroSlideRenderer from "./HeroSlideRenderer";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function HeroCarousel() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetch("/api/hero")
      .then(res => res.json())
      .then(setSlides);
      setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[60vh] hero-skeleton skeleton"/>
    );
  }

  return (
    <Swiper
      key={slides.length}
      modules={[Navigation, Pagination, Autoplay, A11y]}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
      className="hero-carousel w-full h-[60vh]"
    > 
      {slides.map(slide => (
        <SwiperSlide key={slide.id}>
          <HeroSlideRenderer slide={slide} />
        </SwiperSlide>
      ))}    
    </Swiper>
  );
}