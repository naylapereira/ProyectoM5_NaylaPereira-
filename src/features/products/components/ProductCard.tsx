import { Link } from "react-router-dom";
import type { Product } from "../../../types/product";
import { useCart } from "../../cart/hooks/useCart";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article>
      <img src={product.imageUrl} alt={product.name} />

      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>Stock: {product.stock}</p>

      <Link to={`/products/${product.id}`}>
        Ver detalle
      </Link>

      <button
        type="button"
        onClick={() => addItem(product)}
      >
        Agregar al carrito
      </button>
    </article>
  );
}

export default ProductCard;