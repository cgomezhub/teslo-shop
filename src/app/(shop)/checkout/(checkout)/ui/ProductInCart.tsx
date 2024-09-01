"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { useCartStore } from "@/store";

import { currencyFormat } from "../../../../../utils/currencyFormat";
import { redirect} from "next/navigation";

export const ProductInCart = () => {

  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  const cart = useCartStore((state) => state.cart);


  useEffect(() => {

    if (cart.length === 0) {
      redirect("/");
    }
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
            className="mr-5 rounded-none"
          />

          <div>
            <span>
              {product.size} - {product.title} x ({product.quantity})
            </span>
            <p className="font-bold">
              {" "}
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
