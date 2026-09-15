import { Link, useParams } from "react-router-dom";
import { useOrder } from "../features/orders/hooks/useOrder";

function OrderDetailPage() {
  const { orderId } = useParams();
  const { order, loading, error } = useOrder(orderId ?? "");

  if (loading) {
    return <p>Cargando orden...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!order) {
    return <p>Orden no encontrada.</p>;
  }

  return (
    <section>
      <h2>Detalle de la orden</h2>

      <p>Orden: {order.id}</p>
      <p>Estado: {order.status}</p>

      {order.items.map((item) => (
        <article key={item.product.id}>
          <h3>{item.product.name}</h3>
          <p>Cantidad: {item.quantity}</p>
          <p>
            Subtotal: ${item.product.price * item.quantity}
          </p>
        </article>
      ))}

      <h3>Total: ${order.total}</h3>

      <Link to="/">Volver al catálogo</Link>
    </section>
  );
}

export default OrderDetailPage;