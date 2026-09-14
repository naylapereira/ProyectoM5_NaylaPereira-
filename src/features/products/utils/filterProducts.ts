import type { Product } from "../../../types/product";

export const filterProducts = (
  products: Product[],
  search: string,
  category: string,
) => {
  const normalizedSearch = search.trim().toLowerCase();

  return products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(normalizedSearch);

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });
};