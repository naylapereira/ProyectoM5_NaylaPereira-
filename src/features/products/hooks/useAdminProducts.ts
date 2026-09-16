import { useState } from "react";
import type { Product } from "../../../types/product";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../services/adminProductService";
import type { ProductInput } from "../types/productInput";
import { useProducts } from "./useProducts";

export type AdminProductMode = "create" | "edit" | null;

export const useAdminProducts = () => {
  const [mode, setMode] = useState<AdminProductMode>(null);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const { products, loading, error, refresh } = useProducts();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  const create = async (product: ProductInput) => {
    try {
      await createProduct(product);
      await refresh();
      setMessage("Producto creado correctamente.");
    } catch {
      setMessage("No se pudo crear el producto.");
      throw new Error("No se pudo crear el producto.");
    }
  };

  const update = async (product: ProductInput) => {
    if (!editingProduct) return;

    try {
      await updateProduct(editingProduct.id, product);
      await refresh();
      setEditingProduct(null);
      setMessage("Producto actualizado correctamente.");
    } catch {
      setMessage("No se pudo actualizar el producto.");
      throw new Error("No se pudo actualizar el producto.");
    }
  };

  const remove = async (productId: string) => {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) {
      return;
    }

    try {
      await deleteProduct(productId);
      await refresh();
      setMessage("Producto eliminado correctamente.");
    } catch {
      setMessage("No se pudo eliminar el producto.");
    }
  };

  return {
    mode,
    message,
    search,
    editingProduct,
    filteredProducts,
    loading,
    error,
    setMode,
    setMessage,
    setSearch,
    setEditingProduct,
    create,
    update,
    remove,
  };
};