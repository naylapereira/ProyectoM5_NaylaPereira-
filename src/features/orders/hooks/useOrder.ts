import { useEffect, useState } from "react";
import type { Order } from "../../../types/order";
import { getOrderById } from "../services/getOrderById";

export const useOrder = (orderId: string) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch {
        setError("No se pudo cargar la orden.");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  return { order, loading, error };
};