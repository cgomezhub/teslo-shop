'use client'

import { ProductImage } from "@/components/product/product-image/ProductImage";
import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { ucs2 } from "punycode";
import { useState } from "react";
import { FaUserClock } from "react-icons/fa";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <ProductImage
        alt={product.title}
        src={displayImage}
        className="w-full object-cover rounded"
        width={500}
        height={500}
        onMouseEnter={() => setDisplayImage(product.images[1])}
        onMouseLeave={() => setDisplayImage(product.images[0])}
      />
      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-700" href={`/product/${product.slug}`}> {product.title}</Link>
        <span className="font-bold">{product.price} $</span>
      </div>
    </div>
  );
};
