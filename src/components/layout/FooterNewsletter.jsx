import styles from "./Footer.module.css";

function FooterNewsletter({ newsletter }) {
  return (
    <div className={styles.footerSeccion}>
      <h4>{newsletter.titulo}</h4>

      <p>{newsletter.descripcion}</p>

      <button type="button">{newsletter.boton}</button>
    </div>
  );
}

export default FooterNewsletter;
