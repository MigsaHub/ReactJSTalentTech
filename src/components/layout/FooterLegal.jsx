import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function FooterLegal({ enlaces }) {
  return (
    <div className={styles.footerSeccion}>
      <h4>Información legal</h4>

      <ul>
        {enlaces.map((enlace) => (
          <li key={enlace.ruta}>
            <Link to={enlace.ruta}>{enlace.nombre}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterLegal;
