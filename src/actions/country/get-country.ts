"use server";

import prisma from "@/lib/prisma";
import { get } from "http";

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return countries;
  } catch (error) {
    console.log(error);

    throw new Error("Error getting country");
  }
};
