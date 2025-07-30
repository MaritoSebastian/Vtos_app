import getUserInfo from "./getUserInfo";

const fitrarYordenarVtos = (vtos) => {
  const { telefono, rol } = getUserInfo();
  const filtrarPorRol = (art) => {
    if (rol === "admin") return true;
    return String(art.telefono) === telefono;
  };
  const ordenarPorfecha = (a, b) => {
    
       // Si a no tiene fecha, va después
  if (!a.fecha_vto) return 1;
  // Si b no tiene fecha, a va antes
  if (!b.fecha_vto) return -1;
      
    
    return new Date(a.fecha_vto) - new Date(b.fecha_vto);
  };

  return vtos.filter(filtrarPorRol).sort(ordenarPorfecha);
};

export default fitrarYordenarVtos;
