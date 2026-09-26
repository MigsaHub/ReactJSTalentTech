import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import ItemListContainer from "./components/products/ItemListContainer";
import ItemDetailContainer from "./components/products/ItemDetailContainer";
import Contacto from "./components/layout/Contacto";
import Bienvenida from "./components/layout/Bienvenida";
import TermsAndConditions from "./components/legal/TermsAndConditions";
import DataProtection from "./components/legal/DataProtection";
import IntelectualProperty from "./components/legal/IntelectualProperty";
import PrivacyPolicy from "./components/legal/PrivacyPolicy";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/products" element={<ItemListContainer />} />
          <Route path="/products/:id" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<h1>Carrito</h1>} />
          <Route
            path="/legal/TermsAndConditions"
            element={<TermsAndConditions />}
          />
          <Route path="/legal/DataProtection" element={<DataProtection />} />
          <Route
            path="/legal/IntelectualProperty"
            element={<IntelectualProperty />}
          />
          <Route path="/legal/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
