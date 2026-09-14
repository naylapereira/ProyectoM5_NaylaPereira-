import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductFilters from "../features/products/components/ProductFilters";
import ProductList from "../features/products/components/ProductList";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useProducts } from "../features/products/hooks/useProducts";
import { filterProducts } from "../features/products/utils/filterProducts";
import { useDebounce } from "../features/products/hooks/useDebounce";

function HomePage() {
  const { user, logout } = useAuth();
  const { products, loading, error } = useProducts();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

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

      <p>Hola, {user?.displayName}</p>
      <p>Rol: {user?.role}</p>

      <button type="button" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </section>
  );
}

export default HomePage;