
//const ENDPOINT_VERIFICAR = "http://localhost:3001/api/verificar-usuario";
const URL_BASE=import.meta.env.VITE_DOMINO_RAILWAY
const useVerificarUsuarios = () => {
     const verificar=async (email,clave)=>{
        try {

            const response=await fetch(`${URL_BASE}/api/verificar-usuario`,{
                method:"post",
                headers:{ "Content-Type":"application/json"},
                body:JSON.stringify({email,clave,destino: "verifica"}),


            });
            const result=await response.json()
            return result;
            
        } catch (error) {
            console.error("error al verificar el usuario",error);
            return { success:false,error}
            
        };
        



     };


  return {verificar};
  
}

export default useVerificarUsuarios
