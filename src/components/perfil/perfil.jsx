import styles from "./perfil.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function Perfil() {
  return (
    <section className={styles.perfilInfo}>
      <section className={styles.infoPerfil}>
        <div className={styles.namePerfil}>
          <h3>Hola,</h3>
          <h2>Carlos</h2>
          <h2>Quesada</h2>
        </div>
        <div className={styles.infoContact}>
          <p>carlos.quesada@gmil.com</p>
          <p>993 394 394</p>
        </div>
        <Link href="/" className={styles.btnEditar}>
          <FontAwesomeIcon icon={faGear} size="2x" className={styles.icon} />
          Editar perfil
        </Link>
      </section>
      <section className={styles.infoImg}>
        <Image src="/images/persons.png" alt="image-persons" fill={true} />
      </section>
    </section>
  );
}
