import type { Order, OrderStatus } from "../../../types/order";

interface AdminOrderCardProps {
  order: Order;
  onStatusChange: (
    orderId: string,
    status: OrderStatus,
  ) => Promise<void>;
}

function AdminOrderCard({
  order,
  onStatusChange,
}: AdminOrderCardProps) {
  return (
    <article>
      <h3>Orden #{order.id}</h3>

      <p>Usuario: {order.userId}</p>
      <p>Fecha: {order.createdAt.toLocaleDateString()}</p>
      <p>Total: ${order.total}</p>

      <label>
        Estado:
        <select
          value={order.status}
          onChange={(event) =>
            void onStatusChange(
              order.id,
              event.target.value as OrderStatus,
            )
          }
        >
          <option value="pending">Pendiente</option>
          <option value="processing">En proceso</option>
          <option value="completed">Completada</option>
          <option value="cancelled">Cancelada</option>
        </select>
      </label>
    </article>
  );
}

export default AdminOrderCard;