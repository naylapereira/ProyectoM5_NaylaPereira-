import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../services/firebase/firebaseConfig";
import type { ProductInput } from "../types/productInput";

export const createProduct = async (product: ProductInput) => {
  await addDoc(collection(db, "products"), product);
};

export const updateProduct = async (
  productId: string,
  product: ProductInput,
) => {
  await updateDoc(doc(db, "products", productId), product);
};

export const deleteProduct = async (productId: string) => {
  await deleteDoc(doc(db, "products", productId));
};