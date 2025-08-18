import { useState } from "react";
import useCargarVtos from "../../hoocks/useCargarVtos";
import { Formik, Form, Field, ErrorMessage } from "formik";
import vtoSchema from "./VtosSchema";
import styles from "./form.module.css";
import Swal from "sweetalert2";
import BarcodeScanner from "react-qr-barcode-scanner";
import { FaBeer } from "react-icons/fa";

const FormVtos = () => {
  const [mostrarScanner, setMostrarScaner] = useState(false);
  const { enviar, loading, error, success } = useCargarVtos();

  return (
    <Formik
      initialValues={{
        codigo_barras: "",
        producto: "",
        fecha_vto: "",
        cadena: "",
        telefono: "",
        repo: "",
        observaciones: "",
      }}
      validationSchema={vtoSchema}
      onSubmit={async (values, { resetForm }) => {
        const result = await enviar(values, "vtos");
        if (result.ok) {
          resetForm();
          Swal.fire("¡Éxito!", "Datos enviados correctamente", "success");
        } else {
          Swal.fire("Error", result.error, "error");
        }
      }}
    >
      {({ setFieldValue }) => (
        <Form className={styles.formulario}>
          <div className={styles.form_header}>
            <FaBeer className={styles.beerIcon} />
            <h2>Formulario de carga</h2>
            <FaBeer className={styles.beerIcon} />
          </div>

          <p className={styles.scannerHelpText}>
            ✳️ Si el escáner falla, podés ingresar el código manualmente.
          </p>

          <div className={styles.scannerContainer}>
            <button
              type="button"
              onClick={() => setMostrarScaner(!mostrarScanner)}
              className={styles.scannerToggleBtn}
            >
              {mostrarScanner
                ? "✖ Cerrar escáner"
                : "📷 Escanear código de barras"}
            </button>
            {mostrarScanner && (
  <div className="scannerModal">
    <button
      className="scannerCloseBtn"
      onClick={() => setMostrarScaner(false)}
    >
      ✖ Cerrar
    </button>
    <BarcodeScanner
  onUpdate={(err, result) => {
    if (result) {
      const codigo = result.text;
      setFieldValue("codigo_barras", codigo);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `Código escaneado: ${codigo}`,
        showConfirmButton: false,
        timer: 2000,
        background: "#002c5f",
        color: "gold",
      });
      setMostrarScaner(false);
    }
  }}
  style={{ width: "100%", height: "100%" }}
/>

  
  </div>
)}

          </div>

          <div className={`${styles.form_group} ${styles.codigo_barras}`}>
            <label>Código de barras:</label>
            <Field
              type="text"
              name="codigo_barras"
              className={styles.input}
              autoComplete="off"
            />
            <ErrorMessage
              name="codigo_barras"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.form_group}>
            <label>Producto</label>
            <Field name="producto" type="text" className={styles.input} />
            <ErrorMessage
              name="producto"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.form_group}>
            <label>Fecha de Vencimiento</label>
            <Field name="fecha_vto" type="date" className={styles.input} />
            <ErrorMessage
              name="fecha_vto"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.form_group}>
            <label>Cadena</label>
            <Field name="cadena" type="text" className={styles.input} />
            <ErrorMessage
              name="cadena"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.form_group}>
            <label>Teléfono</label>
            <Field name="telefono" type="text" className={styles.input} />
            <ErrorMessage
              name="telefono"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.form_group}>
            <label>Repositor</label>
            <Field name="repo" type="text" className={styles.input} />
            <ErrorMessage
              name="repo"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.form_group}>
            <label>Observaciones</label>
            <Field name="observaciones" type="text" className={styles.input} />
            <ErrorMessage
              name="observaciones"
              component="div"
              className={styles.error}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
          </button>

          {error && <div className={styles.error}>❌ {error}</div>}
          {success && (
            <div className={styles.success}>
              ✅ Datos enviados correctamente
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default FormVtos;
