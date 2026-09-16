import type { OrderFilter } from "../utils/filterOrders";

interface OrderStatusFilterProps {
  value: OrderFilter;
  onChange: (filter: OrderFilter) => void;
}

function OrderStatusFilter({
  value,
  onChange,
}: OrderStatusFilterProps) {
  return (
    <label>
      Filtrar por estado:

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value as OrderFilter)
        }
      >
        <option value="all">Todas</option>
        <option value="pending">Pendientes</option>
        <option value="processing">En proceso</option>
        <option value="completed">Completadas</option>
        <option value="cancelled">Canceladas</option>
      </select>
    </label>
  );
}

export default OrderStatusFilter;