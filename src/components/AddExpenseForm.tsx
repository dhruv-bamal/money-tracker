import { useState } from "react";
import styles from "../styles/AddExpenseForm.module.css";

interface NewExpense {
  amount: number;
  merchant: string;
  date: string;
}

interface AddExpenseFormProps {
  onAdd: (transaction: NewExpense) => Promise<void>;
}

function AddExpenseForm({ onAdd }: AddExpenseFormProps) {
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    setError(null);

    if (!merchant.trim()) {
      setError("Merchant name is required.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    if (!date) {
      setError("Date is required.");
      return;
    }

    setSubmitting(true);
    try {
      await onAdd({
        amount: Number(amount),
        merchant: merchant.trim(),
        date,
      });
      setMerchant("");
      setAmount("");
      setDate("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add expense.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.field}>
        <label htmlFor="merchant" className={styles.label}>
          Merchant
        </label>
        <input
          id="merchant"
          type="text"
          value={merchant}
          onChange={(e) => setMerchant(e.target.value)}
          placeholder="e.g. Swiggy, Netflix"
          className={styles.input}
          disabled={submitting}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="amount" className={styles.label}>
          Amount (₹)
        </label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          min="0"
          className={styles.input}
          disabled={submitting}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="date" className={styles.label}>
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.input}
          disabled={submitting}
        />
      </div>

      <button type="submit" className={styles.submit} disabled={submitting}>
        {submitting ? "Adding..." : "Add Expense"}
      </button>
    </form>
  );
}

export default AddExpenseForm;
