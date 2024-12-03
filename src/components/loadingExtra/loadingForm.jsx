import styles from "./loadingExtra.module.css";
import Image from "next/image";

export default function LoadingForm() {
  return (
    <div className={styles.contLoading}>
      <Image
        src="/images/icons/logo.svg"
        alt="logo-quesada"
        width={230}
        height={70}
        priority={true}
      />
      <div className={styles.textLoading}>
        <p>Creando nuevo perfil...</p>
        <p>Registrando datos físicos...</p>
        <p>Registrando datos alimenticios...</p>
      </div>
      <div className={styles.loader}></div>
      <span className={styles.blur} ></span>
      <span className={styles.blurTwo} ></span>
    </div>
  );
}
