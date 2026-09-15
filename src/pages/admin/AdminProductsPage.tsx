import { useRef , useState } from "react";
import AdminProductList from "../../features/products/components/AdminProductList";
import ProductForm from "../../features/products/components/ProductForm";
import { useProducts } from "../../features/products/hooks/useProducts";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../features/products/services/adminProductService";
import type { ProductInput } from "../../features/products/types/productInput";
import type { Product } from "../../types/product";

function AdminProductsPage() {
  const [message, setMessage] = useState("");
  const [editingProduct, setEditingProduct] =
  useState<Product | null>(null);

  const formRef = useRef<HTMLDivElement>(null);
  
  const {
    products,
    loading,
    error,
    refresh,
  } = useProducts();

  const handleCreate = async (product: ProductInput) => {
    try {
      await createProduct(product);
      await refresh();
      setMessage("Producto creado correctamente.");
    } catch {
      setMessage("No se pudo crear el producto.");
    }
  };

  const handleUpdate = async (product: ProductInput) => {
    if (!editingProduct) return;

    try {
      await updateProduct(editingProduct.id, product);
      await refresh();
      setEditingProduct(null);
      setMessage("Producto actualizado correctamente.");
    } catch {
      setMessage("No se pudo actualizar el producto.");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  const handleDelete = async (productId: string) => {
    const confirmed = window.confirm(
      "¿Seguro que querés eliminar este producto?",
    );

    if (!confirmed) return;

    try {
      await deleteProduct(productId);
      await refresh();
      setMessage("Producto eliminado correctamente.");
    } catch {
      setMessage("No se pudo eliminar el producto.");
    }
  };

  return (
    <section>
      <h2>Administrar productos</h2>

      <div ref={formRef}>
        <h3>
          {editingProduct ? "Editar producto" : "Nuevo producto"}
        </h3>
  
        <ProductForm
          key={editingProduct?.id ?? "new"}
          initialValues={editingProduct ?? undefined}
          submitLabel={
            editingProduct ? "Guardar cambios" : "Crear producto"
          }
          onSubmit={
            editingProduct ? handleUpdate : handleCreate
          }
        />

        {editingProduct && (
          <button
            type="button"
            onClick={() => setEditingProduct(null)}
          >
            Cancelar edición
          </button>
        )}
      </div>

      {message && <p>{message}</p>}

      {loading && <p>Cargando productos...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <AdminProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </section>
  );
}

export default AdminProductsPage;