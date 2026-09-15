interface PaymentFormProps {
  paymentMethod: string;
  onChange: (value: string) => void;
}

function PaymentForm({
  paymentMethod,
  onChange,
}: PaymentFormProps) {
  return (
    <fieldset>
      <legend>Método de pago</legend>

      <label>
        <input
          type="radio"
          value="credit"
          checked={paymentMethod === "credit"}
          onChange={(event) => onChange(event.target.value)}
        />
        Tarjeta de crédito
      </label>

      <label>
        <input
          type="radio"
          value="debit"
          checked={paymentMethod === "debit"}
          onChange={(event) => onChange(event.target.value)}
        />
        Tarjeta de débito
      </label>
    </fieldset>
  );
}

export default PaymentForm;