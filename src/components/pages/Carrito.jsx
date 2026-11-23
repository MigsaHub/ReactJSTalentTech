import { useCarrito } from "../context/CarritoContext";
import styles from "./Carrito.module.css";

const Carrito = () => {
  const {
    carrito,
    eliminarDelCarrito,
    incrementarCantidad,
    decrementarCantidad,
    vaciarCarrito,
    totalCarrito,
  } = useCarrito();

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
              <img className={styles.image} src={item.image} alt={item.title} />
            )}
            <div className={styles.itemInfo}>
              <h2 className={styles.itemTitle}>{item.title}</h2>
              <p className={styles.price}>
                Subtotal: ${(item.price * item.cantidad).toFixed(2)}
              </p>
            </div>

            <div className={styles.itemActions}>
              <div className={styles.quantityControls}>
                <button
                  onClick={() => decrementarCantidad(item.id)}
                  className={styles.quantityButton}
                  aria-label={`Disminuir cantidad de ${item.title}`}>
                  -
                </button>
                <span className={styles.quantity}>{item.cantidad}</span>
                <button
                  onClick={() => incrementarCantidad(item.id)}
                  className={styles.quantityButton}
                  aria-label={`Aumentar cantidad de ${item.title}`}>
                  +
                </button>
              </div>
              <button
                onClick={() => eliminarDelCarrito(item.id)}
                className={styles.removeButton}
                aria-label={`Eliminar ${item.title} del carrito`}>
                <svg
                  className={styles.trashIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true">
                  <path
                    d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Eliminar
              </button>
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
