import styles from "./Footer.module.css";

function FooterContact({ contacto }) {
  return (
    <div className={styles.footerSeccion}>
      <h4>Contacto</h4>

      <ul>
        <li>{contacto.email}</li>
        <li>{contacto.telefono}</li>
        <li>{contacto.direccion}</li>
      </ul>
    </div>
  );
}

export default FooterContact;
