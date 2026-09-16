import { useState } from "react";
import type { Product } from "../../../types/product";
import { useCart } from "./useCart";

export const useAddToCartFeedback = () => {
  const { items, addItem } = useCart();
  const [message, setMessage] = useState("");

  const addWithFeedback = (product: Product) => {
    const cartItem = items.find(
      (item) => item.product.id === product.id,
    );

    if (cartItem && cartItem.quantity >= product.stock) {
      setMessage("Stock máximo alcanzado");
    } else if (product.stock <= 0) {
      setMessage("Producto sin stock");
    } else {
      addItem(product);
      setMessage("✓ Agregado al carrito");
    }

    window.setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return {
    message,
    addWithFeedback,
  };
};