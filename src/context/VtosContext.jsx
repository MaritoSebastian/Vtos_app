import { createContext, useContext } from "react";
import UseVtos from "../hoocks/UseVtos";

const VtosContext = createContext();

export const VtosProvider = ({ children }) => {
  const vtosHook = UseVtos(); 

  return (
    <VtosContext.Provider value={vtosHook}>
      {children}
    </VtosContext.Provider>
  );
};

// Hook para consumir el contexto desde cualquier componente
export const useVtosContext = () => useContext(VtosContext);
