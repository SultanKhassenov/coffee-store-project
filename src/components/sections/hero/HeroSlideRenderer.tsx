import { HeroSlide } from "@/types";

export default function HeroSlideRenderer({ slide }: { slide: HeroSlide }) {
    return (
      <section
        className={`w-full h-full flex relative overflow-hidden ${slide.containerClassName}`}
      >
        {slide.images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            className={image.className}
            alt={image.alt}
          />
        ))}

        <div className={slide.content.className}>
          <h2 className={slide.texts[0].className}>{slide.texts[0].text}</h2>
          <p className={slide.texts[1].className}>{slide.texts[1].text}</p>
          <button className={slide.cta?.className}
            onClick={() => {
              if (slide.cta?.href) {
                window.location.href = slide.cta.href;
              }
            }}
           >
            {slide.cta?.label}
        </button>
        </div>
      </section>
    );
  }

