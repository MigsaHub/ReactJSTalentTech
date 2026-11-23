import styles from "./FeedbackMessage.module.css";

function FeedbackMessage({ type = "success", children, onDismiss }) {
  return (
    <div className={`${styles.message} ${styles[type]}`} role={type === "error" ? "alert" : "status"}>
      <span>{children}</span>
      {onDismiss && (
        <button className={styles.dismissButton} type="button" onClick={onDismiss} aria-label="Cerrar mensaje">
          ×
        </button>
      )}
    </div>
  );
}

export default FeedbackMessage;
