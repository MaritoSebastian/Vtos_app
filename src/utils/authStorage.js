//guarda el usuario
export const guardarUsuario = (usuario) => {
  if (usuario && typeof usuario==="object") {
    console.log("📥 setItem en localStorage:", usuario); 
    localStorage.setItem("usuario", JSON.stringify(usuario));
  } else {
     localStorage.removeItem("usuario");
    
  }

};
//funcion para obtener el usuario
export const obtenerUsuario = () => {
  
  const usuario = localStorage.getItem("usuario");
  try {
     return usuario ? JSON.parse(usuario) : null;
    
  } catch (error) {
      console.error("Error al parsear usuario:", error);
    localStorage.removeItem("usuario"); // Limpiar si está mal
    return null;
    
  }

};
// eliminar el usuario si se desloguea
export const borrarUsuario=()=> {
  console.log("borar usuario fue llamado")
  localStorage.removeItem("usuario")};