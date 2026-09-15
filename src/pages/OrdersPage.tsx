import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useUserOrders } from "../features/orders/hooks/useUserOrders";

function OrdersPage() {
  const { user } = useAuth();
  const { orders, loading, error } = useUserOrders(user?.uid ?? "");

  if (loading) {
    return <p>Cargando órdenes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (orders.length === 0) {
    return <p>Todavía no realizaste ninguna compra.</p>;
  }

  return (
    <section>
      <h2>Mis órdenes</h2>

      {orders.map((order) => (
        <article key={order.id}>
          <p>Fecha: {order.createdAt.toLocaleDateString()}</p>
          <p>Estado: {order.status}</p>
          <p>Total: ${order.total}</p>

          <Link to={`/orders/${order.id}`}>
            Ver detalle
          </Link>
        </article>
      ))}
    </section>
  );
}

export default OrdersPage;