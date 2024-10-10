import styles from "./presentacion.module.css";

export default function Presentacion() {
  return (
    <section className={styles.containerPresentacion}>
      <div className={styles.imageAnimation}></div>
      <div className={styles.containerInfo}>
        <h3>Carlos Quesada y Karina Durand</h3>
        <h4>Más de 7 años ayudando a las personas <span>a lograr su mejor versión</span></h4>
        <p>
          Toda nuestra vida dedicada al fitness y al fisicoculturismo logrando
          obtener grandes reconocimientos internacionales
        </p>
      </div>
    </section>
  );
}
