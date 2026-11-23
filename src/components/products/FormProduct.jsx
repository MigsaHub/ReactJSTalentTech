import styles from "./FormProduct.module.css";

export const FormProduct = ({
  datosForm,
  imagePreview,
  imageRequired,
  loading,
  error,
  isEditing,
  onCancel,
  handleChange,
  handleImageChange,
  handleSubmit,
}) => (
  <form className={styles.form} onSubmit={handleSubmit}>
    <div className={styles.fields}>
      <label className={styles.field} htmlFor="title">
        <span>Nombre</span>
        <input
          id="title"
          name="title"
          type="text"
          value={datosForm.title}
          onChange={handleChange}
          required
        />
      </label>

      <label
        className={`${styles.field} ${styles.fullWidth}`}
        htmlFor="description">
        <span>Descripción</span>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={datosForm.description}
          onChange={handleChange}
          required
        />
      </label>

      <label className={styles.field} htmlFor="price">
        <span>Precio</span>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={datosForm.price}
          onChange={handleChange}
          required
        />
      </label>

      <label className={styles.field} htmlFor="stock">
        <span>Stock</span>
        <input
          id="stock"
          name="stock"
          type="number"
          min="0"
          step="1"
          value={datosForm.stock}
          onChange={handleChange}
          required
        />
      </label>

      <label className={styles.field} htmlFor="category">
        <span>Categoría</span>
        <input
          id="category"
          name="category"
          type="text"
          value={datosForm.category}
          onChange={handleChange}
          required
        />
      </label>

      <div className={`${styles.field} ${styles.fullWidth}`}>
        <label htmlFor="image">
          Imagen {imageRequired ? "(obligatoria)" : "(opcional)"}
        </label>
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required={imageRequired}
        />
        {imagePreview && (
          <img
            className={styles.imagePreview}
            src={imagePreview}
            alt="Vista previa"
          />
        )}
      </div>
    </div>

    {error && (
      <p className={styles.error} role="alert">
        {error}
      </p>
    )}

    <div className={styles.actions}>
      <button
        className={styles.cancelButton}
        type="button"
        onClick={onCancel}
        disabled={loading}>
        Cancelar
      </button>
      <button className={styles.submitButton} type="submit" disabled={loading}>
        {loading
          ? "Guardando…"
          : isEditing
            ? "Guardar cambios"
            : "Guardar producto"}
      </button>
    </div>
  </form>
);
