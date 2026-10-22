import { useCarrito } from "../context/CarritoContext";
import styles from "./Carrito.module.css";

const Carrito = () => {
  const { carrito, vaciarCarrito, totalCarrito } = useCarrito();

  if (carrito.length === 0) {
    return (
      <section className={styles.cart}>
        <h1 className={styles.title}>Carrito de compras</h1>
        <p className={styles.empty}>El carrito está vacío.</p>
      </section>
    );
  }

  return (
    <section className={styles.cart}>
      <h1 className={styles.title}>Carrito de compras</h1>
      <div className={styles.items}>
        {carrito.map((item) => (
          <article className={styles.item} key={item.id}>
            {item.image && (
              <img
                className={styles.image}
                src={item.image}
                alt={item.title}
              />
            )}
            <div className={styles.itemInfo}>
              <h2 className={styles.itemTitle}>{item.title}</h2>
              <p className={styles.detail}>Cantidad: {item.cantidad}</p>
              <p className={styles.price}>Precio: ${item.price.toFixed(2)}</p>
            </div>
          </article>
        ))}
      </div>
      <div className={styles.summary}>
        <p className={styles.total}>Total: ${totalCarrito().toFixed(2)}</p>
        <button className={styles.clearButton} onClick={vaciarCarrito}>
          Vaciar Carrito
        </button>
      </div>
    </section>
  );
};

export default Carrito;
