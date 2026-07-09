import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { apiFetch } from "./lib/api";
import { detectRecurring } from "./lib/logic";
import { LoginForm } from "./components/LoginForm";
import { SignupForm } from "./components/SignUpForm";
import type { Transaction, Category, RecurringSubscription } from "./types";
import Header from "./components/Header";
import BudgetBar from "./components/BudgetBar";
import Summary from "./components/Summary";
import RecurringSection from "./components/RecurringSection";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import styles from "./styles/App.module.css";

type FilterCategory = Category | "All";

function App() {
  const { token, user, logout } = useAuth();
  const [authView, setAuthView] = useState<"login" | "signup">("login");

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");

  useEffect(() => {
    if (!token) return;

    async function loadTransactions() {
      setLoading(true);
      setError(null);
      try {
        const data = await apiFetch("/api/transactions", { token });
        setTransactions(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load transactions",
        );
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, [token]);

  if (!token) {
    return authView === "login" ? (
      <LoginForm onSwitchToSignup={() => setAuthView("signup")} />
    ) : (
      <SignupForm onSwitchToLogin={() => setAuthView("login")} />
    );
  }

  if (loading) {
    return <p>Loading your transactions...</p>;
  }

  async function addExpense(newTransaction: {
    amount: number;
    merchant: string;
    date: string;
  }): Promise<void> {
    setError(null);
    try {
      const created = await apiFetch("/api/transactions", {
        method: "POST",
        token,
        body: JSON.stringify(newTransaction),
      });
      setTransactions((prev) => [created, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add expense");
    }
  }

  async function deleteExpense(id: string): Promise<void> {
    setError(null);
    try {
      await apiFetch(`/api/transactions/${id}`, {
        method: "DELETE",
        token,
      });
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete expense");
    }
  }

  const filteredTransactions =
    activeCategory === "All"
      ? transactions
      : transactions.filter((tx) => tx.category === activeCategory);

  const recurring: RecurringSubscription[] = detectRecurring(transactions);
  const recurringMerchants = new Set<string>(recurring.map((r) => r.merchant));

  const filterButtons: FilterCategory[] = [
    "All",
    "Food",
    "Transport",
    "Subscriptions",
    "Bills",
  ];

  return (
    <div className={styles.app}>
      <Header />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Logged in as {user?.email}</p>
        <button onClick={logout}>Log out</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <BudgetBar transactions={transactions} />
      <div className={styles.gridSummary}>
        <Summary transactions={transactions} />
        <RecurringSection subscriptions={recurring} />
      </div>
      <div className={styles.gridExpenses}>
        <AddExpenseForm onAdd={addExpense} />
        <div className={styles.expensesColumn}>
          <div className={styles.filterBar}>
            {filterButtons.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={
                  activeCategory === cat
                    ? `${styles.filterButton} ${styles.filterButtonActive}`
                    : styles.filterButton
                }
              >
                {cat}
              </button>
            ))}
          </div>
          <ExpenseList
            transactions={filteredTransactions}
            onDelete={deleteExpense}
            recurringMerchants={recurringMerchants}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
