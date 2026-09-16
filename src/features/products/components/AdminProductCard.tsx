import type { Product } from "../../../types/product";

interface AdminProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

function AdminProductCard({
  product,
  onEdit,
  onDelete,
}: AdminProductCardProps) {
  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-4">
      {product.imageUrl && (
        <div className="flex h-40 items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>
      )}

      <h4 className="mt-3 font-bold text-stone-900">
        {product.name}
      </h4>

      <p className="mt-1 text-sm text-stone-600">
        {product.category} · Stock: {product.stock}
      </p>

      <p className="mt-2 font-bold text-stone-900">
        ${product.price.toLocaleString("es-AR")}
      </p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(product)}
          className="cursor-pointer rounded-lg border border-amber-500 px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50"
        >
          Editar
        </button>

        <button
          type="button"
          onClick={() => onDelete(product.id)}
          className="cursor-pointer rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default AdminProductCard;