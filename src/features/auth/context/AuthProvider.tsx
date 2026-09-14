import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { auth } from "../../../services/firebase/firebaseConfig";
import type { AppUser } from "../../../types/user";
import { loginWithEmail, logout as firebaseLogout } from "../services/authService";
import { authenticateWithGoogle } from "../services/googleAuthService";
import { registerCustomer } from "../services/registerService";
import { getUserById } from "../services/userService";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const syncUser = async (uid: string) => {
    const appUser = await getUserById(uid);
    setUser(appUser);
  };

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          await syncUser(firebaseUser.uid);
        } else {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const register = async (email: string, password: string, name: string) => {
    const firebaseUser = await registerCustomer(email, password, name);
    await syncUser(firebaseUser.uid);
  };

  const login = async (email: string, password: string) => {
    const credential = await loginWithEmail(email, password);
    await syncUser(credential.user.uid);
  };

  const loginWithGoogle = async () => {
    const firebaseUser = await authenticateWithGoogle();
    await syncUser(firebaseUser.uid);
  };

  const logout = async () => {
    await firebaseLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;