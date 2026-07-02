import styles from "../styles/Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo} aria-hidden="true">
          ₹
        </span>
        <h1 className={styles.title}>Money Tracker</h1>
      </div>
      <p className={styles.tagline}>
        Your personal spending & subscription tracker
      </p>
    </header>
  );
}

export default Header;
