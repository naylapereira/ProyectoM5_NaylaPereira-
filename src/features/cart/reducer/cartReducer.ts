import type { CartState } from "../../../types/cart";
import type { CartAction } from "../types/cartActions";
import { addItem, removeItem, updateQuantity } from "./cartReducerHelpers";

export const cartReducer = (
  state: CartState,
  action: CartAction,
): CartState => {
  switch (action.type) {
    case "ADD_ITEM":
      return addItem(state, action.payload);

    case "REMOVE_ITEM":
      return removeItem(state, action.payload);

    case "UPDATE_QUANTITY":
      return updateQuantity(
        state,
        action.payload.productId,
        action.payload.quantity,
      );

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
};