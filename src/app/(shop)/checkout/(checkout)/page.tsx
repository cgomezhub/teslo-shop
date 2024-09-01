import {  Title } from "@/components";
import Link from "next/link";
import { ProductInCart } from './ui/ProductInCart';
import { PlaceOrder } from "./ui/PlaceOrder";



export default function () {


  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0 ">
      <div className="flex flex-col w=[1000px]  ">
        <Title title="Verificar Orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito   */}

          <div className="flex flex-col mt-5">
            <span> Ajustar Elementos</span>

            <Link href="/cart" className="underline mb-5 ">
              Editar Carrito
            </Link>

            {/* items */}

            <ProductInCart />

            {/* Divider */}
          </div>

          {/* Checkout  - Resumen de Orden*/}
          
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
