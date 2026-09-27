import styles from "./Footer.module.css";

function FooterTeam({ personas }) {
  return (
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
  );
}

export default FooterTeam;
