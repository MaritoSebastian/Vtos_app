import { useState } from "react";
//const ENDPOINT_VTOS = "http://localhost:3001/api/enviar";
 const URL_BASE=import.meta.env.VITE_DOMINO_RAILWAY

const useCargarVtos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const enviar = async (formData,destino) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await fetch(`${URL_BASE}/api/enviar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           ...formData,destino: destino,
        }
         
        ),
      });

      if (!response.ok) {
        throw new Error("Error al enviar los datos del VTO");
      }
      const result =await response.json();
      setSuccess(true);
      return { ok:true, data:result};
    } catch (err) {
      setError(err.message);
      return { ok: false, error: err.message }; 
    } finally {
      setLoading(false);
    }
  };

  return { enviar, loading, error, success };
};

export default useCargarVtos;
