import React from "react";
import { useFormik } from "formik";
import { registerSchema } from "./validationSchema";
import Swal from "sweetalert2";
import styles from "./register.module.css";
import { FaUser } from "react-icons/fa";

import useSendToSheets from "../../hoocks/useSendToSheets";

const Register = () => {
  const { enviarDatos } = useSendToSheets();
  //dentro del submit:

  const formik = useFormik({
    initialValues: {
      nombre: "",
      dni: "",
      telefono: "",
      email: "",
      clave: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { resetForm }) => {
      const datos = {
        repo: values.nombre,
        telefono: values.telefono,
        dni: values.dni,
        email: values.email,
        clave: values.clave,
      };
      console.log("Datos a enviar:", datos);
      const result = await enviarDatos(datos,"usuarios");
      console.log("Resultado de la API:", result);

      if (result.success) {
        Swal.fire({
          title: "Registro exitoso",
          text: "Tu usuario fue registrado correctamente",
          icon: "success",
          confirmButtonText: "OK",
        });
        resetForm();
      } else {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al registrar el usuario",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form_container}>
      <div className={styles.form_header}>
        <FaUser className={styles.user_icon} />

        <h2>Formulario de registro</h2>
      </div>
      <div className={styles.form_group}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          className={
            formik.errors.nombre && formik.touched.nombre
              ? styles.input_error
              : ""
          }
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nombre && formik.errors.nombre && (
          <div className={styles.error}>{formik.errors.nombre}</div>
        )}
      </div>
      <div className={styles.form_group}>
        <label>Telefono</label>
        <input
          type="text"
          name="telefono"
          className={
            formik.errors.telefono && formik.touched.telefono
              ? styles.input_error
              : ""
          }
          value={formik.values.telefono}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.telefono && formik.errors.telefono && (
          <div className={styles.error}>{formik.errors.telefono}</div>
        )}
      </div>

      <div className={styles.form_group}>
        <label>DNI</label>
        <input
          type="text"
          name="dni"
          className={
            formik.errors.dni && formik.touched.dni ? styles.input_error : ""
          }
          value={formik.values.dni}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.dni && formik.errors.dni && (
          <div className={styles.error}>{formik.errors.dni}</div>
        )}
      </div>

      <div className={styles.form_group}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          className={
            formik.errors.email && formik.touched.email
              ? styles.input_error
              : ""
          }
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <div className={styles.error}>{formik.errors.email}</div>
        )}
      </div>
      <div className={styles.form_group}>
        <label>Clave</label>
        <input
          type="password"
          name="clave"
          value={formik.values.clave}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.clave && formik.errors.clave && (
          <div className={styles.error}>{formik.errors.clave}</div>
        )}
      </div>
      <button type="submit" className={styles.submit_btn}>
        Registrarse
      </button>
    </form>
  );
};

export default Register;
