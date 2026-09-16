import type { OrderStatus } from "../../../types/order";

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pendiente",
  processing: "En proceso",
  completed: "Completada",
  cancelled: "Cancelada",
};

export const getOrderStatusLabel = (
  status: OrderStatus,
): string => {
  return statusLabels[status];
};