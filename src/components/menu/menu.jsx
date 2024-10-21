import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "./menu.module.css";
import Image from "next/image";
import Link from "next/link";
import useUserProfile from "@/state/hook/useUserProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function Menu() {
  const { userProfile } = useUserProfile();
  const pathname = usePathname(); // Obtenemos la ruta actual usando el hook moderno
  const activeItemRef = useRef(null); // Referencia para el ítem activo

  useEffect(() => {
    // Desplazar el ítem activo a la vista cuando cambia la ruta
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: "nearest", // Alinear el ítem si está parcialmente oculto
        inline: "nearest", // Centrar horizontalmente el ítem activo
      });
    }
  }, [pathname]); // Se ejecuta cada vez que cambia la ruta

  const getLinkClassName = (path) => {
    return pathname === path ? styles.activado : styles.desactivado;
  };

  return (
    <section className={styles.menuContainer}>
      <Link
        href="/perfil-coach-fitness-app"
        passHref
        className={`${styles.item} ${getLinkClassName(
          "/perfil-coach-fitness-app"
        )}`}
        ref={pathname === "/perfil-coach-fitness-app" ? activeItemRef : null} // Asignar la referencia al ítem activo
      >
        <div className={styles.boxImg}>
          {userProfile && userProfile.imageUrl ? (
            <img
              src={userProfile?.imageUrl}
              alt="Imagen del usuario"
              className={styles.userImage}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleUser}
              size="2x"
              className={styles.icon}
            />
          )}
        </div>
        <p>Mi perfil</p>
      </Link>
      <Link
        href="/entrenamiento-coach-fitness-app"
        passHref
        className={`${styles.itemTwo} ${getLinkClassName(
          "/entrenamiento-coach-fitness-app"
        )}`}
        ref={
          pathname === "/entrenamiento-coach-fitness-app" ? activeItemRef : null
        } // Asignar la referencia al ítem activo
      >
        <Image
          src="/images/icons/training.svg"
          alt="Entrenamiento"
          width={35}
          height={40}
        />
        <p>Entrenamiento</p>
      </Link>
      <Link
        href="/alimentacion-coach-fitness-app"
        passHref
        className={`${styles.itemTre} ${getLinkClassName(
          "/alimentacion-coach-fitness-app"
        )}`}
        ref={
          pathname === "/alimentacion-coach-fitness-app" ? activeItemRef : null
        } // Asignar la referencia al ítem activo
      >
        <Image
          src="/images/icons/food.svg"
          alt="Alimentación"
          width={30}
          height={30}
        />
        <p>Alimentación</p>
      </Link>
    </section>
  );
}
