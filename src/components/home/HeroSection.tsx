"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Camera,
  Building2,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    subtitle: "A WORLD OF CREATIVE POSSIBILITIES",
    icon: Sparkles,
    titleBefore: "Your Next Great ",
    highlight: "Creation",
    titleAfter: " Starts Here",
    description:
      "Discover inspiring studios and professional creative spaces for your next big project.",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
  },
  {
    subtitle: "BRING YOUR VISION TO LIFE",
    icon: Camera,
    titleBefore: "Find the ",
    highlight: "Perfect Space ",
    titleAfter: "For Your Vision",
    description:
      "From photography to film production, find a space that brings your ideas to life.",
    image: "https://sanctuaryfilms.fr/assets/hero-bg-TQT79qi0.jpg",
  },
  {
    subtitle: "SHARE YOUR CREATIVE SPACE",
    icon: Building2,
    titleBefore: "Turn Your Studio Into an ",
    highlight: "Opportunity  ",
    titleAfter: "  ",
    description:
      "Connect with creators, share your workspace, and make your studio more valuable.",
    image: "https://tamarastudios.in/assets/podcast-studio.png",
  },
];

export default function HeroSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          loop={true}
          speed={500}
          allowTouchMove={true}
          simulateTouch={true}
          threshold={5}
          touchStartPreventDefault={false}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="studio-hero-swiper w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.highlight}>
              <div
                className="relative flex min-h-135 items-center bg-cover bg-center px-8 py-24 sm:min-h-150 sm:px-20 lg:min-h-170 lg:px-32"
                style={{
                  backgroundImage: `
                    linear-gradient(
                      90deg,
                      rgba(10, 15, 35, 0.90) 0%,
                      rgba(10, 15, 35, 0.80) 80%,
                      rgba(10, 15, 35, 0.15) 100%
                    ),
                    url("${slide.image}")
                  `,
                }}
              >
                <div className="relative z-10 mx-auto w-full max-w-7xl">
                  <div className="max-w-2xl">
                    <span className="group mb-5 inline-flex items-center gap-2.5 rounded-full border border-violet-300/30 bg-violet-500/15 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-violet-200 backdrop-blur-md transition-all duration-300 hover:border-violet-300/60 hover:bg-violet-500/25">
                      <slide.icon
                        size={16}
                        strokeWidth={2.2}
                        aria-hidden="true"
                        className="shrink-0 text-violet-300 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 animate-pulse"
                      />
                      {slide.subtitle}
                    </span>

                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                      {slide.titleBefore}

                      <span className="bg-linear-to-r from-violet-600 via-purple-600 to-fuchsia-400 bg-clip-text text-transparent">
                        {slide.highlight}
                      </span>

                      {slide.titleAfter}
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-7 text-gray-200 sm:text-lg">
                      {slide.description}
                    </p>

                    <div className="mt-9 flex flex-wrap gap-4">
                      <Link
                        href="/studios"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Explore Studios
                        <ArrowRight size={18} />
                      </Link>

                      <Link
                        href="/studios"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/50 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                      >
                        Host Your Space
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left navigation arrow */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full  bg-black/30 text-white backdrop-blur-md transition  hover:bg-blue-950 sm:left-8 sm:flex sm:h-12 sm:w-12 "
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right navigation arrow */}
        <button
          type="button"
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition hover:bg-blue-950 sm:right-8 sm:flex sm:h-12 sm:w-12"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slider pagination styling */}
      <style jsx global>{`
        .studio-hero-swiper .swiper-pagination {
          bottom: 24px !important;
        }

        .studio-hero-swiper .swiper-pagination-bullet {
          width: 9px;
          height: 9px;
          background: white;
          opacity: 0.55;
        }

        .studio-hero-swiper .swiper-pagination-bullet-active {
          width: 25px;
          border-radius: 10px;
          background: #3b82f6;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
