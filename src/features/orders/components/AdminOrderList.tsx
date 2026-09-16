import type { Order, OrderStatus } from "../../../types/order";
import AdminOrderCard from "./AdminOrderCard";

interface AdminOrderListProps {
  orders: Order[];
  onStatusChange: (
    orderId: string,
    status: OrderStatus,
  ) => Promise<void>;
}

function AdminOrderList({
  orders,
  onStatusChange,
}: AdminOrderListProps) {
  if (orders.length === 0) {
    return (
      <p className="rounded-xl bg-white p-6 text-center text-stone-600">
        No hay órdenes para mostrar.
      </p>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {orders.map((order) => (
        <AdminOrderCard
          key={order.id}
          order={order}
          onStatusChange={onStatusChange}
        />
      ))}
    </section>
  );
}

export default AdminOrderList;