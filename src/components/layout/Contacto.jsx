import styles from "./Contacto.module.css";

function Contacto() {
  return (
    <div className={styles.contacto}>
      <h1 className={styles.titulo}>Contáctanos</h1>

      <p className={styles.descripcion}>
        Estamos aquí para ayudarte. Envíanos tu mensaje y te responderemos lo
        antes posible.
      </p>

      <form className={styles.formulario}>
        <div className={styles.campo}>
          <label htmlFor="nombre">Nombre</label>

          <input id="nombre" type="text" placeholder="Tu nombre" />
        </div>

        <div className={styles.campo}>
          <label htmlFor="email">Correo electrónico</label>

          <input id="email" type="email" placeholder="tuemail@ejemplo.com" />
        </div>

        <div className={styles.campo}>
          <label htmlFor="mensaje">Mensaje</label>

          <textarea id="mensaje" rows="5" placeholder="Escribe tu mensaje..." />
        </div>

        <button type="submit" className={styles.boton}>
          Enviar mensaje
        </button>
      </form>
    </div>
  );
}

export default Contacto;
