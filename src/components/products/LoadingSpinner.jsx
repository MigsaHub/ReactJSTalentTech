import styles from "./LoadingSpinner.module.css";

function LoadingSpinner({ label }) {
  return (
    <div className={styles.loadingContainer} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.visuallyHidden}>{label}</span>
    </div>
  );
}

export default LoadingSpinner;
