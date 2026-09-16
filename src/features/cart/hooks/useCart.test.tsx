import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import { productMock } from "../../../test/mocks/productMock";
import { CartProvider } from "../context/CartProvider";
import { useCart } from "./useCart";

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe("useCart", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("agrega un producto mediante el contexto", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(productMock);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe(productMock.id);
  });

  it("limpia el carrito", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(productMock);
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toEqual([]);
  });
});