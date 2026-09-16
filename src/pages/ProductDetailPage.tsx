import { Link, useParams } from "react-router-dom";
import { useProduct } from "../features/products/hooks/useProduct";
import { useAddToCartFeedback } from "../features/cart/hooks/useAddToCartFeedback";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

function ProductDetailPage() {
  const { productId } = useParams();
  const { product, loading, error } = useProduct(productId ?? "");
  const { message, addWithFeedback } = useAddToCartFeedback();

  if (loading) {
    return <LoadingState message="Cargando producto..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!product) {
    return <ErrorState message="Producto no encontrado." />;
  }

  return (
    <section className="space-y-6">
      <Link
        to="/"
        className="inline-block text-sm font-medium text-amber-700 hover:underline"
      >
        ← Volver al catálogo
      </Link>

      <div className="grid overflow-hidden rounded-2xl border border-amber-200 bg-white md:grid-cols-2">
        <div className="flex min-h-72 items-center justify-center p-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-h-96 w-full object-contain"
          />
        </div>

        <div className="flex flex-col justify-center p-6">
          <p className="text-sm font-medium uppercase text-amber-700">
            {product.category}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-stone-900">
            {product.name}
          </h2>

          <p className="mt-4 text-stone-600">
            {product.description}
          </p>

          <p className="mt-6 text-2xl font-bold text-stone-900">
            ${product.price.toLocaleString("es-AR")}
          </p>

          <p className="mt-1 text-sm text-stone-500">
            Stock disponible: {product.stock}
          </p>

          <button
            type="button"
            disabled={product.stock <= 0}
            onClick={() => addWithFeedback(product)}
            className="mt-6 cursor-pointer rounded-lg bg-amber-600 px-4 py-3 font-medium text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            {product.stock <= 0
              ? "Sin stock"
              : message || "Agregar al carrito"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;