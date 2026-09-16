interface ProductFiltersProps {
  search: string;
  category: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

function ProductFilters({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2">
      <input
        type="search"
        placeholder="Buscar productos..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 outline-none focus:border-amber-500"
      />

      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 outline-none focus:border-amber-500"
      >
        <option value="all">Todas las categorías</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </option>
        ))}
      </select>
    </section>
  );
}

export default ProductFilters;