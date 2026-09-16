import { describe, expect, it } from "vitest";
import type { CartState } from "../../../types/cart";
import { productMock } from "../../../test/mocks/productMock";
import { cartReducer } from "./cartReducer";

const emptyState: CartState = { items: [] };

describe("cartReducer", () => {
  it("agrega un producto al carrito", () => {
    const state = cartReducer(emptyState, {
      type: "ADD_ITEM",
      payload: productMock,
    });

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(1);
  });

  it("aumenta la cantidad de un producto existente", () => {
    const initialState: CartState = {
      items: [{ product: productMock, quantity: 1 }],
    };

    const state = cartReducer(initialState, {
      type: "ADD_ITEM",
      payload: productMock,
    });

    expect(state.items[0].quantity).toBe(2);
  });

  it("no permite superar el stock disponible", () => {
    const initialState: CartState = {
      items: [{ product: productMock, quantity: 3 }],
    };

    const state = cartReducer(initialState, {
      type: "ADD_ITEM",
      payload: productMock,
    });

    expect(state.items[0].quantity).toBe(3);
  });

  it("no agrega productos sin stock", () => {
    const productWithoutStock = {
      ...productMock,
      stock: 0,
    };

    const state = cartReducer(emptyState, {
      type: "ADD_ITEM",
      payload: productWithoutStock,
    });

    expect(state.items).toHaveLength(0);
  });

  it("limita una actualización de cantidad al stock", () => {
    const initialState: CartState = {
      items: [{ product: productMock, quantity: 1 }],
    };

    const state = cartReducer(initialState, {
      type: "UPDATE_QUANTITY",
      payload: {
        productId: productMock.id,
        quantity: 20,
      },
    });

    expect(state.items[0].quantity).toBe(3);
  });

  it("elimina un producto", () => {
    const initialState: CartState = {
      items: [{ product: productMock, quantity: 1 }],
    };

    const state = cartReducer(initialState, {
      type: "REMOVE_ITEM",
      payload: productMock.id,
    });

    expect(state.items).toHaveLength(0);
  });

  it("vacía el carrito", () => {
    const initialState: CartState = {
      items: [{ product: productMock, quantity: 1 }],
    };

    const state = cartReducer(initialState, {
      type: "CLEAR_CART",
    });

    expect(state.items).toEqual([]);
  });
});