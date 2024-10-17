import styles from "./contador.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Contador() {
  return (
    <section className={styles.containerContador}>
      <section className={styles.totalInfo}>
        <div>
          <FontAwesomeIcon
            icon={faArrowRight}
            size="2x"
            className={styles.icon}
          />
          <h3>2455</h3>
          <p>Total kcal</p>
        </div>
        <div className={styles.boxImg}>
        <Image src="/images/icons/texture.svg" alt="textura" fill={true} />
        </div>
        
      </section>
      <section className={styles.extraInfo}>
        <section>
          <p>Detalles</p>
          <FontAwesomeIcon
            icon={faArrowRight}
            size="2x"
            className={styles.icon}
          />
        </section>
        <section>
          <div>prote</div>
          <div>carbo</div>
          <div>grasas</div>
        </section>
      </section>
    </section>
  );
}
