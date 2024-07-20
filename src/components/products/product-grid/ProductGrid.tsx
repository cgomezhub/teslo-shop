import { inter } from "@/config/fonts";
import { Product } from "@/interfaces";
import { ProductGridItem } from "./ProductGridItem";

interface Props {
  products: Product[]; //TODO: Add the type of the products
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {products.map((product) => (
        <div
          key={product.slug}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <ProductGridItem key={product.slug} product={product} />
        </div>
      ))}
    </div>
  );
};
