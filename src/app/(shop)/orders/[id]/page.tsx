import Image from "next/image";
import { redirect } from "next/navigation";
import { getOrderById } from "@/actions";

import { IsOrderPaid, Title } from "@/components";

import { currencyFormat } from "@/utils";

interface Props {
  params: {
    id: string;
  };
}

export default async function ({ params }: Props) {
  const id = params.id;

  //! server action: toda la info de la orden viende de la base de datos

  const { order, ok } = await getOrderById(id);

  if (!ok) {
    redirect("/auth/login");
  }

  console.log({ order });

  const address = order!.OrderAddress;
  const products = order!.OrderItem;

  

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0 ">
      <div className="flex flex-col w=[1000px]  ">
        <Title title={`orden #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* carrito   */}

          <div className="flex flex-col mt-5">
            <IsOrderPaid isPaid={order?.isPaid ?? false} />
            {products.map((item) => (
              <div key={item.product.slug} className="flex mb-5">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  alt={item.product.title}
                  width={100}
                  height={100}
                  style={{ objectFit: "contain" }}
                  className="mr-5 rounded-none"
                />
                <div>
                  <p> {item.product.title}</p>
                  <p>
                    {" "}
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    {" "}
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
                ;
              </div>
            ))}
          </div>

          {/* Checkout  - Resumen de Orden*/}
          <div className="bg-white rounded shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Direccion de Entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address?.firstName} {address?.lastName}
              </p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>
                {address?.city}, {address?.countryId}
              </p>
              <p>{address?.postalCode}</p>
              <p>Telefono {address?.phone}</p>
            </div>
            divider
            <div className="h-0.5 w-full rounded mb-10 bg-gray-200"></div>
            <h2 className="text-2xl mb">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order?.itemsInOrder}{" "}
                {order?.itemsInOrder && order.itemsInOrder > 1
                  ? "articulos"
                  : "articulo"}
              </span>
              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order?.subTotal as number)}
              </span>

              <span>Impuesto (15%) </span>
              <span className="text-right">
                {currencyFormat(order?.tax as number)}
              </span>

              <span className="mt-5 text-2xl ">Total</span>
              <span className="text-right mt-5 text-2xl">
                {currencyFormat(order!.total)}
              </span>
            </div>
            <div className="mt-5 mb-2 w-full">
            <IsOrderPaid isPaid={order?.isPaid ?? false} />  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
