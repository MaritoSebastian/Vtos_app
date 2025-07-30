import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("El email es obligatorio")
    // Primero, verificamos que tenga al menos un "@"
    .matches(/@/, "El email debe contener una arroba (@)")
    // Luego, validamos un formato más completo (opcional, pero recomendable)
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "El email debe tener un formato válido (por ejemplo: usuario@dominio.com)"
    ),

  clave: yup
    .string()
    .required("La clave es obligatoria")
    .min(6, "La clave debe tener al menos 6 caracteres")
    .max(15, "Máximo 15 caracteres"),
});
