import styles from "./Item.module.css";
import { Link } from "react-router-dom";
function Item({ id, image, title, price, currentPage }) {
  const pageQuery = currentPage > 1 ? `?page=${currentPage}` : "";

  return (
    <li className={styles.productCard}>
      <img className={styles.productImage} src={image} alt={title} />
      <div className={styles.productInfo}>
        <p className={styles.productTitle}>{title}</p>
        <p className={styles.productPrice}>Precio: ${price}</p>
        <Link to={`/products/${id}${pageQuery}`} className={styles.productLink}>
          Ver detalles
        </Link>
      </div>
    </li>
  );
}

export default Item;
