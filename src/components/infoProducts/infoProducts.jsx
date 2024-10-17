import styles from "./infoProducts.module.css";
import Image from "next/image";




export default function InfoProducts() {
  return (
    <section className={styles.sectionGeneral}>
      <section className={styles.titleSection}>
        <h2>Info Productos</h2>
      </section>
      <section className={styles.sliderContainer}>
        <section className={styles.itemSlider}>
          <section className={styles.imgCard}>
            <Image src="/images/objetivo-3.jpg" alt="imagen-info-producto" fill={true} />
          </section>
          <section className={styles.infoCard}>
            <h3>Producto 1</h3>
            <p>Descripcion</p>
            <div></div>
            <button className={styles.btnCard}>Adquirir</button>
          </section>
        </section>
        <section className={styles.itemSlider}>
          <section className={styles.imgCard}>
            <Image src="" alt="imagen-info-producto" fill={true} />
          </section>
          <section className={styles.infoCard}>
            <h3>Producto 1</h3>
            <p>Precio: $100</p>
            <button className={styles.btnCard}>comprar</button>
          </section>
        </section>
        <section className={styles.itemSlider}>
          <section className={styles.imgCard}>
            <Image src="" alt="imagen-info-producto" fill={true} />
          </section>
          <section className={styles.infoCard}>
            <h3>Producto 1</h3>
            <p>Precio: $100</p>
            <button className={styles.btnCard}>comprar</button>
          </section>
        </section>
      </section>
    </section>
  );
}
