import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./ItemDetailContainer.module.css";
function ItemDetailContainer() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/data/productos.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los datos");
        }
        return res.json();
      })
      .then((datos) => {
        const producto = datos.find((item) => item.id === Number(id));

        setProduct(producto);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando detalle del producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Detalle de producto no encontrado.</p>;

  return (
    <div className={styles["product-detail"]}>
      <div className={styles["product-detail-card"]}>
        <div className={styles["product-image-container"]}>
          <img
            src={product.image}
            alt={product.title}
            className={styles["product-detail-image"]}
          />
        </div>

        <div className={styles["product-info"]}>
          <h1>{product.title}</h1>

          <p className={styles["product-description"]}>{product.description}</p>

          <p className={styles["product-price"]}>${product.price.toFixed(2)}</p>

          <p className={styles["product-stock"]}>
            {product.stock > 0
              ? `Stock disponible: ${product.stock}`
              : "Sin stock"}
          </p>

          <button className={styles["add-to-cart"]}>Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;
