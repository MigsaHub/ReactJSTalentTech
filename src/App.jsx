import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import ItemListContainer from "./components/products/ItemListContainer";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<h1>Inicio</h1>} />
          <Route path="/contacto" element={<h1>Contacto</h1>} />
          <Route path="/productos" element={<ItemListContainer />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
