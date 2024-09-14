"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Swiper as SwiperObjet } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ProductImage } from "@/components";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./slideshow.css";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObjet>();

  return (
    <div className={className}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 2500 }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {!Array.isArray(images) ||images.length === 0 ? (
          <SwiperSlide>
            <ProductImage
              width={1024}
              height={800}
              src=""
              alt="Placeholder"
              className="rounded-lg"
            />
          </SwiperSlide>
        ) : (
          images.map((image) => (
            <SwiperSlide key={image}>
              <ProductImage
                width={1024}
                height={800}
                src={image}
                alt={title}
                className="rounded-lg"
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {!Array.isArray(images) ||images.length === 0 ? (
          <SwiperSlide>
            <ProductImage
              width={1024}
              height={800}
              src=""
              alt="Placeholder"
              className="rounded-lg"
            />
          </SwiperSlide>
        ) : (
          images.map((image) => (
            <SwiperSlide key={image}>
              <ProductImage
                width={1024}
                height={800}
                src={image}
                alt={title}
                className="rounded-lg"
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
};
