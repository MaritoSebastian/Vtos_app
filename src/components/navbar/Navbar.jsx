import React, { useState } from "react";
import {
  FaBeer,
  FaTimes,
  FaList,
  FaHome,
  FaUserAlt,
  FaPlusSquare,
  FaListAlt,
  FaWhatsapp
} from "react-icons/fa";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom"; // <-- solo necesitas importar Link

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img
          src="/img/logo_quilmes.jpg"
          alt="logo quilmes"
          className={styles.logoImg}
        />
      </div>
      <div className={styles.centerTitle}>
        <FaBeer className={styles.beerIcon} />
        <h1> App VTOs</h1>
        <FaBeer className={styles.beerIcon} />
      </div>
      <div className={styles.menuicon} onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaList />}
      </div>

      <ul className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}>
        <li onClick={toggleMenu}>
          <FaHome className={styles.icon} />
          <Link to="/">Inicio</Link>
        </li>
        <li onClick={toggleMenu}>
          <FaUserAlt className={styles.icon} />
          <Link to="/Instrucciones">Instrucciones</Link>
        </li>
        <li onClick={toggleMenu}>
          <FaPlusSquare className={styles.icon} />
          <Link to="/Vtos">Cargar vtos</Link>
        </li>
        <li onClick={toggleMenu}>
          <FaListAlt className={styles.icon} />
          <Link to="/listaVtos">Listar vtos</Link>
        </li>
        <li onClick={toggleMenu}>
          <FaWhatsapp className={styles.icon} />
          <Link to="/watsapp">Enviar vtos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
