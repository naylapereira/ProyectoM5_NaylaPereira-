import { useCallback, useEffect, useState } from "react";
import type { Product } from "../../../types/product";
import { getProducts } from "../services/productService";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getProducts();
      setProducts(data);
    } catch {
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialLoad = async () => {
      await loadProducts();
    };

    void initialLoad();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    refresh: loadProducts,
  };
};