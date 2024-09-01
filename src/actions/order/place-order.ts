"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import { logout } from "../auth/logout";

interface ProductsTorOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductsTorOrder[],
  address: Address
) => {
  const session = await auth();

  const userId = session?.user.id;

  // verificamos si hay un usuario logueado

  if (!userId) {
    return {
      ok: false,
      message: "no hay sesion de usuario",
    };
  }

  // obtenemos la info de los productos que se van a ordenar
  // se pueden llevar 2+ productos con el mismo id pero con diferente talla (size: S, M, L...)
  // aqui solo se unifican los productos por id (asi tengan diferente talla)
  //! aqui se obtiene un product.id (1)

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // calculamos los montos // encabezado de la orden

  const itemsInOrder = productIds.reduce(
    (acc, p) => acc + p.quantity,
    0
  );

  // calcular  totales de tax, subtotal y total
  // aqui se calcula el subtotal, tax y total de la orden
  //! pendiente aca productIds(item) tiene la propiedad productId (2)
  //! luego aqui se relaciona con el product.id (1)
  const { tax, subTotal, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) {
        throw new Error(`producto ${item.productId} no existe - 500`);
      }

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { tax: 0, subTotal: 0, total: 0 }
  );

  // crear la transaccion en la base de datos https://www.prisma.io/docs/orm/prisma-client/queries/transactions#interactive-transactions

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. actualizar el stock de los productos

      // acumulamos los productos por id y cantidad
      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, p) => acc + p.quantity, 0);

        if (productQuantity === 0) {
          throw new Error(
            `producto ${product.id} no tiene cantidad definida - 500`
          );
        }

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // verificar si hay valores negativos en el stock

      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene suficiente stock - 500`);
        }
      });

      // 2. crear la orden - encabezado - maestro - detalle

      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          // detalles de la orden
          //! nota el price se toma de la base de datos por seguridad
          //! si arroja cero se hace una valiadacion de error
          OrderItem: {
            createMany: {
              data: productIds.map((p) => {
                return {
                  productId: p.productId,
                  quantity: p.quantity,
                  size: p.size,
                  price:
                    products.find((product) => product.id === p.productId)
                      ?.price || 0,
                };
              }),
            },
          },
        },
      });

      //! validar si price es cero  


      // 3. crear la direccion de envio

      const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          orderId: order.id,
          countryId: country,
          ...restAddress,
        },
      });

      return {
        order,
        updatedProducts,
        orderAddress,
      };
    });

    return {
      ok: true,
      message: "orden creada",
      order: prismaTx.order,
      data: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
