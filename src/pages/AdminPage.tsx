import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

function AdminPage() {
  const { user } = useAuth();

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">
          Panel de administración
        </h2>
        <p className="mt-1 text-stone-600">
          Bienvenida, {user?.displayName} 🐾
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/admin/products"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-amber-300"
        >
          <h3 className="text-lg font-bold text-stone-900">
            Productos
          </h3>
          <p className="mt-2 text-sm text-stone-600">
            Crear, editar y eliminar productos del catálogo.
          </p>
        </Link>

        <Link
          to="/admin/orders"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-amber-300"
        >
          <h3 className="text-lg font-bold text-stone-900">
            Órdenes
          </h3>
          <p className="mt-2 text-sm text-stone-600">
            Consultar pedidos y actualizar sus estados.
          </p>
        </Link>
      </div>
    </section>
  );
}

export default AdminPage;