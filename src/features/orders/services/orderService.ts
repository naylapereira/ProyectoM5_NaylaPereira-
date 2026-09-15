import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../services/firebase/firebaseConfig";
import type { CreateOrderData } from "../types/createOrder";

export const createOrder = async (
  order: CreateOrderData,
): Promise<string> => {
  const orderRef = await addDoc(collection(db, "orders"), {
    ...order,
    createdAt: serverTimestamp(),
  });

  return orderRef.id;
};