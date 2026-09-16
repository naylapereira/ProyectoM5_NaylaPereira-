import { Link } from "react-router-dom";
import type { Order } from "../../../types/order";
import { getOrderStatusLabel } from "../utils/getOrderStatusLabel";

interface OrderCardProps {
  order: Order;
}

function OrderCard({ order }: OrderCardProps) {
  return (
    <article className="rounded-2xl border border-amber-200 bg-white p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
        <div>
          <p className="text-sm text-stone-500">
            {order.createdAt.toLocaleDateString("es-AR")}
          </p>
          <p className="mt-1 font-medium text-stone-700">
            Estado: {getOrderStatusLabel(order.status)}
          </p>
        </div>

        <p className="text-lg font-bold text-stone-900">
          ${order.total.toLocaleString("es-AR")}
        </p>
      </div>

      <Link
        to={`/orders/${order.id}`}
        className="mt-4 inline-block font-medium text-amber-700 hover:underline"
      >
        Ver detalle →
      </Link>
    </article>
  );
}

export default OrderCard;