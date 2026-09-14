import { Link, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <header>
        <h1>Panel de administración</h1>

        <nav>
          <Link to="/admin">Inicio admin</Link>
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