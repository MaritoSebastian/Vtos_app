

/*onst UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // null si no hay login

  const login = (usuarioData) => {
    setUsuario(usuarioData);
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => useContext(UsuarioContext);*/
/*import { createContext, useContext, useState, useEffect } from "react";

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null); // null si no está logueado

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = (usuarioData) => {
    setUsuario(usuarioData);
    localStorage.setItem("usuario", JSON.stringify(usuarioData));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <UsuarioContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => useContext(UsuarioContext);*/
import { createContext, useContext, useState, useEffect } from "react";
import { obtenerUsuario,guardarUsuario,borrarUsuario } from "../utils/authStorage"; // ruta correcta según tu estructura

const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = obtenerUsuario();
    if (usuarioGuardado) {
      setUsuario(usuarioGuardado);
    }
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
    <UsuarioContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export const useUsuario = () => useContext(UsuarioContext);

