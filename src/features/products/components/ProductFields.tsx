import type { Dispatch, SetStateAction } from "react";
import type { ProductInput } from "../types/productInput";

interface ProductFieldsProps {
  product: ProductInput;
  setProduct: Dispatch<SetStateAction<ProductInput>>;
}

function ProductFields({ product, setProduct }: ProductFieldsProps) {
  const updateField = (
    field: keyof ProductInput,
    value: string | number,
  ) => {
    setProduct((current) => ({ ...current, [field]: value }));
  };

  const inputClass =
    "mt-1 w-full rounded-xl border border-stone-300 px-4 py-3 outline-none focus:border-amber-500";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block text-sm font-medium text-stone-700">
        Nombre
        <input
          required
          value={product.name}
          onChange={(e) => updateField("name", e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block text-sm font-medium text-stone-700">
        Categoría
        <input
          required
          value={product.category}
          onChange={(e) => updateField("category", e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block text-sm font-medium text-stone-700 sm:col-span-2">
        Descripción
        <textarea
          required
          rows={4}
          value={product.description}
          onChange={(e) => updateField("description", e.target.value)}
          className={`${inputClass} resize-y`}
        />
      </label>

      <label className="block text-sm font-medium text-stone-700">
        Precio
        <input
          required
          min="1"
          type="number"
          value={product.price || ""}
          onChange={(e) => updateField("price", Number(e.target.value))}
          className={inputClass}
        />
      </label>

      <label className="block text-sm font-medium text-stone-700">
        Stock
        <input
          required
          min="0"
          type="number"
          value={product.stock || ""}
          onChange={(e) => updateField("stock", Number(e.target.value))}
          className={inputClass}
        />
      </label>
    </div>
  );
}

export default ProductFields;