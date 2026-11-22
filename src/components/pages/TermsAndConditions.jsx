import LegalPage from "./legal/LegalPage";
import { legalPages } from "./legal/LegalData";

function TermsAndConditions() {
  return <LegalPage page={legalPages.terminos} />;
}

export default TermsAndConditions;
