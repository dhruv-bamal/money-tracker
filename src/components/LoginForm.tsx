import { useState } from "react";
import type { FormEvent } from "react";
import { apiFetch } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/AuthForm.module.css";

export function LoginForm({
  onSwitchToSignup,
}: {
  onSwitchToSignup: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      login(data.token, data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.brand}>
        <span className={styles.logo} aria-hidden="true">
          ₹
        </span>
        <span className={styles.title}>Money Tracker</span>
      </div>
      <form onSubmit={handleSubmit} className={styles.card}>
        <h2 className={styles.heading}>Log in</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.field}>
          <label htmlFor="login-email" className={styles.label}>
            Email
          </label>
          <input
            id="login-email"
            className={styles.input}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="login-password" className={styles.label}>
            Password
          </label>
          <input
            id="login-password"
            className={styles.input}
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
        <p className={styles.switchRow}>
          No account?{" "}
          <button
            type="button"
            className={styles.switchButton}
            onClick={onSwitchToSignup}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
}
