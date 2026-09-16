import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="flex min-h-96 flex-col items-center justify-center text-center">
      <p className="text-6xl font-bold text-amber-600">
        404
      </p>

      <h1 className="mt-4 text-2xl font-bold text-stone-900">
        Página no encontrada
      </h1>

      <p className="mt-2 text-stone-600">
        La página que estás buscando no existe.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-lg bg-amber-600 px-5 py-3 font-medium text-white hover:bg-amber-700"
      >
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFoundPage;