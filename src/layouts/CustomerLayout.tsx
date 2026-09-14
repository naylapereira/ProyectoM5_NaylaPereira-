import { Link, Outlet } from "react-router-dom";

function CustomerLayout() {
  return (
    <div>
      <header>
        <h1>Patagonix Store</h1>

        <nav>
          <Link to="/">Inicio</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default CustomerLayout;