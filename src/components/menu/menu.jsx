import styles from "./menu.module.css";
import Image from "next/image";

export default function Menu() {
  return (
    <section className={styles.menuContainer}>
      <section className={styles.item}>
        <div className={styles.boxImg}>
          <Image src="/images/persons.png" alt="imagen-usuario" fill={true} />
        </div>
        <p>Mi perfil</p>
      </section>
      <section className={styles.itemTwo}>
        <Image
          src="/images/icons/training.svg"
          alt="imagen-usuario"
          width={35}
          height={40}
        />
        <p>Entrenamiento</p>
      </section>
      <section className={styles.itemTre}>
        <Image
          src="/images/icons/food.svg"
          alt="imagen-usuario"
          width={30}
          height={30}
        />
        <p>Alimentación</p>
      </section>
    </section>
  );
}
