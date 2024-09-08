"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  transactionId: string,
  orderId: string
) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    if (!order) {
      return {
        ok: false,
        message: `no se pudo actualizar la orden con id ${orderId}`,
      };
    }

    return {
      ok: true,
      message: "id de la transaccion actualizado",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "no se pudo aactualizar el id de la transaccion",
    };
  }
};
