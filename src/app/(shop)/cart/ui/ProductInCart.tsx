"use client";

import {useEffect, useState } from "react";

import Image from "next/image";

import { useCartStore } from "@/store";
import { ProductImage, QuantitySelector } from "@/components";
import Link from "next/link";

export const ProductInCart = () => {

  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProductFromCart = useCartStore((state) => state.removeProductFromCart);
  
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);  

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;


  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <ProductImage
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
            className="mr-5 rounded-none"
          />

          <div>

            <Link 
            className="hover:underline cursor-pointer"
            href={`/product/${product.slug}`}>
                {product.size} - {product.title}

            </Link>
            <p> ${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              OnQuantityChange={ quantity => updateProductQuantity(product, quantity) }
            />
            <button onClick={ () =>removeProductFromCart(product)} className="underline mt-3">Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
