import React, { useState } from "react";
import {
  FaBeer,
  FaTimes,
  FaList,
  FaHome,
  FaUserAlt,
  FaPlusSquare,
  FaListAlt,
} from "react-icons/fa";
import styles from "./Navbar.module.css";

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
          <a href="/">Inicio</a>
        </li>
        <li onClick={toggleMenu}>
          <FaUserAlt className={styles.icon} />
          <a href="/nosotros">Instrucciones</a>
        </li>
        <li onClick={toggleMenu}>
          <FaPlusSquare className={styles.icon} />
          <a href="/Vtos">Cargar vtos </a>
        </li>
        <li onClick={toggleMenu}>
          <FaListAlt className={styles.icon} />
          <a href="/listar">Listar vtos </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
