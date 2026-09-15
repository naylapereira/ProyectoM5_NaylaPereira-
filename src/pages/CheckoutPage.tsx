import { Link } from "react-router-dom";
import { useCart } from "../features/cart/hooks/useCart";
import { useState } from "react";
import PaymentForm from "../features/orders/components/PaymentForm";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useCheckout } from "../features/orders/hooks/useCheckout";

function CheckoutPage() {
  const { items, clearCart } = useCart();

  const { user } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState("");

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const { confirmOrder, loading, error } = useCheckout(
    user?.uid ?? "",
    items,
    total,
    clearCart,
  );

  if (items.length === 0) {
    return (
      <section>
        <h2>Checkout</h2>
        <p>No hay productos para comprar.</p>
        <Link to="/">Volver al catálogo</Link>
      </section>
    );
  }

  return (
    <section>
      <h2>Revisar compra</h2>

      {items.map((item) => (
        <p key={item.product.id}>
          {item.product.name} × {item.quantity}
        </p>
      ))}

      <h3>Total: ${total}</h3>

      <PaymentForm
        paymentMethod={paymentMethod}
        onChange={setPaymentMethod}
      />

      <button
        type="button"
        onClick={confirmOrder}
        disabled={loading || !paymentMethod}
      >
        {loading ? "Procesando..." : "Confirmar compra"}
      </button>

      {error && <p>{error}</p>}
    </section>
  );
}

export default CheckoutPage;