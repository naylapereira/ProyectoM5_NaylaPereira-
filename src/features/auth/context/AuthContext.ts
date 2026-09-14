import { createContext } from "react";
import type { AppUser } from "../../../types/user";

export interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  register: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);