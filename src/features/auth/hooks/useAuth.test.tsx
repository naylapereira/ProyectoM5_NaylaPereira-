import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  AuthContext,
  type AuthContextValue,
} from "../context/AuthContext";
import { useAuth } from "./useAuth";

const authValue: AuthContextValue = {
  user: {
    uid: "user-1",
    email: "test@example.com",
    displayName: "Nay",
    role: "customer",
  },
  loading: false,
  register: vi.fn(),
  login: vi.fn(),
  loginWithGoogle: vi.fn(),
  logout: vi.fn(),
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthContext.Provider value={authValue}>
    {children}
  </AuthContext.Provider>
);

describe("useAuth", () => {
  it("obtiene el usuario desde AuthContext", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toEqual(authValue.user);
    expect(result.current.loading).toBe(false);
  });
});