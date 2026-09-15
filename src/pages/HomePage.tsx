import { useMemo, useState } from "react";
import ProductFilters from "../features/products/components/ProductFilters";
import ProductList from "../features/products/components/ProductList";
import { useProducts } from "../features/products/hooks/useProducts";
import { filterProducts } from "../features/products/utils/filterProducts";
import { useDebounce } from "../features/products/hooks/useDebounce";

function HomePage() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const debouncedSearch = useDebounce(search);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products],
  );

  const filteredProducts = useMemo(
    () => filterProducts(products, debouncedSearch, category),
    [products, debouncedSearch, category],
  );

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Productos para mascotas</h2>

      <ProductFilters
        search={search}
        category={category}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      <ProductList products={filteredProducts} />
    </section>
  );
}

export default HomePage;