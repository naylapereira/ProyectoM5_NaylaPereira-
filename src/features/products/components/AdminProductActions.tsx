interface AdminProductActionsProps {
  onCreate: () => void;
  onEdit: () => void;
}

function AdminProductActions({
  onCreate,
  onEdit,
}: AdminProductActionsProps) {
  const buttonClass =
    "rounded-2xl border border-stone-200 bg-white p-6 text-left shadow-sm transition hover:border-amber-400 hover:bg-amber-50";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <button
        type="button"
        onClick={onCreate}
        className={buttonClass}
      >
        <span className="block text-lg font-bold text-stone-900">
          + Crear producto
        </span>
        <span className="mt-1 block text-sm text-stone-600">
          Agregar un nuevo producto al catálogo.
        </span>
      </button>

      <button
        type="button"
        onClick={onEdit}
        className={buttonClass}
      >
        <span className="block text-lg font-bold text-stone-900">
          ✏️ Editar producto
        </span>
        <span className="mt-1 block text-sm text-stone-600">
          Buscar y modificar un producto existente.
        </span>
      </button>
    </div>
  );
}

export default AdminProductActions;