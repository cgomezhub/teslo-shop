"use server";


import { revalidate } from "@/app/(shop)/page";
import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith("http")) {
    return {
      ok: false,
      error: "No se pueden borrar imágenes locales",
    };
  }

  const publicId = imageUrl.split("/").pop()?.split(".")[0] ?? "";

  try {
    await cloudinary.uploader.destroy(publicId);

    const deleteImage = await prisma.productImage.delete({
    
        where: {
            id: imageId,
        },
        select: {
            product:{
                select:{
                    slug:true
                }
            }
    
        }
    });


    revalidatePath(`/admin/product/${deleteImage.product.slug}`);
    revalidatePath(`/product/${deleteImage.product.slug}`);
    revalidatePath(`/admin/products`);


    return {
      ok: true,
    };


  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "No se pudo borrar la imagen",
    };
  }
};
