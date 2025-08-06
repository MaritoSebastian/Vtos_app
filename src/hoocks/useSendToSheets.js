import React from "react";

 const URL_BASE=import.meta.env.VITE_DOMINO_RAILWAY

const useSendToSheets = () => {
  const enviarDatos = async (datos, destino) => {
    try {
      const response = await fetch(`${URL_BASE}/api/enviar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...datos, destino }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error al enviar datos al backend:", error);
      return { success: false, error };
    }
  };

  return { enviarDatos };
};

export default useSendToSheets;
