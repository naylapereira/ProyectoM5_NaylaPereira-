import { Link } from "react-router-dom";
import OrderCard from "../features/orders/components/OrderCard";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useUserOrders } from "../features/orders/hooks/useUserOrders";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

function OrdersPage() {
  const { user } = useAuth();
  const { orders, loading, error } = useUserOrders(user?.uid ?? "");

  if (loading) {
    return <LoadingState message="Cargando órdenes..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (orders.length === 0) {
    return (
      <section className="rounded-2xl border border-amber-200 bg-white p-8 text-center">
        <h2 className="text-2xl font-bold text-stone-900">
          Mis órdenes
        </h2>

        <p className="mt-2 text-stone-600">
          Todavía no realizaste ninguna compra.
        </p>

        <Link
          to="/"
          className="mt-5 inline-block rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700"
        >
          Ir al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-stone-900">
        Mis órdenes
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}

export default OrdersPage;