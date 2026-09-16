import { useRef } from "react";
import AdminProductActions from "../../features/products/components/AdminProductActions";
import AdminProductEditor from "../../features/products/components/AdminProductEditor";
import AdminProductList from "../../features/products/components/AdminProductList";
import AdminProductSearch from "../../features/products/components/AdminProductSearch";
import { useAdminProducts } from "../../features/products/hooks/useAdminProducts";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";

function AdminProductsPage() {
  const admin = useAdminProducts();
  const formRef = useRef<HTMLDivElement>(null);

  const handleEdit = (product: Parameters<typeof admin.setEditingProduct>[0]) => {
    admin.setEditingProduct(product);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">
          Administrar productos
        </h2>
        <p className="mt-1 text-stone-600">
          Gestioná los productos disponibles en la tienda.
        </p>
      </div>

      <AdminProductActions
        onCreate={() => {
          admin.setMode("create");
          admin.setEditingProduct(null);
          admin.setMessage("");
        }}
        onEdit={() => {
          admin.setMode("edit");
          admin.setEditingProduct(null);
          admin.setMessage("");
        }}
      />

      {admin.mode === "create" && (
        <div ref={formRef}>
          <AdminProductEditor
            product={null}
            onSubmit={admin.create}
            onCancel={() => admin.setMode(null)}
          />
        </div>
      )}

      {admin.mode === "edit" && (
        <div className="space-y-5">
          {admin.editingProduct && (
            <div ref={formRef}>
              <AdminProductEditor
                product={admin.editingProduct}
                onSubmit={admin.update}
                onCancel={() => admin.setEditingProduct(null)}
              />
            </div>
          )}

          <AdminProductSearch
            value={admin.search}
            onChange={admin.setSearch}
          />

          {admin.loading && (
            <LoadingState message="Cargando productos..." />
          )}

          {admin.error && (
            <ErrorState message={admin.error} />
          )}

          {!admin.loading && !admin.error && (
            <AdminProductList
              products={admin.filteredProducts}
              onEdit={handleEdit}
              onDelete={admin.remove}
            />
          )}
        </div>
      )}

      {admin.message && (
        <p className="rounded-xl bg-amber-50 p-3 text-sm font-medium text-amber-800">
          {admin.message}
        </p>
      )}
    </section>
  );
}

export default AdminProductsPage;