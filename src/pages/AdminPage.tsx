import { useAuth } from "../features/auth/hooks/useAuth";

function AdminPage() {
  const { user } = useAuth();

  return (
    <section>
      <h2>Panel de administración</h2>
      <p>Bienvenida, {user?.displayName}</p>
    </section>
  );
}

export default AdminPage;