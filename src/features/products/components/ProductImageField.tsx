interface ProductImageFieldProps {
  onChange: (file: File | null) => void;
}

function ProductImageField({
  onChange,
}: ProductImageFieldProps) {
  return (
    <label>
      Imagen:
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(event) =>
          onChange(event.target.files?.[0] ?? null)
        }
      />
    </label>
  );
}

export default ProductImageField;