import { Link, useParams } from "react-router-dom";
import { useOrder } from "../features/orders/hooks/useOrder";
import { getOrderStatusLabel } from "../features/orders/utils/getOrderStatusLabel";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

function OrderDetailPage() {
  const { orderId } = useParams();
  const { order, loading, error } = useOrder(orderId ?? "");

  if (loading) {
    return <LoadingState message="Cargando orden..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!order) {
    return <ErrorState message="Orden no encontrada." />;
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">
          Detalle de la orden
        </h2>
        <p className="mt-1 break-all text-sm text-stone-500">
          Orden: {order.id}
        </p>
        <p className="mt-2 font-medium text-stone-700">
          Estado: {getOrderStatusLabel(order.status)}
        </p>
      </div>

      <div className="space-y-3">
        {order.items.map((item) => (
          <article
            key={item.product.id}
            className="rounded-2xl border border-amber-200 bg-white p-5"
          >
            <h3 className="font-bold text-stone-900">
              {item.product.name}
            </h3>
            <p className="mt-1 text-sm text-stone-600">
              Cantidad: {item.quantity}
            </p>
            <p className="mt-2 font-medium text-stone-900">
              Subtotal: $
              {(item.product.price * item.quantity).toLocaleString("es-AR")}
            </p>
          </article>
        ))}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xl font-bold text-stone-900">
          Total: ${order.total.toLocaleString("es-AR")}
        </p>

        <Link
          to="/orders"
          className="font-medium text-amber-700 hover:underline"
        >
          ← Volver a mis órdenes
        </Link>
      </div>
    </section>
  );
}

export default OrderDetailPage;