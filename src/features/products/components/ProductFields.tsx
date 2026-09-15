import type { Dispatch, SetStateAction } from "react";
import type { ProductInput } from "../types/productInput";

interface ProductFieldsProps {
  product: ProductInput;
  setProduct: Dispatch<SetStateAction<ProductInput>>;
}

function ProductFields({
  product,
  setProduct,
}: ProductFieldsProps) {
  const updateField = (
    field: keyof ProductInput,
    value: string | number,
  ) => {
    setProduct((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <>
      <label>
        Nombre:
        <input
          required
          value={product.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
      </label>

      <label>
        Descripción:
        <textarea
          required
          value={product.description}
          onChange={(e) =>
            updateField("description", e.target.value)
          }
        />
      </label>

      <label>
        Precio:
        <input
          required
          min="0"
          type="number"
          value={product.price || ""}
          onChange={(e) =>
            updateField("price", Number(e.target.value))
          }
        />
      </label>

      <label>
        Categoría:
        <input
          required
          value={product.category}
          onChange={(e) =>
            updateField("category", e.target.value)
          }
        />
      </label>

      <label>
        Stock:
        <input
          required
          min="0"
          type="number"
          value={product.stock || ""}
          onChange={(e) =>
            updateField("stock", Number(e.target.value))
          }
        />
      </label>
    </>
  );
}

export default ProductFields;