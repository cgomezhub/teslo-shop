import type { Metadata, ResolvingMetadata } from 'next'

export const revalidate	= 604800; // 1 week


import { getProductBySlug } from "@/actions";
import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import {
  QuantitySelector,
  SideSelector,
  ProductSlideshow,
  ProductMobileSlideshow,
  StockLabel,
} from "@/components";
import { get } from "http";
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: {
    slug: string;
  };
}

 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const product = await getProductBySlug(slug)
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? 'product not found',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'product not found',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
    },
  };
}
 

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  // console.log(params);
  const product = await getProductBySlug(slug);
  // console.log({product});

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-col-1 md:grid-cols-3 gap-3 ">
      {/* slideShow */}

      <div className="col-span-1 md:col-span-2 ">
        {/* Mobile slideshow */}
        <ProductMobileSlideshow images={product.images} title={product.title} className="block md:hidden" />

        {/* desktop slideshow */}

        <ProductSlideshow images={product.images} title={product.title} className="hidden md:block"/>
      </div>
      {/* details */}

      <div className="col-span-1 px-5 md:col-span-1">
        <StockLabel slug={product.slug}/>
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg text-gray-500">$ {product.price}</p>

      
        <AddToCart product={product} />
        

        {/* description */}

        <h3 className="text-sm font-bold">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
