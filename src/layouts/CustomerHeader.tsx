import { Link } from "react-router-dom";
import type { AppUser } from "../types/user";
import CustomerNav from "../components/navigation/CustomerNav";

interface CustomerHeaderProps {
  user: AppUser | null;
  totalItems: number;
  showGreeting: boolean;
  onLogout: () => Promise<void>;
}

function CustomerHeader({
  user,
  totalItems,
  showGreeting,
  onLogout,
}: CustomerHeaderProps) {
  return (
    <header className="border-b border-amber-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold text-amber-700">
            Mundo Patitas 🐾
          </Link>

          <CustomerNav user={user} totalItems={totalItems} />

          <button
            type="button"
            onClick={() => void onLogout()}
            className="rounded-lg border border-amber-600 px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50"
          >
            Cerrar sesión
          </button>
        </div>

        {showGreeting && (
          <p className="mt-3 text-sm text-stone-600">
            ¡Qué lindo verte, {user?.displayName}! 🐾
          </p>
        )}
      </div>
    </header>
  );
}

export default CustomerHeader;