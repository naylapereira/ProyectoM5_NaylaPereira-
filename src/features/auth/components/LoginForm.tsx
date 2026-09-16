import type { FormEvent } from "react";

interface LoginFormProps {
  email: string;
  password: string;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}

function LoginForm({
  email,
  password,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-stone-700">
          Correo electrónico
        </span>
        <input
          type="email"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          placeholder="ejemplo@correo.com"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-amber-200 px-4 py-3 outline-none focus:border-amber-500"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-stone-700">
          Contraseña
        </span>
        <input
          type="password"
          value={password}
          onChange={(event) => onPasswordChange(event.target.value)}
          placeholder="Ingresá tu contraseña"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-amber-200 px-4 py-3 outline-none focus:border-amber-500"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer rounded-lg bg-amber-600 px-4 py-3 font-medium text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-stone-300"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}

export default LoginForm;