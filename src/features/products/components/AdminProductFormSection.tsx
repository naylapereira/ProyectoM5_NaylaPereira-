import type { Product } from "../../../types/product";
import type { ProductInput } from "../types/productInput";
import ProductForm from "./ProductForm";

interface AdminProductFormSectionProps {
  product: Product | null;
  onSubmit: (product: ProductInput) => Promise<void>;
  onCancel: () => void;
}

function AdminProductFormSection({
  product,
  onSubmit,
  onCancel,
}: AdminProductFormSectionProps) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5">
      <h3 className="text-lg font-bold text-stone-900">
        {product ? "Editar producto" : "Nuevo producto"}
      </h3>

      <div className="mt-4">
        <ProductForm
          key={product?.id ?? "new"}
          initialValues={product ?? undefined}
          submitLabel={product ? "Guardar cambios" : "Crear producto"}
          onSubmit={onSubmit}
          resetAfterSubmit={!product}
        />
      </div>

      <button
        type="button"
        onClick={onCancel}
        className="mt-3 cursor-pointer rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100"
      >
        {product ? "Cancelar edición" : "Cancelar"}
      </button>
    </div>
  );
}

export default AdminProductFormSection;