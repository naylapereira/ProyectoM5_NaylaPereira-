import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../../../types/cart";
import { createOrder } from "../services/orderService";

export const useCheckout = (
  userId: string,
  items: CartItem[],
  total: number,
  clearCart: () => void,
) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const confirmOrder = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError("");

      const orderId = await createOrder({
        userId,
        items,
        total,
        status: "pending",
      });

      clearCart();
      navigate(`/orders/${orderId}`);
    } catch {
      setError("No se pudo crear la orden.");
    } finally {
      setLoading(false);
    }
  };

  return { confirmOrder, loading, error };
};