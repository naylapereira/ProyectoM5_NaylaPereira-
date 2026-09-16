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
  const formattedDate = order.createdAt.toLocaleDateString("es-AR");
  const formattedTotal = order.total.toLocaleString("es-AR");

  return (
    <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <h3 className="break-all font-bold text-stone-900">
        Orden #{order.id}
      </h3>

      <div className="mt-3 space-y-1 text-sm text-stone-600">
        <p className="break-all">
          <strong className="text-stone-700">Usuario:</strong>{" "}
          {order.userId}
        </p>

        <p>
          <strong className="text-stone-700">Fecha:</strong>{" "}
          {formattedDate}
        </p>

        <p>
          <strong className="text-stone-700">Total:</strong>{" "}
          ${formattedTotal}
        </p>
      </div>

      <label className="mt-4 block text-sm font-medium text-stone-700">
        Estado
        <select
          value={order.status}
          onChange={(event) =>
            void onStatusChange(
              order.id,
              event.target.value as OrderStatus,
            )
          }
          className="mt-1 w-full cursor-pointer rounded-xl border border-stone-300 bg-white px-3 py-2 outline-none focus:border-amber-500"
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