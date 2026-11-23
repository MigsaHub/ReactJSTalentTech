import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CarritoProvider } from "./components/context/CarritoContext.jsx";
import { AuthProvider } from "./components/context/AuthContext.jsx";
import { SearchProvider } from "./components/context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
