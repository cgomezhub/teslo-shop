"use server";

import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      msg: "no se pudo grabar la direccion del usuario",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {

    const storedAdress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    const {country, ...rest} = address;

    if (!storedAdress) {
      const newAddress = await prisma.userAddress.create({
        data: {
          userId: userId,
          countryId: address.country,
          ...rest,}
      });

      return newAddress;
    } else {
      const updatedAddress = await prisma.userAddress.update({
        where: {
          userId,
        },
        data: {
          countryId: address.country,
          ...rest,
        },
      });

      return updatedAddress;
    }
  } catch (error) {
    console.error(error);
    throw new Error("no se pudo actualizar la direccion del usuario");
  }
};
