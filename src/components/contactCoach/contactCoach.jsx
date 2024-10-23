import styles from "./contactCoach.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";

export default function ContactCoach() {
  return (
    <section className={styles.contactCoach}>
        <section className={styles.leftSpace}>
          <div className={styles.title}>
            <h3>¿Necesitas ayuda?</h3>
            <p>Karina Durand</p>
          </div>
          <div className={styles.btnSpace}>
            <Link href="/contacto" className={styles.btnContact}>
              <FontAwesomeIcon
                icon={faWhatsapp}
                size="2x"
                className={styles.icon}
              />
            </Link>
            <Link href="/contacto" className={styles.btnContact}>
              <FontAwesomeIcon
                icon={faPaperPlane}
                size="2x"
                className={styles.icon}
              />
            </Link>
          </div>
        </section>
        <section className={styles.rightSpace}>
          <Image
            src="/images/coach-karina-perfil.png"
            alt="coach"
            fill={true}
          />
        </section>
      </section>
  );
}
