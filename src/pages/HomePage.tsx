import { useMemo, useState } from "react";
import ProductFilters from "../features/products/components/ProductFilters";
import ProductList from "../features/products/components/ProductList";
import { useProducts } from "../features/products/hooks/useProducts";
import { filterProducts } from "../features/products/utils/filterProducts";
import { useDebounce } from "../features/products/hooks/useDebounce";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";

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
    return <LoadingState message="Cargando productos..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-stone-900">
          Productos para mascotas
        </h2>

        <p className="mt-1 text-sm text-stone-600">
          Encontrá todo lo que necesitan tus compañeros de cuatro patas.
        </p>
      </div>

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