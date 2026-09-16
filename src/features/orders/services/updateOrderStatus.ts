import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebase/firebaseConfig";
import type { OrderStatus } from "../../../types/order";

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
): Promise<void> => {
  const orderRef = doc(db, "orders", orderId);

  await updateDoc(orderRef, {
    status,
  });
};