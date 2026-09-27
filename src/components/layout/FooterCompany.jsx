import styles from "./Footer.module.css";

function FooterCompany({ empresa }) {
  return (
    <div className={styles.footerSeccion}>
      <h3>{empresa.nombre}</h3>
      <p>{empresa.descripcion}</p>
    </div>
  );
}

export default FooterCompany;
