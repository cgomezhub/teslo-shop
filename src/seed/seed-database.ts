import { initialData } from "./seed";
import prisma from "../lib/prisma";
import { clear, Console } from "console";
import { Category } from "../interfaces/product.interface";
import Image from "next/image";
import { data } from "autoprefixer";

async function main() {
  // 1. Borrar registros previos
  // await Promise.all( [
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  // ]);

  // 2. crear categorias

  const { categories, products } = initialData;

  const categoriesData = categories.map((name) => ({
    name,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  // 3. Crear relacion productos-categorias

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((acc, category) => {
    acc[category.name.toLowerCase()] = category.id;
    return acc;
  }, {} as Record<string, string>);

  // 4. Crear productos

  // crear un solo PRODUCTO

  //  const {images, type, ...product1} = products[0];

  // await prisma.product.create({

  //   data: {
  //     ... product1,
  //     categoryId: categoriesMap['shirts'],

  //   },
  // });

  //3.  Crear todos los productos
  products.forEach(async (product) => {
    const { images, type, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    // 4. crear imagenes

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id
    }));

    await prisma.productImage.createMany({
      data: imagesData
    });
  });
}
console.log("Seed ejecutado correctamente");

(() => {
  if (process.env.NODE_ENV === "production") return; // No seed in production, evitar destruir la base de datos
  main();
})();
