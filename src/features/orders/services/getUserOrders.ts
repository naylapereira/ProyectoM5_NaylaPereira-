import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../services/firebase/firebaseConfig";
import type { Order } from "../../../types/order";

export const getUserOrders = async (
  userId: string,
): Promise<Order[]> => {
  const ordersQuery = query(
    collection(db, "orders"),
    where("userId", "==", userId),
  );

  const snapshot = await getDocs(ordersQuery);

  return snapshot.docs.map((document) => {
    const data = document.data();

    return {
      id: document.id,
      userId: data.userId,
      items: data.items,
      total: data.total,
      status: data.status,
      createdAt: data.createdAt?.toDate() ?? new Date(),
    } as Order;
  });
};