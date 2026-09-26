import styles from "./Bienvenida.module.css";

function Bienvenida() {
  return (
    <section className={styles.bienvenida}>
      <div className={styles.contenido}>
        <span className={styles.etiqueta}>GAMING STORE PRO</span>

        <h1>Bienvenido a MigCorp</h1>

        <p>
          Somos una tienda especializada en productos gaming, tecnología y
          accesorios para gamers. Ofrecemos equipos y periféricos seleccionados
          para mejorar tu experiencia de juego, con calidad, innovación y
          articulos de tecnología de última generación, con excelente atención.
        </p>

        <div className={styles.caracteristicas}>
          <div className={styles.caracteristica}>
            <span className={styles.icono}>🎮</span>
            <h3>Productos Gaming</h3>
            <p>Equipamiento y accesorios para mejorar tu experiencia.</p>
          </div>

          <div className={styles.caracteristica}>
            <span className={styles.icono}>⚡</span>
            <h3>Calidad e innovación</h3>
            <p>Tecnología seleccionada para gamers y entusiastas.</p>
          </div>

          <div className={styles.caracteristica}>
            <span className={styles.icono}>🛡️</span>
            <h3>Compra segura</h3>
            <p>Atención personalizada y confianza en cada compra.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Bienvenida;
