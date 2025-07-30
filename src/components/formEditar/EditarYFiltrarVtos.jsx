import { FaSave, FaTimes } from "react-icons/fa";
import calcularDifDeDias from "../../utils/calcularDifDeDias";
import obtenerColorPorDias from "../../utils/obtenerColorPorDias";
import styles from "./editarVtos.module.css";

const EditarYFiltrarVtos = ({
  item,
  valoresEditados,
  setValoresEditados,
  guardarCambios,
  cancelarEdicion,
}) => {
  const dias = calcularDifDeDias(new Date(valoresEditados.fecha_vto));
  const color = obtenerColorPorDias(dias);

  return (
    <tr>
      <td className={styles[color]}>{item.codigo_Barras}</td>

      <td className={styles[color]}>
        <input
          type="text"
          value={valoresEditados.producto}
          onChange={(e) =>
            setValoresEditados({ ...valoresEditados, producto: e.target.value })
          }
          aria-label="Editar producto"
          title="Producto"
        />
      </td>

      <td className={styles[color]}>
        <input
          type="date"
          value={valoresEditados.fecha_vto}
          onChange={(e) =>
            setValoresEditados({
              ...valoresEditados,
              fecha_vto: e.target.value,
            })
          }
          aria-label="Editar fecha de vencimiento"
          title="Fecha de vencimiento"
        />
      </td>

      <td className={styles[color]}>{dias}</td>

      <td className={styles[color]}>
        <input
          type="text"
          value={valoresEditados.observaciones}
          onChange={(e) =>
            setValoresEditados({
              ...valoresEditados,
              observaciones: e.target.value,
            })
          }
          aria-label="Editar observaciones"
          title="Observaciones"
        />
      </td>

      <td>
        <button
          type="button"
          onClick={guardarCambios}
          aria-label="Guardar cambios"
          title="Guardar"
        >
          <FaSave />
        </button>

        <button
          type="button"
          onClick={cancelarEdicion}
          aria-label="cancelar edicion"
          title="cancelar"
        >
          <FaTimes />
        </button>
      </td>
    </tr>
  );
};

export default EditarYFiltrarVtos;
