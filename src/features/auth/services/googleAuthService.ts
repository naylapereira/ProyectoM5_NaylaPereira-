import { loginWithGoogle } from "./authService";
import {
  createCustomerUser,
  getUserById,
} from "./userService";

export const authenticateWithGoogle = async () => {
  const credential = await loginWithGoogle();
  const { user } = credential;

  const existingUser = await getUserById(user.uid);

  if (!existingUser) {
    await createCustomerUser({
      uid: user.uid,
      email: user.email ?? "",
      displayName: user.displayName ?? "",
      role: "customer",
    });
  }

  return user;
};