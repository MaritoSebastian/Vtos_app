//guarda el usuario
export const guardarUsuario = (usuario) => {
  localStorage.setItem("usuario", JSON.stringify(usuario));
};
//funcion para obtener el usuario
export const obtenerUsuario = () => {
  const usuario = localStorage.getItem("usuario");
  return usuario ? JSON.parse(usuario) : null;
};
// eliminar el usuario si se desloguea
export const borrarUsuario=()=> localStorage.removeItem("usuario");