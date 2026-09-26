import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import ItemListContainer from "./components/products/ItemListContainer";
import ItemDetailContainer from "./components/products/ItemDetailContainer";
import Contacto from "./components/layout/Contacto";
import Bienvenida from "./components/layout/Bienvenida";

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
          <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
