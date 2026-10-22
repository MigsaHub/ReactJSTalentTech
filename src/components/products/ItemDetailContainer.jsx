import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./ItemDetailContainer.module.css";
import { useCarrito } from "../context/CarritoContext";
// Importaciones clave de Firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

function ItemDetailContainer() {
  const { id } = useParams();
  const { agregarAlCarrito } = useCarrito();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddToCart = () => {
    agregarAlCarrito({ producto: product, cantidad: 1 });
  };

  useEffect(() => {
    const productosDB = collection(db, "productos nacionales");
    getDocs(productosDB)
      .then((resp) => {
        const producto = resp.docs.find((doc) => doc.id === id);
        setProduct(producto ? { ...producto.data(), id: producto.id } : null);
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

          <button className={styles["add-to-cart"]} onClick={handleAddToCart}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;
