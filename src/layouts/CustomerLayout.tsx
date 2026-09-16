import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useCart } from "../features/cart/hooks/useCart";
import CustomerHeader from "./CustomerHeader";

function CustomerLayout() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-amber-50 text-stone-800">
      <CustomerHeader
        user={user}
        totalItems={totalItems}
        showGreeting={location.pathname === "/"}
        onLogout={handleLogout}
      />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default CustomerLayout;