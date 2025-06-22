import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { LoginSchema } from "./LoginSchema";
import Swal from "sweetalert2";
import styles from "./login.module.css";
import { FaUser } from "react-icons/fa";
import useVerificarUsuarios from "../../hoocks/useVerificarUsuarios";
import { guardarUsuario } from "../../utils/authStorage";
import { useUsuario } from "../../context/UsuarioContext";
import { Navigate } from "react-router-dom";



const Login = ({ onLoginSuccess }) => {
  const { verificar } = useVerificarUsuarios();
  const [loading, setLoading] = useState(false);
  const { login } = useUsuario();
  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      clave: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const datos = {
          email: values.email,
          clave: values.clave,
        };
        console.log("datos a envias ", datos);
        const result = await verificar(datos.email, datos.clave);
        console.log("resultado de la  api", result);
        if (result && result.habilitado) {
          console.log("ingreso exitoso");
          guardarUsuario(result);
        login(result);

          await Swal.fire({
            title: "ingreso exitoso",
            text: "bienvenido a Vtos_app",
            icon: "success",
            confirmButtonText: "ok",
          });
          resetForm();
          if (onLoginSuccess) onLoginSuccess();
          navigate("/",{replace:true})
          
        } else {
          await Swal.fire({
            title: "Error",
            text: "eror en la clave o el email",
            icon: "error",
            confirmButtonText: "intentar de nuevo",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error inesperado",
          icon: "error",
        });
        console.error("Error en login:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form_container}>
      <div className={styles.form_header}>
        <FaUser className={styles.user_icon} />
        <h2>Bienvenido</h2>
      </div>
      <div className={styles.form_group}>
        <label>Email</label>
        <input
          type="email"
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
        <label htmlFor="clave">Clave</label>
        <input
          id="clave"
          type="password"
          name="clave"
          className={
            formik.errors.clave && formik.touched.clave
              ? styles.input_error
              : ""
          }
          value={formik.values.clave}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.clave && formik.errors.clave && (
          <div className={styles.error}>{formik.errors.clave}</div>
        )}
      </div>

      <button type="submit" className={styles.submit_btn} disabled={loading}>
        {loading ? <ClipLoader color="#ffffff" size={20} /> : "ingresar"}
      </button>
      <p className={styles.register_prompt}>
        ¿No estás registrado?{" "}
        <a href="/Register" className={styles.register_link}>
          Registrate acá
        </a>
      </p>
    </form>
  );
};

export default Login;
