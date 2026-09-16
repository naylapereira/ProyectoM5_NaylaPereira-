import type { Product } from "../../../types/product";
import type { ProductInput } from "../types/productInput";
import AdminProductFormSection from "./AdminProductFormSection";

interface AdminProductEditorProps {
  product: Product | null;
  onSubmit: (product: ProductInput) => Promise<void>;
  onCancel: () => void;
}

function AdminProductEditor({
  product,
  onSubmit,
  onCancel,
}: AdminProductEditorProps) {
  return (
    <AdminProductFormSection
      product={product}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}

export default AdminProductEditor;