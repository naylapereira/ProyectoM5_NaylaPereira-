import { useMemo, useState } from "react";
import AdminOrderList from "../../features/orders/components/AdminOrderList";
import OrderStatusFilter from "../../features/orders/components/OrderStatusFilter";
import { useAdminOrders } from "../../features/orders/hooks/useAdminOrders";
import {
  filterOrders,
  type OrderFilter,
} from "../../features/orders/utils/filterOrders";

function AdminOrdersPage() {
  const { orders, loading, error, changeStatus } = useAdminOrders();
  const [filter, setFilter] = useState<OrderFilter>("all");

  const filteredOrders = useMemo(
    () => filterOrders(orders, filter),
    [orders, filter],
  );

  if (loading) {
    return <p>Cargando órdenes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Administrar órdenes</h2>

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