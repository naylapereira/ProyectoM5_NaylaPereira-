import type { Product } from "../../../types/product";

export type CartAction =
  | {
      type: "ADD_ITEM";
      payload: Product;
    }
  | {
      type: "REMOVE_ITEM";
      payload: string;
    }
  | {
      type: "UPDATE_QUANTITY";
      payload: {
        productId: string;
        quantity: number;
      };
    }
  | {
      type: "CLEAR_CART";
    };