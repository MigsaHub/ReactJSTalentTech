import styles from "./ConfirmDialog.module.css";

function ConfirmDialog({ title, children, confirmLabel, onConfirm, onCancel, isLoading = false }) {
  return (
    <div className={styles.backdrop}>
      <section className={styles.dialog} role="alertdialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
        <h2 id="confirm-dialog-title">{title}</h2>
        <div className={styles.content}>{children}</div>
        <div className={styles.actions}>
          <button className={styles.cancelButton} type="button" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </button>
          <button className={styles.confirmButton} type="button" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Procesando…" : confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ConfirmDialog;
