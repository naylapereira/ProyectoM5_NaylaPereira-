interface ProductImageFieldProps {
  onChange: (file: File | null) => void;
}

function ProductImageField({
  onChange,
}: ProductImageFieldProps) {
  return (
    <label className="block text-sm font-medium text-stone-700">
      Imagen
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(event) =>
          onChange(event.target.files?.[0] ?? null)
        }
        className="mt-1 block w-full cursor-pointer rounded-xl border border-stone-300 bg-white text-sm text-stone-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-amber-100 file:px-4 file:py-3 file:font-medium file:text-amber-800 hover:file:bg-amber-200"
      />
      <span className="mt-1 block text-xs text-stone-500">
        Formatos permitidos: JPG, PNG o WEBP.
      </span>
    </label>
  );
}

export default ProductImageField;