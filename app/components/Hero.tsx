"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    title: "The Midas Touch",
    subtitle: "Premium Parts for Professionals",
    description: "Expert-grade OEM components with 30-day warranty",
    gradient: "from-yellow-400 via-yellow-500 to-yellow-600",
    pattern: "circuit-pattern",
    cta: "Shop Premium Parts",
    titleColor: "#D4AF37",
    subtitleColor: "white",
    descriptionColor: "white",
    stats: "5000+ Parts in Stock"
  },
  {
    id: 2,
    title: "Expert-Grade OEM",
    subtitle: "Screens & Batteries",
    description: "Genuine manufacturer components for perfect fit",
    gradient: "from-blue-600 via-blue-700 to-blue-800",
    pattern: "tech-grid",
    cta: "Browse Screens",
    titleColor: "white",
    subtitleColor: "#D4AF37",
    descriptionColor: "white",
    stats: "100% Genuine Parts"
  },
  {
    id: 3,
    title: "Free Shipping $99+",
    subtitle: "30-Day Gold Warranty",
    description: "Fast shipping & comprehensive protection",
    gradient: "from-purple-600 via-purple-700 to-purple-800",
    pattern: "diamond-pattern",
    cta: "Start Shopping",
    titleColor: "white",
    subtitleColor: "#D4AF37",
    descriptionColor: "white",
    stats: "Free Shipping Over $99"
  },
  {
    id: 4,
    title: "New Arrivals",
    subtitle: "Latest iPhone & Galaxy Parts",
    description: "Stay ahead with the newest repair solutions",
    gradient: "from-green-600 via-green-700 to-green-800",
    pattern: "innovation-waves",
    cta: "View New Parts",
    titleColor: "white",
    subtitleColor: "#D4AF37",
    descriptionColor: "white",
    stats: "Fresh Stock Daily"
  },
  {
    id: 5,
    title: "Professional Tools",
    subtitle: "Complete Repair Kits",
    description: "Everything you need for professional repairs",
    gradient: "from-red-600 via-red-700 to-red-800",
    pattern: "gear-pattern",
    cta: "Shop Tools",
    titleColor: "white",
    subtitleColor: "#D4AF37",
    descriptionColor: "white",
    stats: "Pro-Grade Equipment"
  }
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoErrors, setVideoErrors] = useState<Record<number, boolean>>({});

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  const handleVideoError = (slideId: number) => {
    setVideoErrors(prev => ({ ...prev, [slideId]: true }));
  };

  return (
    <section className="relative w-full h-[60vh] md:h-screen overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* Beautiful Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} flex items-center justify-center`}>
              {/* Subtle Pattern Overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className={`w-full h-full ${slide.pattern === 'circuit-pattern' ? 'bg-circuit-pattern' :
                  slide.pattern === 'tech-grid' ? 'bg-tech-grid' :
                  slide.pattern === 'diamond-pattern' ? 'bg-diamond-pattern' :
                  slide.pattern === 'innovation-waves' ? 'bg-innovation-waves' :
                  'bg-gear-pattern'} bg-repeat bg-center`} style={{
                    backgroundImage: slide.pattern === 'circuit-pattern' ? `
                      radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                      radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)
                    ` : slide.pattern === 'tech-grid' ? `
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    ` : slide.pattern === 'diamond-pattern' ? `
                      repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.1) 0deg 90deg, transparent 90deg 180deg)
                    ` : slide.pattern === 'innovation-waves' ? `
                      radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, transparent 70%),
                      radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 100%)
                    ` : `
                      conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.1) 0deg, transparent 60deg, rgba(255,255,255,0.1) 120deg, transparent 180deg, rgba(255,255,255,0.1) 240deg, transparent 300deg, rgba(255,255,255,0.1) 360deg)
                    `,
                    backgroundSize: slide.pattern === 'tech-grid' ? '50px 50px' : '100px 100px'
                  }}>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-4">
              <div className="text-center max-w-4xl mx-auto">
                {/* Main Title */}
                <h1
                  className="text-3xl md:text-5xl lg:text-7xl font-black mb-4 drop-shadow-2xl"
                  style={{ color: slide.titleColor }}
                >
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <h2
                  className="text-xl md:text-3xl lg:text-4xl font-bold mb-6 drop-shadow-lg"
                  style={{ color: slide.subtitleColor }}
                >
                  {slide.subtitle}
                </h2>

                {/* Description */}
                <p
                  className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md leading-relaxed"
                  style={{ color: slide.descriptionColor }}
                >
                  {slide.description}
                </p>

                {/* Stats Badge */}
                <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/30">
                  <span className="text-white font-semibold text-sm md:text-base">
                    {slide.stats}
                  </span>
                </div>

                {/* CTA Button */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    href="/products"
                    className="inline-block px-10 py-4 bg-[#D4AF37] text-black font-bold text-xl rounded-full hover:bg-[#b8941f] transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-[#D4AF37]/50 border-4 border-white/20"
                  >
                    {slide.cta}
                  </Link>

                  {/* Secondary CTA for some slides */}
                  {slide.id === 1 && (
                    <Link
                      href="/register"
                      className="inline-block px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold text-lg rounded-full hover:bg-white/30 transition-all duration-300 border-2 border-white/40"
                    >
                      Wholesale Pricing
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows Styling */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #D4AF37 !important;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          width: 50px !important;
          height: 50px !important;
          margin-top: -25px !important;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold;
        }

        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.7) !important;
        }

        .swiper-pagination-bullet-active {
          background: #D4AF37 !important;
        }

        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
