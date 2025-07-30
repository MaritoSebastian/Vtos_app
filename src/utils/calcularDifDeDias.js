
const calcularDifDeDias = (fechaVtos) => {
  
  const hoy=new Date();
  hoy.setHours(0,0,0,0);
  const fecha=new Date(fechaVtos)
  fecha.setHours(0,0,0,0)
  if (isNaN(fecha.getTime())) {
    console.warn("fecha invalida",fechaVtos)
    return null
    
  }
  const diffTime=fecha-hoy;
  const diiffDays= Math.ceil(diffTime/(1000*60*60*24));
  return diiffDays
   
}

export default calcularDifDeDias