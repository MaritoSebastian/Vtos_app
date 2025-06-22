import React from "react";
import styles from "./footer.module.css";
import { FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <a
          href="https://www.linkedin.com/in/mario-sebastian-chavez-6a9271333"
          target="_blank"
          className={styles.footerLink}
          rel="noopener noreferrer"
        >
          <FaLinkedin className={styles.footerIcon} />
        </a>
        <a
          href="https://wa.me/5492634713962"
          target="_blank"
          className={styles.footerLink}
          rel="noopener noreferrer"
        >
          <FaWhatsapp className={styles.footerIcon} />
        </a>
        <a
          href="https://github.com/MaritoSebastian"
          target="_blank"
          className={styles.footerLink}
          rel="noopener noreferrer"
        >
          <FaGithub className={styles.footerIcon} />
        </a>

        <div className={styles.divLogos}>
          <div className={styles.divImg}>
            <img src="/img/logo_pepsi.png" alt="logo pepsi" />
          </div>
          <div className={styles.divImg}>
            <img src="/img/logo_quilmes.jpg" alt="logo quilmes" />
          </div>
           <div className={styles.divImg}>
            <img src="/img/logo_panella_blanco.jpg" alt="logo panella" />
          </div>
          

        </div>

        
      </div>
      <p className={styles.footerText}>
          © 2025 Vtos App - Todos los derechos reservados
        </p>
    </footer>
  );
};

export default Footer;
