import { useMemo, useState } from "react";
import AdminOrderList from "../../features/orders/components/AdminOrderList";
import OrderStatusFilter from "../../features/orders/components/OrderStatusFilter";
import { useAdminOrders } from "../../features/orders/hooks/useAdminOrders";
import {
  filterOrders,
  type OrderFilter,
} from "../../features/orders/utils/filterOrders";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";

function AdminOrdersPage() {
  const { orders, loading, error, changeStatus } = useAdminOrders();
  const [filter, setFilter] = useState<OrderFilter>("all");

  const filteredOrders = useMemo(
    () => filterOrders(orders, filter),
    [orders, filter],
  );

  if (loading) {
    return <LoadingState message="Cargando órdenes..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">
          Administrar órdenes
        </h2>

        <p className="mt-1 text-stone-600">
          Consultá los pedidos y actualizá su estado.
        </p>
      </div>

      <OrderStatusFilter
        value={filter}
        onChange={setFilter}
      />

      <AdminOrderList
        orders={filteredOrders}
        onStatusChange={changeStatus}
      />
    </section>
  );
}

export default AdminOrdersPage;