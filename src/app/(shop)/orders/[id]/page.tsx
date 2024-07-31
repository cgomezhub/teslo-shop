import Link from "next/link";

import Image from "next/image";
import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { inter } from "@/config/fonts";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function ({ params }: Props) {
  const { id } = params;

  // todo verificarsi id corresponde
  // sino redirrigir a
  // redirect(/)

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0 ">
      <div className="flex flex-col w=[1000px]  ">
        <Title title={`orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito   */}

          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex  items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-500": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2"> Pendiente de pago</span> */}
              <span className="mx-2"> Orden pagada</span>
            </div>

            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  style={{ objectFit: "contain" }}
                  className="mr-5 rounded-none"
                />

                <div>
                  <p> {product.title}</p>
                  <p> ${product.price} x 3</p>
                  <p className="font-bold"> Subtotal: ${product.price * 3} </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout  - Resumen de Orden*/}
          <div className="bg-white rounded shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Direccion de Entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Carlos Gomez</p>
              <p>Av Siempre Viva</p>
              <p>Col Centro</p>
              <p>Alcaldia Iribarren</p>
              <p>Barqto</p>
              <p>Codigo Postal 3001</p>
              <p>Telefono 123123</p>
            </div>
            {/*divider*/}
            <div className="h-0.5 w-full rounded mb-10 bg-gray-200"></div>

            <h2 className="text-2xl mb">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 articulos</span>
              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuesto (15%) </span>
              <span className="text-right">$ 15</span>

              <span className="mt-5 text-2xl ">Total</span>
              <span className="text-right mt-5 text-2xl">$ 15</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  "flex  items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": false,
                    "bg-green-500": true,
                  }
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2"> Pendiente de pago</span> */}
                <span className="mx-2"> Orden pagada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
