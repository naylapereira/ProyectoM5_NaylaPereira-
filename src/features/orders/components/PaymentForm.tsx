interface PaymentFormProps {
  paymentMethod: string;
  onChange: (value: string) => void;
}

function PaymentForm({
  paymentMethod,
  onChange,
}: PaymentFormProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-3 font-bold text-stone-900">
        Método de pago
      </legend>

      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-amber-200 p-4 hover:bg-amber-50">
        <input
          type="radio"
          value="credit"
          checked={paymentMethod === "credit"}
          onChange={(event) => onChange(event.target.value)}
          className="accent-amber-600"
        />
        <span className="font-medium text-stone-700">
          Tarjeta de crédito
        </span>
      </label>

      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-amber-200 p-4 hover:bg-amber-50">
        <input
          type="radio"
          value="debit"
          checked={paymentMethod === "debit"}
          onChange={(event) => onChange(event.target.value)}
          className="accent-amber-600"
        />
        <span className="font-medium text-stone-700">
          Tarjeta de débito
        </span>
      </label>
    </fieldset>
  );
}

export default PaymentForm;