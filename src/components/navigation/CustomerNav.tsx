import { Link, useLocation } from "react-router-dom";
import type { AppUser } from "../../types/user";

interface CustomerNavProps {
  user: AppUser | null;
  totalItems: number;
}

function CustomerNav({
  user,
  totalItems,
}: CustomerNavProps) {
  const location = useLocation();

  return (
    <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
      {location.pathname !== "/" && (
        <Link to="/" className="hover:text-amber-700">
          Inicio
        </Link>
      )}

      <Link to="/cart" className="hover:text-amber-700">
        Carrito ({totalItems})
      </Link>

      <Link to="/orders" className="hover:text-amber-700">
        Mis órdenes
      </Link>

      {user?.role === "admin" && (
        <Link to="/admin" className="hover:text-amber-700">
          Panel admin
        </Link>
      )}
    </nav>
  );
}

export default CustomerNav;