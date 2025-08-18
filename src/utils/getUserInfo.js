import { obtenerUsuario } from "./authStorage";

const getUserInfo = () => {
  const usuario = obtenerUsuario();
  if (!usuario || typeof usuario !== "object") {
    console.log("❌ Usuario inválido:", usuario);
    return { telefono: "", rol: "" };
  }
  const { telefono, rol } = usuario;
  const datos = { telefono: String(telefono), rol };

  return datos;
};

export default getUserInfo;

