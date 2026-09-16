import { useState, type FormEvent } from "react";
import type { ProductInput } from "../types/productInput";
import ProductFields from "./ProductFields";
import ProductImageField from "./ProductImageField";
import { uploadProductImage } from "../services/imageUploadService";

interface ProductFormProps {
  initialValues?: ProductInput;
  submitLabel: string;
  onSubmit: (product: ProductInput) => Promise<void>;
  resetAfterSubmit?: boolean;
}

const emptyProduct: ProductInput = {
  name: "",
  description: "",
  price: 0,
  category: "",
  imageUrl: "",
  stock: 0,
};

function ProductForm({
  initialValues = emptyProduct,
  submitLabel,
  onSubmit,
  resetAfterSubmit = false,
}: ProductFormProps) {
  const [product, setProduct] = useState(initialValues);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    setLoading(true);

    try {
      let productToSave = product;

      if (imageFile) {
        const imageUrl = await uploadProductImage(imageFile);
        productToSave = { ...product, imageUrl };
      }

      await onSubmit(productToSave);

      if (resetAfterSubmit) {
        setProduct(emptyProduct);
        setImageFile(null);
        form.reset();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ProductFields
        product={product}
        setProduct={setProduct}
      />

      <ProductImageField onChange={setImageFile} />

      <button
        type="submit"
        disabled={loading}
        className="cursor-pointer rounded-lg bg-amber-600 px-5 py-3 font-medium text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-stone-300"
      >
        {loading ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}

export default ProductForm;