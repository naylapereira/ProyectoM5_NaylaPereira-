import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useCart } from "../features/cart/hooks/useCart";

function CustomerLayout() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <header>
        <h1>Mundo Patitas</h1>
        
        {location.pathname === "/" && (
          <p>¡Qué lindo verte, {user?.displayName}! 🐾</p>
        )}
        
        <nav>
          {location.pathname !== "/" && (
            <Link to="/">Inicio</Link>
          )}

          <Link to="/cart">Carrito ({totalItems})</Link>
          <Link to="/orders">Mis órdenes</Link>

          {user?.role === "admin" && (
            <Link to="/admin">Panel admin</Link>
          )}
        </nav>

        <button type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default CustomerLayout;