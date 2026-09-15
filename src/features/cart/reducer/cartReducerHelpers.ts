import type { CartState } from "../../../types/cart";
import type { Product } from "../../../types/product";

export const addItem = (
  state: CartState,
  product: Product,
): CartState => {
  const existingItem = state.items.find(
    (item) => item.product.id === product.id,
  );

  if (existingItem) {
    return {
      ...state,
      items: state.items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    };
  }

  return {
    ...state,
    items: [...state.items, { product, quantity: 1 }],
  };
};

export const removeItem = (
  state: CartState,
  productId: string,
): CartState => ({
  ...state,
  items: state.items.filter(
    (item) => item.product.id !== productId,
  ),
});

export const updateQuantity = (
  state: CartState,
  productId: string,
  quantity: number,
): CartState => {
  if (quantity <= 0) {
    return removeItem(state, productId);
  }

  return {
    ...state,
    items: state.items.map((item) =>
      item.product.id === productId
        ? { ...item, quantity }
        : item,
    ),
  };
};