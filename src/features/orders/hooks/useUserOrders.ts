import { useEffect, useState } from "react";
import type { Order } from "../../../types/order";
import { getUserOrders } from "../services/getUserOrders";

export const useUserOrders = (userId: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getUserOrders(userId);
        setOrders(data);
      } catch {
        setError("No se pudieron cargar las órdenes.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [userId]);

  return { orders, loading, error };
};