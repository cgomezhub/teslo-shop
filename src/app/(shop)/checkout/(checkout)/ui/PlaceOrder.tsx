"use client";

import { use, useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import clsx from "clsx";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);

  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (cart.length === 0) {
      redirect("/");
    }
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    //  console.log({address, productToOrder});

    // ! server action - placeOrder - el mas iportante de esta app
    //! todos estos calculos se van a realizar, verificar y almacenanar en el servidor
    
    const resp = await placeOrder(productToOrder, address);

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    clearCart();
    router.replace(`/orders/${resp.order?.id}`);

    // console.log({ resp });
  };

  if (!loaded) return <p> is Loading...</p>;

  return (
    <div className="bg-white rounded shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Direccion de Entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.postalCode}</p>
        <p>Telefono {address.phone}</p>
      </div>
      {/*divider*/}
      <div className="h-0.5 w-full rounded mb-10 bg-gray-200"></div>

      <h2 className="text-2xl mb">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {" "}
          {itemsInCart === 1 ? " 1 articulo" : `${itemsInCart} articulos`}{" "}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuesto 15% </span>
        <span
          className="
      text-right"
        >
          {currencyFormat(tax)}
        </span>

        <span className="mt-5 text-2xl ">Total</span>
        <span className="text-right mt-5 text-2xl">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          <span className="text-xs">
            Al hacer clic en " Colocar Orden", aceptas nuestros{" "}
            <a href="#" className="underline">
              {" "}
              terminos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              {" "}
              Politica de privacidad
            </a>
          </span>
        </p>

        {!isPlacingOrder && <p className="text-red-500"> {errorMessage}</p>}

        <button
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder || cart.length === 0 || !loaded,
          })}
          // href="/orders/123"
        >
          Colocar Orden
        </button>
      </div>
    </div>
  );
};
