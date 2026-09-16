import type { Order, OrderStatus } from "../../../types/order";

export type OrderFilter = "all" | OrderStatus;

export const filterOrders = (
  orders: Order[],
  filter: OrderFilter,
): Order[] => {
  if (filter === "all") {
    return orders;
  }

  return orders.filter((order) => order.status === filter);
};