import type { CartItem } from "../../../types/cart";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (
    productId: string,
    quantity: number,
  ) => void;
  onRemove: (productId: string) => void;
}

function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) {
  const { product, quantity } = item;

  const reachedStockLimit = quantity >= product.stock;

  const handleRemove = () => {
    const confirmed = window.confirm(
      `¿Seguro que querés eliminar "${product.name}" del carrito?`,
    );

    if (confirmed) {
      onRemove(product.id);
    }
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      handleRemove();
      return;
    }

    onUpdateQuantity(product.id, quantity - 1);
  };

  return (
    <article className="rounded-2xl border border-amber-200 bg-white p-4">
      <h3 className="font-bold text-stone-900">
        {product.name}
      </h3>

      <p className="mt-1 text-sm text-stone-600">
        ${product.price.toLocaleString("es-AR")} c/u
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleDecrease}
          className="cursor-pointer rounded-lg border border-amber-300 px-3 py-1"
        >
          −
        </button>

        <span className="font-medium">
          Cantidad: {quantity}
        </span>

        <button
          type="button"
          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
          disabled={reachedStockLimit}
          title={
            reachedStockLimit
              ? "Stock máximo alcanzado"
              : "Agregar una unidad"
          }
          className="cursor-pointer rounded-lg border border-amber-300 px-3 py-1 disabled:cursor-not-allowed disabled:border-stone-200 disabled:text-stone-400"
        >
          +
        </button>

        {reachedStockLimit && (
          <span className="text-xs font-medium text-amber-700">
            Stock máximo alcanzado
          </span>
        )}

        <button
          type="button"
          onClick={handleRemove}
          className="ml-auto cursor-pointer text-sm font-medium text-red-600 hover:underline"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default CartItemCard;