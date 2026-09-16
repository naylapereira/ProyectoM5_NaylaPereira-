interface AdminProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

function AdminProductSearch({
  value,
  onChange,
}: AdminProductSearchProps) {
  return (
    <label className="block text-sm font-medium text-stone-700">
      Buscar producto
      <input
        type="search"
        value={value}
        placeholder="Ej: alimento, collar, juguete..."
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 outline-none focus:border-amber-500"
      />
    </label>
  );
}

export default AdminProductSearch;