

const obtenerColorPorDias = (dias) => {
    if (dias<=30) return  "rojo"
     if (dias>30 && dias<45) return "naranja"   
     if (dias>=60) return "verde"
     return "normal "    
    
};

export default obtenerColorPorDias