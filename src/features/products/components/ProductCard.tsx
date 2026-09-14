import { Link } from "react-router-dom";
import type { Product } from "../../../types/product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
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
    </article>
  );
}

export default ProductCard;