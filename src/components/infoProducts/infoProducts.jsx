import styles from "./infoProducts.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function InfoProducts() {
  return (
    <section className={styles.sectionGeneral}>
      <section className={styles.titleSection}>
        <FontAwesomeIcon icon={faStore} size="2x" className={styles.icon} />
        <h2>Tienda de Infoproductos</h2>
      </section>
      <section className={styles.sliderContainer}>
        <section className={styles.itemSlider}>
          <section className={styles.imgCard}>
            <Image
              src="/images/objetivo-3.jpg"
              alt="imagen-info-producto"
              fill={true}
            />
          </section>
          <section className={styles.infoCard}>
            <h3>Las mejores técnicas del press banca</h3>
            <p>Evoluciona tus pectorales en tiempo record</p>
            <h4>
              S/.120 <span>S/.180</span>
            </h4>
            <Link href="/" className={styles.btnCard}>
              Comprar
              <FontAwesomeIcon
                icon={faCartArrowDown}
                size="2x"
                className={styles.icon}
              />
            </Link>
          </section>
        </section>
        <section className={styles.itemSlider}>
          <section className={styles.imgCard}>
            <Image
              src="/images/objetivo-3.jpg"
              alt="imagen-info-producto"
              fill={true}
            />
          </section>
          <section className={styles.infoCard}>
            <h3>Las mejores técnicas del press banca</h3>
            <p>Evoluciona tus pectorales en tiempo record</p>
            <h4>
              S/.120 <span>S/.180</span>
            </h4>
            <Link href="/" className={styles.btnCard}>
              Comprar
              <FontAwesomeIcon
                icon={faCartArrowDown}
                size="2x"
                className={styles.icon}
              />
            </Link>
          </section>
        </section>
        <section className={styles.itemSlider}>
          <section className={styles.imgCard}>
            <Image
              src="/images/objetivo-3.jpg"
              alt="imagen-info-producto"
              fill={true}
            />
          </section>
          <section className={styles.infoCard}>
            <h3>Las mejores técnicas del press banca</h3>
            <p>Evoluciona tus pectorales en tiempo record</p>
            <h4>
              S/.120 <span>S/.180</span>
            </h4>
            <Link href="/" className={styles.btnCard}>
              Comprar
              <FontAwesomeIcon
                icon={faCartArrowDown}
                size="2x"
                className={styles.icon}
              />
            </Link>
          </section>
        </section>
      </section>
    </section>
  );
}
