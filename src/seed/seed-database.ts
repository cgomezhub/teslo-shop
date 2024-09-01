import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { countries } from './seed-countries';

async function main() {
  // 1. Borrar registros previos
  // await Promise.all( [
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    
    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();
    
    // el orden de borrado es importante, primero se borran las relaciones
    //entre los esquemas y luegos los solitarios
    
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  
  // ]);
  
  // 2. crear categorias
  
  const { categories, products, users } = initialData;

  // 2.1 usuarios
  
  await prisma.user.createMany({
    data: users,
  });
  
  
  // 2.2 paises

  await prisma.country.createMany({
    data: countries,
  });

  // 2.3 categorias

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

  
  //3.1  Crear todos los productos
  products.forEach(async (product) => {
    const { images, type, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    // 3.2 crear imagenes

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });


}
console.log("Seed ejecutado correctamente");

(() => {
  if (process.env.NODE_ENV === "production") return; // No seed in production, evitar destruir la base de datos
  main();
})();
