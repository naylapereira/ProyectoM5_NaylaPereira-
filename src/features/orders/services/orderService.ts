import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../services/firebase/firebaseConfig";
import type { CreateOrderData } from "../types/createOrder";

export const createOrder = async (
  order: CreateOrderData,
): Promise<string> => {
  const orderRef = doc(collection(db, "orders"));

  await runTransaction(db, async (transaction) => {
    const productRefs = order.items.map((item) =>
      doc(db, "products", item.product.id),
    );

    const productSnapshots = await Promise.all(
      productRefs.map((productRef) =>
        transaction.get(productRef),
      ),
    );

    productSnapshots.forEach((snapshot, index) => {
      if (!snapshot.exists()) {
        throw new Error("Uno de los productos ya no existe.");
      }

      const currentStock = snapshot.data().stock as number;
      const requestedQuantity = order.items[index].quantity;

      if (currentStock < requestedQuantity) {
        throw new Error(
          `Stock insuficiente para ${order.items[index].product.name}.`,
        );
      }
    });

    productSnapshots.forEach((snapshot, index) => {
      const data = snapshot.data();
      const item = order.items[index];
      const productRef = productRefs[index];

      if (!data || !item || !productRef) {
        throw new Error("No se pudo actualizar el stock.");
      }

      transaction.update(productRef, {
        stock: (data.stock as number) - item.quantity,
      });
    });

    transaction.set(orderRef, {
      ...order,
      createdAt: serverTimestamp(),
    });
  });

  return orderRef.id;
};