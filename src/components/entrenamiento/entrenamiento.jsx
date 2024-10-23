import styles from "./entrenamiento.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faHeartPulse,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Entrenamiento() {
  return (
    <section className={styles.containerEntrenamiento}>
      <section className={styles.leftContainer}>
        <h3>Plan de entrenamiento</h3>
        <div className={styles.detalle}>
          <p>Rutina personalizada</p>
          <FontAwesomeIcon
            icon={faChevronDown}
            size="2x"
            className={styles.icon}
          />
        </div>
      </section>
      <section className={styles.rightContainer}>
        <section className={styles.infoTrainer}>
          <div className={styles.datosFisicos}>
            <span>
              <FontAwesomeIcon
                icon={faHeartPulse}
                size="2x"
                className={styles.icon}
              />
            </span>
            <h4>Masa muscular</h4>
            <p>Objetivo físico</p>
          </div>
          <div className={styles.datosFisicos}>
            <span>
              <FontAwesomeIcon
                icon={faHeartPulse}
                size="2x"
                className={styles.icon}
              />
            </span>
            <h4>Fuerza</h4>
            <p>Principal</p>
          </div>
          <div className={styles.datosFisicos}>
            <span>
              <FontAwesomeIcon
                icon={faHeartPulse}
                size="2x"
                className={styles.icon}
              />
            </span>
            <h4>Cardio</h4>
            <p>Secundario</p>
          </div>
          <div className={styles.datosFisicos}>
            <span>
              <FontAwesomeIcon
                icon={faHeartPulse}
                size="2x"
                className={styles.icon}
              />
            </span>
            <h4>Masculino</h4>
            <p>Genero</p>
          </div>
        </section>
        <section className={styles.imgContainer}>
          <Link href="/ejercicios" className={styles.btnRutina}>
            <FontAwesomeIcon
              icon={faArrowRight}
              size="2x"
              className={styles.icon}
            />
            Ver rutina
          </Link>
          <div className={styles.containerImg}>
            <span></span>
            <Image src="/images/hologram.svg" alt="hello" fill={true} />
          </div>
        </section>
        <div className={styles.grilla}>
          <Image src="/images/grilla.svg" alt="hello" fill={true} />
        </div>
      </section>
    </section>
  );
}
