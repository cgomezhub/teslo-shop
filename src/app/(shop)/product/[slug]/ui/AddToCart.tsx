"use client";

import { useState } from "react";

import { QuantitySelector, SideSelector } from "@/components";
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    // console.log({ size, quantity, product });

    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      title: product.title,
      quantity: quantity,
      slug: product.slug,
      size: size,
      price: product.price,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setSize(undefined);
    setQuantity(1);
  };

  return (
    <>
      {posted && !size && (
        <span className=" text-red-500 fade-in">
          {" "}
          Debe seleccionar una talla
        </span>
      )}

      {/* selector de tallas */}
      <SideSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChange={setSize}
      />

      {/* selector de cantidad */}

      <QuantitySelector quantity={quantity} OnQuantityChange={setQuantity} />

      {/* button */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
