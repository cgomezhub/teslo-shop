import Image from "next/image";
import React from "react";

interface Props {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className?: React.StyleHTMLAttributes<HTMLImageElement>[`className`];
  style?: React.StyleHTMLAttributes<HTMLImageElement>[`style`];
  onMouseEnter?: React.StyleHTMLAttributes<HTMLImageElement>[`onMouseEnter`];
  onMouseLeave?: React.StyleHTMLAttributes<HTMLImageElement>[`onMouseLeave`];

}

export const ProductImage = ({ src, alt, width, height, className, style,onMouseEnter, onMouseLeave }: Props) => {

    const localSrc = src
        ? src?.startsWith("http")
            ? src
            : `/products/${src}`
        : '/imgs/placeholder.jpg';

  return (
    <Image
      src={localSrc}
      alt={alt}
      width={width}
      height={height}   
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
