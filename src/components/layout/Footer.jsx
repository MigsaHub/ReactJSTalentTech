import styles from "./Footer.module.css";

function Footer() {
  const personas = [
    {
      nombre: "Valentina Rojas",
      rol: "Directora de Operaciones",
      descripcion:
        "Supervisa la calidad y la experiencia del cliente en cada sede.",
      imagen: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      nombre: "Carlos Ruiz",
      rol: "Gerente Comercial",
      descripcion:
        "Impulsa alianzas estratégicas y el crecimiento de la marca en LATAM.",
      imagen: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      nombre: "Alberlys Moreno",
      rol: "Coordinadora de Atención",
      descripcion:
        "Asegura respuesta rápida y soporte personalizado para cada usuario.",
      imagen: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];
  return (
    <div className={styles.pieDePosteo}>
      <footer className={styles.footer}>
        <div className={styles.footerContenido}>
          <div className={styles.footerSeccion}>
            <h3>MigCorp</h3>

            <p>
              Somos una tienda especializada en productos gaming, tecnología y
              accesorios para gamers. Ofrecemos equipos y periféricos
              seleccionados para mejorar tu experiencia de juego, con calidad,
              innovación y excelente atención.
            </p>
          </div>

          <div className={styles.footerSeccion}>
            <h4>Información legal</h4>

            <ul>
              <li>Propiedad intelectual</li>
              <li>Políticas de privacidad</li>
              <li>Términos y condiciones</li>
              <li>Protección de datos</li>
            </ul>
          </div>

          <div className={styles.footerSeccion}>
            <h4>Contacto</h4>

            <ul>
              <li>ventas@migcorp.com</li>
              <li>+54 11 5555-2026</li>
              <li>Av. Corrientes 1234, CABA</li>
            </ul>
          </div>

          <div className={styles.footerSeccion}>
            <h4>Newsletter</h4>

            <p>Recibe novedades, promociones y recursos exclusivos.</p>

            <button type="button">Suscribirme</button>
          </div>
        </div>

        <div className={styles.footerEquipo}>
          <h3>Nuestro equipo</h3>

          <div className={styles.footerPersonas}>
            {personas.map((persona) => (
              <article key={persona.nombre} className={styles.footerPersona}>
                <img
                  src={persona.imagen}
                  alt={persona.nombre}
                  className={styles.footerAvatar}
                />

                <h4>{persona.nombre}</h4>

                <span>{persona.rol}</span>

                <p>{persona.descripcion}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2026 MigCorp. Todos los derechos reservados.</p>

          <p>
            Sucursales: Ciudad Autónoma de Buenos Aires · Mar del Plata ·
            Montevideo
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
