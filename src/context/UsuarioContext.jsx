
import { createContext, useContext, useState, useEffect } from "react";
import { obtenerUsuario,guardarUsuario,borrarUsuario } from "../utils/authStorage"; // ruta correcta según tu estructura

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isLoading,setIsLoading]=useState(true)

  useEffect(() => {
    const usuarioGuardado = obtenerUsuario();
      console.log("📦 Usuario en localStorage al iniciar app:", localStorage.getItem("usuario"));
  console.log("🧾 Usuario parseado en Provider:", usuarioGuardado);
   
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
    setIsLoading(false)
  }, []);

  const login = (usuarioData) => {
    setUsuario(usuarioData);
    guardarUsuario(usuarioData);
  };

  const logout = () => {
    setUsuario(null);
    borrarUsuario();
  };

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout,isLoading }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => useContext(UsuarioContext);

