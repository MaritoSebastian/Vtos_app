const eliminarVtos = async (codigo_barras) => {
  try {
    const response = await fetch("http://localhost:3001/api/eliminar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destino: "eliminar",
        codigo_barras,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error eliminando VTO:", error);
    return { success: false, message: "Error de conexión" };
  } 
};

export default eliminarVtos;
