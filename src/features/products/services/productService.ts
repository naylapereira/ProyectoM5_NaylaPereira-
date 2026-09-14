import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebase/firebaseConfig";
import type { Product } from "../../../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(collection(db, "products"));

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  })) as Product[];
};