import { Link, useParams } from "react-router-dom";
import { useProduct } from "../features/products/hooks/useProduct";

function ProductDetailPage() {
  const { productId } = useParams();
  const { product, loading, error } = useProduct(productId ?? "");

  if (loading) {
    return <p>Cargando producto...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <section>
      <Link to="/">Volver al catálogo</Link>

      <img src={product.imageUrl} alt={product.name} />

      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>Categoría: {product.category}</p>
      <p>Stock disponible: {product.stock}</p>
    </section>
  );
}

export default ProductDetailPage;