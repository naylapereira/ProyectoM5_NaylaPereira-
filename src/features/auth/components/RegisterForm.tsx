import type { FormEvent } from "react";

interface RegisterFormProps {
  displayName: string;
  email: string;
  password: string;
  loading: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
}

function RegisterForm({
  displayName,
  email,
  password,
  loading,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-sm font-medium text-stone-700">
          Nombre
        </span>
        <input
          value={displayName}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Tu nombre"
          required
          minLength={2}
          autoComplete="name"
          className="w-full rounded-xl border border-amber-200 px-4 py-3 outline-none focus:border-amber-500"
        />
      </label>

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
          placeholder="Mínimo 6 caracteres"
          required
          minLength={6}
          autoComplete="new-password"
          className="w-full rounded-xl border border-amber-200 px-4 py-3 outline-none focus:border-amber-500"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer rounded-lg bg-amber-600 px-4 py-3 font-medium text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-stone-300"
      >
        {loading ? "Creando cuenta..." : "Registrarse"}
      </button>
    </form>
  );
}

export default RegisterForm;