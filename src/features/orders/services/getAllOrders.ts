import {
  collection,
  getDocs,
  type Timestamp,
} from "firebase/firestore";
import { db } from "../../../services/firebase/firebaseConfig";
import type { Order } from "../../../types/order";

interface FirestoreOrder extends Omit<Order, "id" | "createdAt"> {
  createdAt: Timestamp;
}

export const getAllOrders = async (): Promise<Order[]> => {
  const snapshot = await getDocs(collection(db, "orders"));

  return snapshot.docs.map((document) => {
    const data = document.data() as FirestoreOrder;

    return {
      ...data,
      id: document.id,
      createdAt: data.createdAt.toDate(),
    };
  });
};