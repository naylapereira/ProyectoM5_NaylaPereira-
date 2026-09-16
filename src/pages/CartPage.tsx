import { Link } from "react-router-dom";
import CartItemCard from "../features/cart/components/CartItemCard";
import { useCart } from "../features/cart/hooks/useCart";

function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const handleClearCart = () => {
    const confirmed = window.confirm(
      "¿Seguro que querés vaciar todo el carrito?",
    );

    if (confirmed) {
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-amber-200 bg-white p-8 text-center">
        <h2 className="text-2xl font-bold">Tu carrito</h2>
        <p className="mt-2 text-stone-600">
          El carrito está vacío.
        </p>
        <Link
          to="/"
          className="mt-5 inline-block rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700"
        >
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-stone-900">
        Tu carrito
      </h2>

      <div className="space-y-3">
        {items.map((item) => (
          <CartItemCard
            key={item.product.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>

      <div className="rounded-2xl bg-white p-5">
        <p className="text-xl font-bold text-stone-900">
          Total: ${total.toLocaleString("es-AR")}
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/checkout"
            className="rounded-lg bg-amber-600 px-4 py-2 text-center font-medium text-white hover:bg-amber-700"
          >
            Continuar al checkout
          </Link>

          <button
            type="button"
            onClick={handleClearCart}
            className="cursor-pointer rounded-lg border border-red-300 px-4 py-2 font-medium text-red-600 hover:bg-red-50"
          >
            Vaciar carrito
          </button>

          <Link
            to="/"
            className="px-4 py-2 text-center font-medium text-amber-700 hover:underline"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CartPage;