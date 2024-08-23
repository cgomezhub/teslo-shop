import type { Metadata, ResolvingMetadata } from "next";
export const revalidate = 40; // 1 minute

import { getpaginatedProducstWithImages } from "@/actions";

import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

import { Gender } from "@prisma/client";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const gender = params.gender;
  // const page = searchParams.page ? parseInt(searchParams.page) : 1;

  // fetch data
  const { products } = await getpaginatedProducstWithImages({
    gender: gender as Gender,
  });
  // get the first product
  // console.log({ images: products?.[1]?.images[1] });

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: gender ?? "department not found",
    description: `departamento de ${gender}`,
    openGraph: {
      title: gender ?? "department not found",
      description: `departamento de ${gender}`,
      images: [`/products/${products?.[1].images[1]}`],
    },
  };
}

export default async function ({ params, searchParams }: Props) {
  const { gender } = params;
  // console.log(params);
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages, currentPage } =
    await getpaginatedProducstWithImages({ page, gender: gender as Gender });
  // console.log({ products, totalPages, currentPage });
  if (products.length === 0) {
    redirect("/");
  }

  // console.log({ products });

  // const filteredProducts = products.filter((product) => product.gender === gender);

  const label: Record<string, string> = {
    men: "Caballeros",
    women: "Damas",
    kid: "Niños",
    unisex: "Unisex",
  };

  // if (gender === "kids") {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={label[gender]}
        subtitle={`Articulos para ${label[gender]}`}
        className="mb-2"
      />
      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
