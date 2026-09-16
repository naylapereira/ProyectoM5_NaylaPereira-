import { Link } from "react-router-dom";
import type { Product } from "../../../types/product";
import { useAddToCartFeedback } from "../../cart/hooks/useAddToCartFeedback";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { message, addWithFeedback } = useAddToCartFeedback();
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm">
      <div className="flex h-56 items-center justify-center bg-white p-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase text-amber-700">
          {product.category}
        </p>

        <h3 className="mt-1 text-lg font-bold text-stone-900">
          {product.name}
        </h3>

        <p className="mt-2 flex-1 text-sm text-stone-600">
          {product.description}
        </p>

        <div className="mt-4">
          <p className="text-xl font-bold text-stone-900">
            ${product.price.toLocaleString("es-AR")}
          </p>

          <p className="text-sm text-stone-500">
            Stock: {product.stock}
          </p>
        </div>

        <div className="mt-4 grid gap-2">
          <Link
            to={`/products/${product.id}`}
            className="rounded-lg border border-amber-600 px-4 py-2 text-center font-medium text-amber-700 transition hover:bg-amber-50"
          >
            Ver detalle
          </Link>

          <button
            type="button"
            onClick={() => addWithFeedback(product)}
            className="cursor-pointer rounded-lg bg-amber-600 px-4 py-2 font-medium text-white transition hover:bg-amber-700"
          >
          {message || "Agregar al carrito"}          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;