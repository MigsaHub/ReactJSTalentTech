import styles from "./LegalPage.module.css";

function LegalPage({ page }) {
  if (!page) {
    return <p>Información no disponible.</p>;
  }

  return (
    <section className={styles.legalPage}>
      <div className={styles.contenido}>
        <span className={styles.etiqueta}>GAMING STORE PRO</span>

        <h1>{page.title}</h1>

        <p className={styles.subtitulo}>{page.subtitle}</p>

        <div className={styles.metadata}>
          Última actualización: {page.updatedAt}
        </div>

        <div className={styles.secciones}>
          {page.sections.map((section, index) => (
            <article key={index} className={styles.seccion}>
              <h2>{section.title}</h2>

              {section.paragraphs?.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}

              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        <div className={styles.legalFooter}>
          <p>¿Tenés alguna consulta?</p>
          <a href="mailto:ventas@migcorp.com">
            Contactanos: ventas@migcorp.com
          </a>
        </div>
      </div>
    </section>
  );
}

export default LegalPage;
