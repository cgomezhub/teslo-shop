"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    // obtener los productos con sus imagenes
    const product = await prisma.product.findUnique({
      where: {
        slug: slug,
      },
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (error) {
    throw new Error("Error getting product");
  }
};
