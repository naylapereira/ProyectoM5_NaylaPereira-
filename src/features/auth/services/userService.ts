import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../services/firebase/firebaseConfig";
import type { AppUser } from "../../../types/user";

export const getUserById = async (
  uid: string,
): Promise<AppUser | null> => {
  const userRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userRef);

  if (!userSnapshot.exists()) {
    return null;
  }

  return userSnapshot.data() as AppUser;
};

export const createCustomerUser = async (
  user: AppUser,
): Promise<void> => {
  const userRef = doc(db, "users", user.uid);

  await setDoc(userRef, {
    ...user,
    role: "customer",
  });
};