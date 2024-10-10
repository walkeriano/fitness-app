import React, { useState, useContext } from "react";
import AuthContext from "@/state/auth/auth-context";
import styles from "./headerPerfil.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRightFromBracket,
  faBars,
  faXmark,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export default function HeaderPerfil() {
  const [menu, setMenu] = useState(true);

  const { user, logout } = useContext(AuthContext); // Obtener el usuario y la función logout desde el contexto
  const router = useRouter(); // Inicializar el hook useRouter

  const handleLogout = async () => {
    try {
      await logout(); // Intentar cerrar sesión
      console.log("Sesión cerrada exitosamente");
      router.push("/acceso-fitness-app"); // Redirigir al home después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className={styles.header}>
      <button onClick={handleLogout}>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          size="2x"
          className={styles.icon}
        />
      </button>
      <Link href="/">
        <Image
          src="/images/icons/logo.svg"
          alt="logo-quesada"
          width={200}
          height={60}
        />
      </Link>
      {menu ? (
        <section onClick={() => setMenu(false)} className={styles.menu}>
          <FontAwesomeIcon
            icon={faBars}
            size="2x"
            className={styles.iconLeft}
          />
        </section>
      ) : (
        <section className={styles.menuShow}>
          <section className={styles.headMenu}>
            <Image
              src="/images/icons/logo.svg"
              alt="logo-quesada"
              width={180}
              height={45}
            />
            <button onClick={() => setMenu(true)}>
              <FontAwesomeIcon
                icon={faXmark}
                size="2x"
                className={styles.icon}
              />
            </button>
          </section>
          <ul>
            <li>
              <Link href="/">Más detalles</Link>
              <span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="2x"
                  className={styles.icon}
                />
              </span>
            </li>
            <li>
              <Link href="/">Iniciar sesión</Link>
              <span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="2x"
                  className={styles.icon}
                />
              </span>
            </li>
            <li>
              <Link href="/">Suscribirme</Link>
              <span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="2x"
                  className={styles.icon}
                />
              </span>
            </li>
            <li>
              <Link href="/">Contacto</Link>
              <span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="2x"
                  className={styles.icon}
                />
              </span>
            </li>
          </ul>
        </section>
      )}
    </header>
  );
}
