const parseFecha = (fechaStr) => {
  if (!fechaStr || typeof fechaStr !== "string") return null;

  // Detectar si la fecha está en formato "DD/MM/YYYY" o parecido
  const partes = fechaStr.split("/");
  if (partes.length === 3) {
    const [dia, mes, anio] = partes;
    if (
      dia.length > 0 &&
      mes.length > 0 &&
      anio.length >= 4 &&
      !isNaN(dia) &&
      !isNaN(mes) &&
      !isNaN(anio)
    ) {
      const fechaISO = `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
      const fecha = new Date(fechaISO);
      return isNaN(fecha.getTime()) ? null : fecha;
    }
  }

  // Si no tiene barras o no cumple, probar con new Date directo
  const fecha = new Date(fechaStr);
  return isNaN(fecha.getTime()) ? null : fecha;
};

export default parseFecha;
