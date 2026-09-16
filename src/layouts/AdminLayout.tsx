import { Link, Outlet, useLocation } from "react-router-dom";

function AdminLayout() {
  const location = useLocation();

  return (
    <div>
      <header>
        <h1>Administración de Mundo Patitas</h1>

        <nav>
          {location.pathname !== "/admin" && (
            <Link to="/admin">Inicio admin</Link>
          )}

          {location.pathname !== "/admin/products" && (
            <Link to="/admin/products">Productos</Link>
          )}

          {location.pathname !== "/admin/orders" && (
            <Link to="/admin/orders">Órdenes</Link>
          )}

          <Link to="/">Ir a la tienda</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;