import LegalPage from "./legal/LegalPage";
import { legalPages } from "./legal/LegalData";

function PrivacyPolicy() {
  return <LegalPage page={legalPages.privacidad} />;
}

export default PrivacyPolicy;
