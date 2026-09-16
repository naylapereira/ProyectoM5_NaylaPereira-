import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { productMock } from "../../test/mocks/productMock";
import { CartProvider } from "./context/CartProvider";
import { useCart } from "./hooks/useCart";

function TestCart() {
  const { items, addItem, clearCart } = useCart();

  return (
    <>
      <p>Productos: {items.length}</p>

      <button onClick={() => addItem(productMock)}>
        Agregar
      </button>

      <button onClick={clearCart}>
        Vaciar
      </button>
    </>
  );
}

describe("integración del carrito", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("agrega y elimina productos desde la interfaz", () => {
    render(
      <CartProvider>
        <TestCart />
      </CartProvider>,
    );

    expect(screen.getByText("Productos: 0")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Agregar"));
    expect(screen.getByText("Productos: 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Vaciar"));
    expect(screen.getByText("Productos: 0")).toBeInTheDocument();
  });
});