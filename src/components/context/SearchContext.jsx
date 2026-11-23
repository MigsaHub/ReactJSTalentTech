import { useContext, useState, createContext } from "react";

const SearchContext = createContext();

//custom hook para usar el contexto
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch debe ser usado dentro de un SearchProvider");
  }
  return context;
};

// provider para envolver la aplicación y proporcionar el contexto
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
