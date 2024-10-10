
import styles from "./sliderCasos.module.css";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function SliderCasos() {


  return (
    <section className={styles.sliderContainer}>
      <section className={styles.overflow}>
        <section className={styles.object}>
          <div className={styles.imageBox}>
            <span>
              <FontAwesomeIcon
                icon={faStar}
                size="2x"
                className={styles.icon}
              />
            </span>
            <div className={styles.contFirst}>
              <Image src="/images/example.png" alt="woman" fill={true} />
            </div>
            <div className={styles.contTwo}>
              <Image src="/images/example.png" alt="woman" fill={true} />
            </div>
          </div>
          <div className={styles.comment}>
            <div className={styles.textComment}>
              <h3>Sin Carlos y Karina no hubiera sido posible</h3>
            </div>
            <span>
              <p>Marta Gonzales</p>
              <div>
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
              </div>
            </span>
          </div>
        </section>
        <section className={styles.object}>
          <div className={styles.imageBox}>
            <span>
              <FontAwesomeIcon
                icon={faStar}
                size="2x"
                className={styles.icon}
              />
            </span>
            <div className={styles.contFirst}>
              <Image src="/images/example.png" alt="woman" fill={true} />
            </div>
            <div className={styles.contTwo}>
              <Image src="/images/example.png" alt="woman" fill={true} />
            </div>
          </div>
          <div className={styles.comment}>
            <div className={styles.textComment}>
              <h3>Sin Carlos y Karina no hubiera sido posible</h3>
            </div>
            <span>
              <p>Marta Gonzales</p>
              <div>
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
              </div>
            </span>
          </div>
        </section>
        <section className={styles.object}>
          <div className={styles.imageBox}>
            <span>
              <FontAwesomeIcon
                icon={faStar}
                size="2x"
                className={styles.icon}
              />
            </span>
            <div className={styles.contFirst}>
              <Image src="/images/example.png" alt="woman" fill={true} />
            </div>
            <div className={styles.contTwo}>
              <Image src="/images/example.png" alt="woman" fill={true} />
            </div>
          </div>
          <div className={styles.comment}>
            <div className={styles.textComment}>
              <h3>Sin Carlos y Karina no hubiera sido posible</h3>
            </div>
            <span>
              <p>Marta Gonzales</p>
              <div>
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
              </div>
            </span>
          </div>
        </section>
      </section>
      <Link href="/" className={styles.btnSuscripcion}>
        suscribirme ahora
        <span>
          <FontAwesomeIcon
            icon={faArrowRight}
            size="2x"
            className={styles.icon}
          />
        </span>
      </Link>
      <div className={styles.blur}></div>
    </section>
  );
}
