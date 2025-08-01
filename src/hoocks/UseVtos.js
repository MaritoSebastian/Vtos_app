import { useState } from "react";
import eliminarVtos from "../utils/eliminarVtos";
import editarVtos from "../utils/editarVtos";

const ENDPOINT_VTOS = "http://localhost:3001/api/enviar";
const ENDPOINT_EDITAR = "http://localhost:3001/api/editar";

const UseVtos = () => {
  const [vtos, setVtos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const obtenerVtos = async ({ telefono, rol }) => {
    console.log("Llamando a obtenerVtos con:", telefono, rol);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(ENDPOINT_VTOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telefono, rol, destino: "listar" }),
      });
      const data = await response.json();
      console.log("datos recibido del back", data);
      setVtos(data.result.vtos || []);
    } catch (err) {
      setError("no se pudieron listar los vtos");
    } finally {
      setLoading(false);
    }
  };
  const eliminarYactualizarVtos = async (id) => {
    const res = await eliminarVtos(id);
    if (res.success) {
      setVtos((prev) =>
        prev.filter((item) => String(item.codigo_Barras) !== String(id))
      );
      setError(null);
    } else {
      setError(res.message || "Error al eliminar");
    }
    return res;
  };
  //fincion para hacer la llamada al back
  const actualizarVtosEnBackend = async (vtosActualizado) => {
    try {
      const response = await fetch(ENDPOINT_EDITAR, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(vtosActualizado),
      });
      const data = await response.json();
       console.log("✅ Respuesta backend en fetch:", data);
      return data;
    } catch (error) {
      console.error("❌ Error en fetch PUT backend:", error);
      return { success: false, message: "Error en el servidor" };
    }
  };
  // funciion para editar usando el util
  const editar = async (vtosActualizado) => {
    const res = await editarVtos(vtosActualizado, actualizarVtosEnBackend);
    if (res.success) {
      setVtos((prev) =>
        prev.map((item) =>
          String(
            item.codigo_Barras )=== String(vtosActualizado.codigo_Barras)
              ? { ...item, ...vtosActualizado }
              : item
          
        )
      );
    }
    return res;
  };

  return { vtos, loading, error, obtenerVtos, eliminarYactualizarVtos,editar };
};

export default UseVtos;
