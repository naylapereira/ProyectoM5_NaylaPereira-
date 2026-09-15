import type { CartState } from "../../../types/cart";

const CART_STORAGE_KEY = "shopping-cart";

export const loadCart = (): CartState => {
  const savedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!savedCart) {
    return { items: [] };
  }

  try {
    return JSON.parse(savedCart) as CartState;
  } catch {
    return { items: [] };
  }
};

export const saveCart = (state: CartState) => {
  localStorage.setItem(
    CART_STORAGE_KEY,
    JSON.stringify(state),
  );
};