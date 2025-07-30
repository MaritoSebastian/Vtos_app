import * as Yup from "yup";

const vtoSchema = Yup.object({
  codigo_barras: Yup.string()
    .required("El código de barras es obligatorio")
    .min(3, "El código es muy corto"),
  producto: Yup.string()
    .required("El nombre del producto es obligatorio")
    .min(2, "El nombre es muy corto"),
  fecha_vto: Yup.date()
    .required("La fecha de vencimiento es obligatoria")
    .test(
      "no-vto-hoy",
      "este articulo ya no debe estar en gondola",
      (value) => {
        if (!value) return false;
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // compara solo la fecha
        const fechaVto = new Date(value);
        fechaVto.setHours(0, 0, 0, 0);

        return fechaVto > hoy;
      }
    ),

  cadena: Yup.string()
    .required("La cadena es obligatoria")
    .min(2, "La cadena es muy corta"),
  telefono: Yup.string()
    .required("El teléfono es obligatorio")
    .matches(/^\d+$/, "El teléfono solo debe contener números")
    .min(8, "El teléfono es muy corto"),
  repo: Yup.string()
    .required("El repositor es obligatorio")
    .min(2, "El nombre del repositor es muy corto"),
  observaciones: Yup.string().notRequired(),
});

export default vtoSchema;
