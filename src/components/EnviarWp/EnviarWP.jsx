import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import styles from "./enviarWp.module.css";
import calcularDifDeDias from "../../utils/calcularDifDeDias";
import parseFecha from "../../utils/parseFecha";
import { FaWhatsapp } from "react-icons/fa";
import { useVtosContext } from "../../context/VtosContext";
import { obtenerUsuario } from "../../utils/authStorage";
import obtenerColorPorDias from "../../utils/obtenerColorPorDias";

const EnviarWP = () => {
  const { vtos, obtenerVtos } = useVtosContext();
  const [telefonoDestino, setTelefonoDestino] = useState("");

  useEffect(() => {
    const usuario = obtenerUsuario();
    if (usuario) {
      obtenerVtos({ telefono: usuario.telefono, rol: usuario.rol });
    }
  }, []);

  const vtosParaEnviar = vtos.filter((item) => {
    const fecha =parseFecha(item.fecha_vto);
    const dias = calcularDifDeDias(fecha)
    return dias != null && dias <= 60 && dias >= 0;
  });

  const MenWp = () => {
    let mensaje = "Lista de productos próximos a vencer:\n";
    vtosParaEnviar.forEach((item) => {
      const fecha=parseFecha(item.fecha_vto)
      const dias = calcularDifDeDias(fecha);
      
      mensaje += `-${item.codigo_Barras} ${item.producto} (vence en ${dias} días, fecha ${new Date(
        item.fecha_vto
      ).toLocaleDateString()})\n`;
    });
    return encodeURIComponent(mensaje);
  };

  const EnviarWatsapp = () => {
    if (!telefonoDestino) {
      Swal.fire({
        icon: "warning",
        title: "Número requerido",
        text: "Por favor, ingresa un número de WhatsApp destino.",
      });
      return;
    }

    if (vtosParaEnviar.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Sin productos",
        text: "No hay productos que venzan dentro de los próximos 60 días.",
      });
      return;
    }

    const mensaje = MenWp();
    const url = `https://wa.me/${telefonoDestino}?text=${mensaje}`;
    window.open(url, "_blank");
  };

  return (
    <div className={styles.formulrioWp}>
      <h3>Enviar listado por WhatsApp</h3>
      <input
        type="tel"
        placeholder="Número WhatsApp destino (con código país)"
        value={telefonoDestino}
        onChange={(e) => setTelefonoDestino(e.target.value)}
      />
      <button className={styles.boton} onClick={EnviarWatsapp}>
        <FaWhatsapp className={styles.icon} />
      </button>
      {vtosParaEnviar.length > 0 ? (
        <ul className={styles.lista}>
          {vtosParaEnviar.map((item, index) => {
            const fecha=parseFecha(item.fecha_vto)
            const dias=calcularDifDeDias(fecha);
            const color= obtenerColorPorDias(dias);

             return(
            <li key={index} className={`${styles.item} ${styles[color]}`}>
              <strong>{item.producto}</strong>- vence en {dias}
               dias (
              {fecha ? fecha.toLocaleDateString():"Fecha invalida"} )
            </li>)
          })}
        </ul>
      ) : (
        <p className={styles.mensajeVacio}>
          No hay productos por vencer en los próximos 60 días.
        </p>
      )}
    </div>
  );
};

export default EnviarWP;
