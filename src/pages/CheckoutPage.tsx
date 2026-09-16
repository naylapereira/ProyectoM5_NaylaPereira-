import { Link } from "react-router-dom";
import { useState } from "react";
import CheckoutPayment from "../features/orders/components/CheckoutPayment";
import CheckoutSummary from "../features/orders/components/CheckoutSummary";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useCart } from "../features/cart/hooks/useCart";
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
      <section className="rounded-2xl border border-amber-200 bg-white p-8 text-center">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <p className="mt-2 text-stone-600">
          No hay productos para comprar.
        </p>
        <Link
          to="/"
          className="mt-5 inline-block rounded-lg bg-amber-600 px-4 py-2 font-medium text-white"
        >
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-stone-900">
        Revisar compra
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <CheckoutSummary items={items} total={total} />

        <CheckoutPayment
          paymentMethod={paymentMethod}
          loading={loading}
          error={error}
          onPaymentChange={setPaymentMethod}
          onConfirm={confirmOrder}
        />
      </div>

      <Link
        to="/cart"
        className="inline-block font-medium text-amber-700 hover:underline"
      >
        ← Volver al carrito
      </Link>
    </section>
  );
}

export default CheckoutPage;