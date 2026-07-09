import { useState } from "react";
import type { FormEvent } from "react";
import { apiFetch } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/AuthForm.module.css";

export function SignupForm({
  onSwitchToLogin,
}: {
  onSwitchToLogin: () => void;
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
      const data = await apiFetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      login(data.token, data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
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
        <h2 className={styles.heading}>Sign up</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.field}>
          <label htmlFor="signup-email" className={styles.label}>
            Email
          </label>
          <input
            id="signup-email"
            className={styles.input}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="signup-password" className={styles.label}>
            Password
          </label>
          <input
            id="signup-password"
            className={styles.input}
            type="password"
            placeholder="Min 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submit} disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </button>
        <p className={styles.switchRow}>
          Already have an account?{" "}
          <button
            type="button"
            className={styles.switchButton}
            onClick={onSwitchToLogin}
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
}
