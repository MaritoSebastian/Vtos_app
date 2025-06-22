import useCargarVtos from "../../hoocks/useCargarVtos";
import { Formik, Form, Field, ErrorMessage } from "formik";
import vtoSchema from "./VtosSchema";
import styles from "./form.module.css";
import Swal from "sweetalert2";
import BarcodeScanner from "react-qr-barcode-scanner";

const FormVtos = () => {
  const { enviar, loading, error, success } = useCargarVtos();
  console.log("form renderizado")

  return (
    <Formik
      initialValues={{
        codigo_Barras: "",
        producto: "",
        fecha_vto: "",
        cadena: "",
        telefono: "",
        repo: "",
        observaciones: "",
      }}
      validationSchema={vtoSchema}
      onSubmit={async (values, { resetForm }) => {
        const result = await enviar(values,"vtos");
        if (result) resetForm();
        Swal.fire("¡Éxito!", "Datos enviados correctamente", "success");
      }}
    >
      {({ setFieldValue }) => (
        <Form className={styles.formulario}>
          <div className={styles.form_header}>
            <FaBeer className={styles.beerIcon} />
            <h2>formulario de carga</h2>
            <FaBeer className={styles.beerIcon} />
          </div>

          {/* scanner de codigo de barras */}
          <div className={styles.BarcodeScanner}>
            <BarcodeScanner
              onUpdate={(err, result) => {
                if (result) {
                  const codigo = result.text;
                  setFieldValue("codigo_Barras", codigo);
                }
              }}
              width={400}
              height={300}
            />
          </div>
          {/*campo que se completa automaticamente*/}
          <div className={styles.form_group}>
            <label> codigo de barras:</label>
            <Field type="text" name="codigo_Barras" className={styles.input} />
            <ErrorMessage
              name="codigo_Barras"
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
            <label>Telefono</label>
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

          {error && <div className="error">❌ {error}</div>}
          {success && (
            <div className="success">✅ Datos enviados correctamente</div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default FormVtos;
