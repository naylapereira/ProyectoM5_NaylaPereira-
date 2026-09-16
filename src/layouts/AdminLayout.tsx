import { Link, Outlet, useLocation } from "react-router-dom";

function AdminLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-2xl font-bold text-amber-700">
            Mundo Patitas 🐾
          </h1>

          <p className="mt-1 text-sm font-medium text-stone-500">
            Panel de administración
          </p>

          <nav className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
            {location.pathname !== "/admin" && (
              <Link
                to="/admin"
                className="text-stone-700 hover:text-amber-700"
              >
                Inicio admin
              </Link>
            )}

            {location.pathname !== "/admin/products" && (
              <Link
                to="/admin/products"
                className="text-stone-700 hover:text-amber-700"
              >
                Productos
              </Link>
            )}

            {location.pathname !== "/admin/orders" && (
              <Link
                to="/admin/orders"
                className="text-stone-700 hover:text-amber-700"
              >
                Órdenes
              </Link>
            )}

            <Link
              to="/"
              className="text-amber-700 hover:underline"
            >
              Ir a la tienda
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;