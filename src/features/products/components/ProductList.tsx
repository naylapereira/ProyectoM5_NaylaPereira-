import type { Product } from "../../../types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-amber-200 bg-white p-8 text-center">
        <p className="font-medium text-stone-700">
          No hay productos disponibles.
        </p>
        <p className="mt-1 text-sm text-stone-500">
          Probá cambiando la búsqueda o la categoría.
        </p>
      </div>
    );
  }

  return (
    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </section>
  );
}

export default ProductList;