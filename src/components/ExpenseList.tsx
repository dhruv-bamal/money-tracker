import type { Transaction } from "../types";
import ExpenseItem from "./ExpenseItem";

interface ExpenseListProps {
  transactions: Transaction[];
  onDelete: (id: number) => void;
}

function ExpenseList({ transactions, onDelete }: ExpenseListProps) {
  if (transactions.length === 0) {
    return (
      <div>
        <p>No expenses yet - add your first one.</p>
      </div>
    );
  }

  return (
    <div>
      {transactions.map((tx) => (
        <ExpenseItem key={tx.id} transaction={tx} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default ExpenseList;
