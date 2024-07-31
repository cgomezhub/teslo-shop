import { ProductGrid, Title } from "@/components";
import { notFound } from "next/navigation";

import { initialData } from "@/seed/seed";
import { Category } from "@/interfaces";

const products = initialData.products;

interface Props {
  params: {
    id: Category;
  };
}
export default function CategoryPage({ params }: Props) {
  const { id } = params;
  console.log(params);

  // if (id === "kids") {
  //   notFound();
  // }

  const filteredProducts = products.filter((product) => product.gender === id);

  const label: Record<Category, string> = {
    men: "Caballeros",
    women: "Damas",
    kid: "Niños",
    unisex: "Unisex",
  };

  return (
    <>
      <Title
        title={label[id]}
        subtitle={`Articulos para ${label[id]}`}
        className="mb-2"
      />
      <ProductGrid products={filteredProducts} />
    </>
  );
}
