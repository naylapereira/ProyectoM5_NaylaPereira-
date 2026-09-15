import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/firebase/firebaseConfig";
import type { Order } from "../../../types/order";

export const getOrderById = async (
  orderId: string,
): Promise<Order | null> => {
  const orderRef = doc(db, "orders", orderId);
  const snapshot = await getDoc(orderRef);

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,
    userId: data.userId,
    items: data.items,
    total: data.total,
    status: data.status,
    createdAt: data.createdAt?.toDate() ?? new Date(),
  } as Order;
};