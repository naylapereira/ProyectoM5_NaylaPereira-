import type { Product } from "../../../types/product";

export type ProductInput = Omit<Product, "id">;