import styles from "./loading.module.css";
import Image from "next/image";

export default function Loading() {
  return (
    <div className={styles.contLoading}>
      <Image
        src="/images/icons/logo.svg"
        alt="logo-quesada"
        width={230}
        height={70}
        priority={true}
      />
      <div className={styles.loader}></div>
      <span className={styles.blur} ></span>
      <span className={styles.blurTwo} ></span>
    </div>
  );
}
