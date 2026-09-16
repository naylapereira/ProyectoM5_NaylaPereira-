import { render, screen, waitFor } from "@testing-library/react";
import { onAuthStateChanged } from "firebase/auth";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getUserById } from "../services/userService";
import AuthProvider from "./AuthProvider";
import { useAuth } from "../hooks/useAuth";

vi.mock("firebase/auth", () => ({
  onAuthStateChanged: vi.fn(),
}));

vi.mock("../../../services/firebase/firebaseConfig", () => ({
  auth: {},
}));

vi.mock("../services/userService", () => ({
  getUserById: vi.fn(),
}));

vi.mock("../services/authService", () => ({
  loginWithEmail: vi.fn(),
  logout: vi.fn(),
}));

vi.mock("../services/googleAuthService", () => ({
  authenticateWithGoogle: vi.fn(),
}));

vi.mock("../services/registerService", () => ({
  registerCustomer: vi.fn(),
}));

function TestConsumer() {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando</p>;

  return <p>{user?.displayName ?? "Sin usuario"}</p>;
}

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sincroniza un usuario autenticado con Firestore", async () => {
    vi.mocked(getUserById).mockResolvedValue({
      uid: "user-1",
      email: "test@example.com",
      displayName: "Nay",
      role: "customer",
    });

    vi.mocked(onAuthStateChanged).mockImplementation(
      (_auth, nextOrObserver) => {
       if (typeof nextOrObserver === "function") {
         nextOrObserver({ uid: "user-1" } as never);
        }

        return vi.fn();
      },
    );

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Nay")).toBeInTheDocument();
    });

    expect(getUserById).toHaveBeenCalledWith("user-1");
  });
});