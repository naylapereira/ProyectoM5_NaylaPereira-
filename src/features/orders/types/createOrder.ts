import type { CartItem } from "../../../types/cart";
import type { OrderStatus } from "../../../types/order";

export interface CreateOrderData {
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
}