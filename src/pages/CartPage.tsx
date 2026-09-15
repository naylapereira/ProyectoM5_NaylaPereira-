import { Link } from "react-router-dom";
import { useCart } from "../features/cart/hooks/useCart";

function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCart();  
  
  const total = items.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0,
  );

  if (items.length === 0) {
    return (
      <section>
        <h2>Tu carrito</h2>
        <p>El carrito está vacío.</p>
        <Link to="/">Volver al catálogo</Link>
      </section>
    );
  }

  return (
    <section>
      <h2>Tu carrito</h2>

      {items.map((item) => (
        <article key={item.product.id}>
          <h3>{item.product.name}</h3>
          <p>Precio: ${item.product.price}</p>
          
          <div>
            <button
              type="button"
              onClick={() =>
                updateQuantity(
                  item.product.id,
                  item.quantity - 1,
                )
              }
            >
              −
            </button>

            <span>Cantidad: {item.quantity}</span>

            <button
              type="button"
              onClick={() =>
                updateQuantity(
                  item.product.id,
                  item.quantity + 1,
                )
              }
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.product.id)}
          >
            Eliminar
          </button>
        </article>
      ))}

      <h3>Total: ${total}</h3>

      <Link to="/checkout">
        Continuar al checkout
      </Link>

      <button type="button" onClick={clearCart}>
        Vaciar carrito
      </button>

      <Link to="/">Seguir comprando</Link>
    </section>
  );
}

export default CartPage;