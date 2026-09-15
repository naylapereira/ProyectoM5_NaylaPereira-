import { Link, Outlet } from "react-router-dom";
import { useCart } from "../features/cart/hooks/useCart";

function CustomerLayout() {
  const { items } = useCart();

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div>
      <header>
        <h1>Patagonix Store</h1>

        <nav>
          <Link to="/">Inicio</Link>
        </nav>

        <Link to="/cart">Carrito ({totalItems})</Link>

        <Link to="/orders">Mis órdenes</Link>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default CustomerLayout;