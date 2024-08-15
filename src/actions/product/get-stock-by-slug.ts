"use server";

import prisma from "@/lib/prisma";
import { Product } from "../../interfaces/product.interface";

export const getStockBySlug = async (slug: string) => {
  try {
    // obtener los productos con sus imagenes
    const stock = await prisma.product.findUnique({
      where: {
        slug: slug,
      },
      select: {
        inStock: true,
      },
    });
    
    return stock?.inStock || 0;
  } catch (error) {
    return 0;
  }
};
