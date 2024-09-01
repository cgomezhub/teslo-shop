"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { ok } from "assert";

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "debe estar autenticado",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            quantity: true,
            price: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
    if (!order) {
      throw `no se encontro la orden con el id ${id}`;
    }
    // verificar role
    // verificar si el usuario es el dueño de la orden

    if (session.user.role === "user") {
      if (order.userId !== session.user.id) {
        throw `no tiene permisos para ver esta orden ${id}`;
      }
    }

    return {
      ok: true,
      message: "orden encontrada",
      order,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "orden no existe",
    };
  }
};
