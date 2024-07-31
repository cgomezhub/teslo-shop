import { notFound } from "next/navigation";
import { initialData } from "../../../../seed/seed";
import { titleFont } from "@/config/fonts";
import {
  QuantitySelector,
  SideSelector,
  ProductSlideshow,
  ProductMobileSlideshow,
} from "@/components";
interface Props {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: Props) {
  const { slug } = params;
  console.log(params);
  const product = initialData.products.find((product) => product.slug === slug);

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
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {" "}
          {product.title}
        </h1>

        <p className="text-lg text-gray-500">$ {product.price}</p>

        {/* selector de tallas */}

        <SideSelector
          selectedSize={product.sizes[1]}
          availableSizes={product.sizes}
        />

        {/* selector de cantidad */}

        <QuantitySelector quantity={1} />

        {/* button */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* description */}

        <h3 className="text-sm font-bold">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
