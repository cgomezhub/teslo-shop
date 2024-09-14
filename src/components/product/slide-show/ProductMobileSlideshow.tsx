"use client";



import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { ProductImage } from "@/components";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideshow.css";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        pagination
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Pagination, Autoplay]}
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
    </div>
  );
};
