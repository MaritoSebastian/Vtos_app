import React, { useEffect, useState } from "react";
import fitrarYordenarVtos from "../../utils/fitrarYordenarVtos";
import calcularDifDeDias from "../../utils/calcularDifDeDias";
import obtenerColorPorDias from "../../utils/obtenerColorPorDias";
import { FaBeer, FaSearch, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import styles from "./vtos.module.css";
import UseVtos from "../../hoocks/UseVtos";
import { obtenerUsuario } from "../../utils/authStorage";
import Swal from "sweetalert2";
import EditarYFiltrarVtos from "../formEditar/EditarYFiltrarVtos";
import EnviarWP from "../EnviarWp/EnviarWP";

const ListarVtos = () => {
  const { vtos, loading, error, obtenerVtos, eliminarYactualizarVtos,editar } =
    UseVtos();
  const [Busqueda, setBusqueda] = useState("");
  const [editandoItem, setEditandoItem] = useState(null);
  const [valoresEditados, setValoresEditados] = useState({});
  const usuario = obtenerUsuario();
 
  useEffect(() => {
    //const usuario = obtenerUsuario();
    if (usuario) {
      obtenerVtos({ telefono: usuario.telefono, rol: usuario.rol });
    }
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar este producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      const res = await eliminarYactualizarVtos(id);
      if (res.success) {
        Swal.fire(
          "Eliminado",
          "El producto fue eliminado correctamente",
          "success"
        );
      } else {
        Swal.fire("Error", res.message || "No se pudo eliminar", "error");
      }
    }
  };
  const handleEdit = (item) => {
    setEditandoItem(item);
    setValoresEditados({
      producto: item.producto,
      fecha_vto: item.fecha_vto.slice(0, 10), //input tipo date
      observaciones: item.observaciones,
    });
  };
  const guardarCambios = async () => {
    const result = await Swal.fire({
      /* … */
    });
    if (!result.isConfirmed) return;

    // 1) Obtener de nuevo el usuario LOGUEADO

    if (!usuario) {
      Swal.fire("Error", "No se encontró usuario logueado", "error");
      return;
    }

    // 2) Llamar a la API de edición
    const vtosEditados={
      destino:"editar",
      codigo_barras:editandoItem.codigo_Barras,... valoresEditados


    }
    console.log("datos enviados para editar",vtosEditados)
    const res = await editar(vtosEditados);
    
  console.log("🔁 Resultado del backend:", res);

    if (res.success) {
      Swal.fire("Actualizado", "Los datos fueron editados", "success");
      // 3) Limpiar el estado de edición
      setEditandoItem(null);
      setValoresEditados({});

      // 4) Recargar usando el teléfono Y rol del usuario
      obtenerVtos({ telefono: usuario.telefono, rol: usuario.rol });
    } else {
      Swal.fire("Error", res.message || "No se pudo editar", "error");
    }
  };
  const cancelarEdicion = () => {
    setEditandoItem(null);
    setValoresEditados({});
  };

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  const vtosFiltrados = fitrarYordenarVtos(vtos).filter((item) =>
    item.producto.toLowerCase().includes(Busqueda.toLowerCase())
  );
  return (
    <div className={styles.contenedorTabla}>
      <h2 className={styles.titulo}>
        <FaBeer />
        Lista de vtos <FaBeer />
      </h2>
      {/*input busacador*/}
      <div className={styles.search}>
        <input
          className={styles.buscador}
          type="text"
          placeholder="Buscar Producto..."
          value={Busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Campo de busqueda de productos"
        />
        <button className={styles.ButtonSearch} aria-label="Buscador">
          <FaSearch />
        </button>
      </div>

      <table className={styles.tabla}>
        <thead>
          <tr>
            <th>codigo de Barras</th>
            <th>Producto</th>
            <th>Fecha de Vto</th>
            <th>Dias restantes</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vtosFiltrados.length === 0 ? (
            <tr>
              <td colSpan="6">No hay vtos cargados</td>
            </tr>
          ) : (
            vtosFiltrados.map((item) => {
              const dias = calcularDifDeDias(new Date(item.fecha_vto));
              const color = obtenerColorPorDias(dias);
               console.log("Producto:", item.producto, "Días:", dias, "Color:", color);
              if (
                editandoItem &&
                editandoItem.codigo_Barras === item.codigo_Barras
              )
                return (
                  
                  <EditarYFiltrarVtos
                    key={item.codigo_Barras}
                    item={item}
                    valoresEditados={valoresEditados}
                    setValoresEditados={setValoresEditados}
                    guardarCambios={guardarCambios}
                    cancelarEdicion={cancelarEdicion}
                  />
              
                );

              return (
                <tr key={item.codigo_Barras}>
                  <td className={styles[color]} data-label="codigo de barras">
                    {item.codigo_Barras}
                  </td>
                  <td className={styles[color]} data-label="producto">
                    {item.producto}
                  </td>
                  <td className={styles[color]} data-label="Fecha de Vto">
                    {new Date(item.fecha_vto).toLocaleDateString("es-AR")}
                  </td>
                  <td className={styles[color]} data-label="dias restantes">
                    {dias}
                  </td>
                  <td className={styles[color]} data-label="observaciones">
                    {item.observaciones}
                  </td>
                  <td className={styles.acciones}>
                    <button
                      onClick={() => handleEdit(item)}
                      className={styles.botonIcono}
                      aria-label="Editar"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(item.codigo_Barras)}
                      className={styles.botonIcono}
                      aria-label="Elliminar"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListarVtos;
