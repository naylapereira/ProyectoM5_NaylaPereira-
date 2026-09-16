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
    <label className="block max-w-xs text-sm font-medium text-stone-700">
      Filtrar por estado
      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value as OrderFilter)
        }
        className="mt-1 w-full cursor-pointer rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
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