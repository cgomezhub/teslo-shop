export const revalidate	= 40; // 1 minute

import { redirect } from "next/navigation";
import { getpaginatedProducstWithImages } from "@/actions";

import { Pagination, ProductGrid, Title } from "@/components";
interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getpaginatedProducstWithImages({ page });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
