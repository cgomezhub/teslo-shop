"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    const findAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });
    if (!findAddress) {
      return null;
    } else {

      const {countryId, address2, ...rest} = findAddress;

      return {
        ...rest,
        address2: address2 ?? "",
        country:countryId,
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
