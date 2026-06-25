import { useState } from "react";
import type { Transaction, Category } from "./types";
import Header from "./components/Header";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";
import initialData from "./lib/data";
import { categorize } from "./lib/logic";

type FilterCategory = Category | "All";

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialData);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");

  const filteredTransactions =
    activeCategory === "All"
      ? transactions
      : transactions.filter((tx) => categorize(tx) === activeCategory);

  function deleteExpense(id: number): void {
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  return (
    <div>
      <Header />
      <Summary transactions={transactions} />
      <div>
        {(
          ["All", "Food", "Transport", "Subscriptions"] as FilterCategory[]
        ).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              fontWeight: activeCategory === cat ? "bold" : "normal",
              textDecoration: activeCategory === cat ? "underline" : "none",
            }}
          >
            {cat}
          </button>
        ))}
      </div>
      <ExpenseList
        transactions={filteredTransactions}
        onDelete={deleteExpense}
      />
    </div>
  );
}

export default App;
