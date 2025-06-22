import * as yup from "yup";

export const registerSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("el nombre es requerido")
    .max(30, "maximo 30 caracteres"),
  dni: yup
    .string()
    .required("el deni es requerido")
    .min(7, "el dni debe tener como minino 7 digitos ")
    .max(10, "el dni debe tener como maximo 10 caracteres"),
  telefono: yup
    .string()
    .required("el telefono e requerido")
    .min(7, "el dni debe tener como minino 7 digitos ")
    .max(10, "el dni debe tener como maximo 10 caracteres"),
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
