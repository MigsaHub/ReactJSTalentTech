import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import ItemListContainer from "./components/products/ItemListContainer";
import ItemDetailContainer from "./components/products/ItemDetailContainer";
import Contacto from "./components/pages/Contacto";
import Bienvenida from "./components/layout/Bienvenida";
import TermsAndConditions from "./components/pages/TermsAndConditions";
import DataProtection from "./components/pages/DataProtection";
import IntelectualProperty from "./components/pages/IntelectualProperty";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import Carrito from "./components/pages/Carrito";
import Panel from "./components/pages/Panel";
import Categories from "./components/pages/Category";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import RutaProtegida from "./components/pages/RutaProtegida";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/products" element={<ItemListContainer />} />
          <Route path="/products/:id" element={<ItemDetailContainer />} />
          <Route path="/:categoryId" element={<Categories />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="/DataProtection" element={<DataProtection />} />
          <Route
            path="/IntelectualProperty"
            element={<IntelectualProperty />}
          />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/panel"
            element={
              <RutaProtegida rolesPermitidos={["admin"]}>
                <Panel />
              </RutaProtegida>
            }
          />
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
