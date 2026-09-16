import type { CartItem } from "../../../types/cart";

interface CheckoutSummaryProps {
  items: CartItem[];
  total: number;
}

function CheckoutSummary({
  items,
  total,
}: CheckoutSummaryProps) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-white p-5">
      <h3 className="font-bold text-stone-900">
        Resumen del pedido
      </h3>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex justify-between gap-4 border-b border-stone-100 pb-3"
          >
            <span className="text-stone-700">
              {item.product.name} × {item.quantity}
            </span>

            <span className="font-medium text-stone-900">
              ${(item.product.price * item.quantity).toLocaleString("es-AR")}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xl font-bold text-stone-900">
        Total: ${total.toLocaleString("es-AR")}
      </p>
    </div>
  );
}

export default CheckoutSummary;