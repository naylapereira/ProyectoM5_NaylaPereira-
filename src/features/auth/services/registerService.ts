import { registerWithEmail } from "./authService";
import { createCustomerUser } from "./userService";

export const registerCustomer = async (
  email: string,
  password: string,
  displayName: string,
) => {
  const credential = await registerWithEmail(email, password);

  await createCustomerUser({
    uid: credential.user.uid,
    email,
    displayName,
    role: "customer",
  });

  return credential.user;
};