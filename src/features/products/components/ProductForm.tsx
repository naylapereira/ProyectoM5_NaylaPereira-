import { useState, type FormEvent } from "react";
import type { ProductInput } from "../types/productInput";
import ProductFields from "./ProductFields";
import ProductImageField from "./ProductImageField";
import { uploadProductImage } from "../services/imageUploadService";

interface ProductFormProps {
  initialValues?: ProductInput;
  submitLabel: string;
  onSubmit: (product: ProductInput) => Promise<void>;
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
}: ProductFormProps) {
  const [product, setProduct] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      let productToSave = product;

      if (imageFile) {
        const imageUrl = await uploadProductImage(imageFile);
 
        productToSave = {
          ...product,
          imageUrl,
        };
      }

      await onSubmit(productToSave);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProductFields
        product={product}
        setProduct={setProduct}
      />

      <ProductImageField onChange={setImageFile} />

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}

export default ProductForm;