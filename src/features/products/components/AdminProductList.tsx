import type { Product } from "../../../types/product";
import AdminProductCard from "./AdminProductCard";

interface AdminProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

function AdminProductList({
  products,
  onEdit,
  onDelete,
}: AdminProductListProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-xl bg-white p-6 text-center text-stone-600">
        No hay productos cargados.
      </p>
    );
  }

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-bold text-stone-900">
        Productos existentes
      </h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <AdminProductCard
            key={product.id}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default AdminProductList;