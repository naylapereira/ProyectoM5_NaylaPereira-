interface LoadingStateProps {
  message?: string;
}

function LoadingState({
  message = "Cargando...",
}: LoadingStateProps) {
  return (
    <div
      role="status"
      className="flex min-h-40 flex-col items-center justify-center gap-3"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />

      <p className="text-sm font-medium text-stone-600">
        {message}
      </p>
    </div>
  );
}

export default LoadingState;