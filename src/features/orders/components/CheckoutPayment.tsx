import PaymentForm from "./PaymentForm";

interface CheckoutPaymentProps {
  paymentMethod: string;
  loading: boolean;
  error: string;
  onPaymentChange: (value: string) => void;
  onConfirm: () => void;
}

function CheckoutPayment({
  paymentMethod,
  loading,
  error,
  onPaymentChange,
  onConfirm,
}: CheckoutPaymentProps) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-white p-5">
      <PaymentForm
        paymentMethod={paymentMethod}
        onChange={onPaymentChange}
      />

      {!paymentMethod && (
        <p className="mt-3 text-sm text-stone-500">
          Elegí un método de pago para continuar.
        </p>
      )}

      <button
        type="button"
        onClick={onConfirm}
        disabled={loading || !paymentMethod}
        className="mt-5 w-full cursor-pointer rounded-lg bg-amber-600 px-4 py-3 font-medium text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:bg-stone-300"
      >
        {loading ? "Procesando..." : "Confirmar compra"}
      </button>

      {error && (
        <p className="mt-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default CheckoutPayment;