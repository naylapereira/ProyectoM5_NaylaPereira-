import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/firebase/firebaseConfig";
import type { Product } from "../../../types/product";

export const getProductById = async (
  productId: string,
): Promise<Product | null> => {
  const productRef = doc(db, "products", productId);
  const snapshot = await getDoc(productRef);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as Product;
};