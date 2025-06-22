import React from "react";
/*const ENDPOIND =
  "https://script.google.com/macros/s/AKfycbzgJfnLRfNXZKRqKOZ-Ps0Mcs0MM8pZtO8aSfmPAtbffZR4RGo_L2xKq2qG8Tpfj43XzA/exec";

const useSendToSheets = () => {
  const enviarDatos = async (datos,destino) => {
    try {
      const response = await fetch(ENDPOIND, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...datos,destino }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error al enviar datos a Sheets:", error);
      return { success: false, error };
    }
  };

  return {enviarDatos};
};

export default useSendToSheets;*/


const ENDPOIND = "http://localhost:3001/api/enviar";

const useSendToSheets = () => {
  const enviarDatos = async (datos, destino) => {
    try {
      const response = await fetch(ENDPOIND, {
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
