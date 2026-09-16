import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../features/auth/components/LoginForm";
import { useAuth } from "../features/auth/hooks/useAuth";

function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);

    try {
      await loginWithGoogle();
      navigate("/");
    } catch {
      setError("No se pudo continuar con Google.");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-amber-50 px-4">
      <section className="w-full max-w-md rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-amber-700">
          Mundo Patitas 🐾
        </h1>

        <p className="mt-2 text-center text-stone-600">
          Iniciá sesión para continuar
        </p>

        <div className="mt-6">
          <LoginForm
            email={email}
            password={password}
            loading={loading}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
          />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="mt-3 w-full cursor-pointer rounded-lg border border-amber-300 px-4 py-3 font-medium text-stone-700 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continuar con Google
        </button>

        {error && (
          <p className="mt-4 text-center text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-stone-600">
          ¿No tenés cuenta?{" "}
          <Link
            to="/register"
            className="font-medium text-amber-700 hover:underline"
          >
            Registrarse
          </Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;