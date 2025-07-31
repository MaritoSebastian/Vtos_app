import React from "react";
import styles from "./Instructivo.module.css";
import { FaBoxes, FaCalendarAlt, FaClipboardList, FaWhatsapp, FaEdit, FaTrashAlt } from "react-icons/fa";

const Instructivo = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Instructivo de uso del sistema de vencimientos</h1>

      <div className={styles.seccion}>
        <FaBoxes className={styles.icono} />
        <div>
          <h2 className={styles.subtitulo}>Reposición en góndola</h2>
          <p>
            Colocar los productos con <strong>fecha más próxima al frente</strong> de la góndola, y los de fechas más lejanas al fondo.
          </p>
        </div>
      </div>

      <div className={styles.seccion}>
        <FaCalendarAlt className={styles.icono} />
        <div>
          <h2 className={styles.subtitulo}>Lectura de vencimientos</h2>
          <ul>
            <li>Se realiza el <strong>día 1 de cada mes</strong>.</li>
            <li>Hacer control <strong>todos los lunes</strong>.</li>
          </ul>
        </div>
      </div>

      <div className={styles.seccion}>
        <FaClipboardList className={styles.icono} />
        <div>
          <h2 className={styles.subtitulo}>Consulta de vencimientos</h2>
          <p>
            En la pestaña <strong>Listar Vtos.</strong> se pueden ver todos los vencimientos tomados.
          </p>
          <ul>
            <li><span className={styles.urgente}></span> Urgente (rojo)</li>
            <li><span className={styles.proximo}></span> Próximo a vencer (naranja)</li>
            <li><span className={styles.tranquilo}></span> Sin urgencia (verde)</li>
          </ul>
        </div>
      </div>

      <div className={styles.seccion}>
        <FaEdit className={styles.icono} />
        <div>
          <h2 className={styles.subtitulo}>Cómo trabajar con el listado de vencimientos</h2>
          <p>
            En la pestaña <strong>Listar Vtos.</strong> se pueden ver todos los vencimientos cargados por el usuario.
            En la última columna hay dos íconos:
          </p>
          <ul>
            <li><FaEdit className={styles.inlineIcon} /> Editar: para modificar un dato si fuera necesario.</li>
            <li><FaTrashAlt className={styles.inlineIcon} /> Eliminar: se puede usar cuando el producto ya se venció o se vendió todo.</li>
          </ul>
        </div>
      </div>

      <div className={styles.seccion}>
        <FaWhatsapp className={styles.icono} />
        <div>
          <h2 className={styles.subtitulo}>Envío por WhatsApp</h2>
          <p>
            En la pestaña de WhatsApp se pueden ver los vencimientos que tienen <strong>60 días</strong> y se pueden enviar al encargado.
          </p>
          <p>
            El número debe comenzar con <code className={styles.codigo}>549</code> y seguir sin espacios. <br />
            Ejemplo: <code className={styles.codigo}>5491122334455</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Instructivo;
