import LegalPage from "./legal/LegalPage";
import { legalPages } from "./legal/LegalData";

function DataProtection() {
  return <LegalPage page={legalPages.proteccionDatos} />;
}

export default DataProtection;
