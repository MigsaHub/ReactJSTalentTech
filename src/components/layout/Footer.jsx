import styles from "./Footer.module.css";

import FooterCompany from "./FooterCompany";
import FooterLegal from "./FooterLegal";
import FooterContact from "./FooterContact";
import FooterNewsletter from "./FooterNewsletter";
import FooterTeam from "./FooterTeam";

import {
  empresa,
  enlacesLegales,
  contacto,
  newsletter,
  personas,
  sucursales,
  anio,
} from "../../assets/data/footerData.js";

function Footer() {
  return (
    <div className={styles.pieDePosteo}>
      <footer className={styles.footer}>
        <div className={styles.footerContenido}>
          <FooterCompany empresa={empresa} />
          <FooterLegal enlaces={enlacesLegales} />
          <FooterContact contacto={contacto} />
          <FooterNewsletter newsletter={newsletter} />
        </div>

        <FooterTeam personas={personas} />

        <div className={styles.footerBottom}>
          <p>
            © {anio} {empresa.nombre}. Todos los derechos reservados.
          </p>
          <p>Sucursales: {sucursales.join(" · ")}</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
