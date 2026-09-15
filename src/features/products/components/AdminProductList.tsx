import type { Product } from "../../../types/product";

interface AdminProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

function AdminProductList({
  products,
  onEdit,
  onDelete,
}: AdminProductListProps) {
  if (products.length === 0) {
    return <p>No hay productos cargados.</p>;
  }

  return (
    <section>
      <h3>Productos existentes</h3>

      {products.map((product) => (
        <article key={product.id}>
          <strong>{product.name}</strong>

          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              width="150"
            />
          )}

          <p>Categoría: {product.category}</p>
          <p>Precio: ${product.price}</p>
          <p>Stock: {product.stock}</p>

          <button
            type="button"
            onClick={() => onEdit(product)}
          >
            Editar
          </button>

          <button
            type="button"
            onClick={() => onDelete(product.id)}
          >
            Eliminar
          </button>
        </article>
      ))}
    </section>
  );
}

export default AdminProductList;