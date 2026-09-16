import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../features/auth/components/RegisterForm";
import { useAuth } from "../features/auth/hooks/useAuth";

function RegisterPage() {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (displayName.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      await register(email, password, displayName.trim());
      navigate("/");
    } catch {
      setError("No se pudo crear la cuenta.");
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
          Creá tu cuenta
        </p>

        <div className="mt-6">
          <RegisterForm
            displayName={displayName}
            email={email}
            password={password}
            loading={loading}
            onNameChange={setDisplayName}
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
          ¿Ya tenés cuenta?{" "}
          <Link
            to="/login"
            className="font-medium text-amber-700 hover:underline"
          >
            Iniciar sesión
          </Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;