import styles from "./presentacion.module.css";

export default function Presentacion() {
  return (
    <section className={styles.containerPresentacion}>
      <div className={styles.imageAnimation}></div>
      <div className={styles.containerInfo}>
        <h3>Carlos Quesada y Karina Durand</h3>
        <h4>
          Con más de 15 años dedicados al fitness y al fisicoculturismo,{" "}
          <span>
            hemos ayudado a innumerables personas a alcanzar su mejor versión
          </span>
        </h4>
        <p>
          Nuestra trayectoria nos ha llevado a obtener reconocimientos
          internacionales, reflejando nuestro compromiso y pasión por este
          estilo de vida.
        </p>
      </div>
    </section>
  );
}
