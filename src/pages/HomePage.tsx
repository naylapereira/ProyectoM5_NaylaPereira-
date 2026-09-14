import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <main>
      <h1>Inicio</h1>

      {user ? (
        <>
          <p>Hola, {user.displayName}</p>
          <p>Rol: {user.role}</p>

          <button type="button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <button type="button" onClick={() => navigate("/login")}>
          Iniciar sesión
        </button>
      )}
    </main>
  );
}

export default HomePage;