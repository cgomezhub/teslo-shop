"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    const findAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });
    if (!findAddress) {
      return {
        ok: false,
        msg: "no se encontro la direccion del usuario",
      };
    } else {
      await prisma.userAddress.delete({
        where: {
          userId,
        },
      });
      return {
        ok: true,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      msg: "no se pudo  borrar la direccion del usuario",
    };
  }
};
