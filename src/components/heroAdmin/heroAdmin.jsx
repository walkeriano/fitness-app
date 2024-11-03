import styles from "./heroAdmin.module.css";
import Image from "next/image";

export default function HeroAdmin() {
  return (
    <section className={styles.containerInfo}>
      <h3>Bienvenido,</h3>
      <h2>Admin User</h2>
      <p>Panel de control</p>
      <div className={styles.containerBackground}>
      <Image
        src="/images/grilla.svg"
        
        alt="Logo"
        fill={true}
      />
      </div>
      
    </section>
  );
}
