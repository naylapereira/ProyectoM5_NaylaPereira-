import { useCallback, useEffect, useState } from "react";
import type { Order, OrderStatus } from "../../../types/order";
import { getAllOrders } from "../services/getAllOrders";
import { updateOrderStatus } from "../services/updateOrderStatus";

export const useAdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = useCallback(async () => {
    try {
      setError("");
      const data = await getAllOrders();
      setOrders(data);
    } catch {
      setError("No se pudieron cargar las órdenes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllOrders()
      .then((data) => {
        setOrders(data);
        setError("");
      })
      .catch(() => {
        setError("No se pudieron cargar las órdenes.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const changeStatus = async (
    orderId: string,
    status: OrderStatus,
  ) => {
    await updateOrderStatus(orderId, status);
    await loadOrders();
  };

  return {
    orders,
    loading,
    error,
    changeStatus,
  };
};