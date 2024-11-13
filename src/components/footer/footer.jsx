import styles from "./footer.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.first}>
        <Image
          src="/images/icons/logo.svg"
          alt="logo"
          width={210}
          height={55}
        />
        <ul className={styles.list}>
          <a href="/" >993 744 958</a>
          <a href="/">contacto@gmail.com</a>
          <a href="/">quesadacoach.com</a>
        </ul>
      </section>
      <section className={styles.second}>
        <ul  className={styles.legal}>
          <li>Quesada Coach S.A.C</li>
          <li>Copyright 2024 - Lima, Perú</li>
          <li>Todos los derechos reservados</li>
        </ul>
        <div  className={styles.socialmedia}>
          <FontAwesomeIcon
            icon={faFacebook}
            size="2x"
            className={styles.icon}
          />
          <FontAwesomeIcon
            icon={faInstagram}
            size="2x"
            className={styles.icon}
          />
          <FontAwesomeIcon
            icon={faInstagram}
            size="2x"
            className={styles.icon}
          />
        </div>
      </section>
    </footer>
  );
}
