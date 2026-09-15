import { createContext } from "react";
import type { Product } from "../../../types/product";
import type { CartItem } from "../../../types/cart";

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(
  null,
);