import { useState } from "react";
import { FormProduct } from "./FormProduct";
import { uploadProductImage } from "../../services/productService";
import styles from "./FormProductContainer.module.css";

const createInitialFormData = (product) => ({
  title: product?.title ?? "",
  description: product?.description ?? "",
  price: product?.price ?? "",
  stock: product?.stock ?? "",
  category: product?.category ?? "",
});

export const FormProductContainer = ({ product, onSave, onCancel }) => {
  //estado inicial del formulario
  const [datosForm, setDatosForm] = useState(() =>
    createInitialFormData(product),
  );
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isEditing = Boolean(product);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatosForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const price = Number(datosForm.price);
    const stock = Number(datosForm.stock);

    if (price <= 0) {
      setError("El precio debe ser mayor que cero.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setError("El stock debe ser un numero entero igual o mayor que cero.");
      return;
    }

    if (!image && !product?.image) {
      setError("Seleccioná una imagen para el producto.");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = image ? await uploadProductImage(image) : product.image;

      await onSave({
        ...datosForm,
        price,
        stock,
        image: imageUrl,
      });

      onCancel();
    } catch (saveError) {
      setError(saveError.message || "No se pudo guardar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.backdrop}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-form-title">
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle} id="product-form-title">
              {isEditing ? "Editar producto" : "Agregar producto"}
            </h2>
          </div>
          <button
            className={styles.closeButton}
            type="button"
            onClick={onCancel}
            disabled={loading}
            aria-label="Cerrar formulario">
            ×
          </button>
        </div>

        <FormProduct
          datosForm={datosForm}
          imagePreview={product?.image ?? ""}
          imageRequired={!product?.image}
          loading={loading}
          error={error}
          isEditing={isEditing}
          onCancel={onCancel}
          handleChange={handleChange}
          handleImageChange={(event) =>
            setImage(event.target.files?.[0] ?? null)
          }
          handleSubmit={handleSubmit}
        />
      </section>
    </div>
  );
};
