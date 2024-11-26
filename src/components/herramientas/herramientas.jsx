import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "./herramientas.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faStore } from "@fortawesome/free-solid-svg-icons";

export default function Herramientas() {
  const pathname = usePathname(); 
  const activeItemRef = useRef(null);

  useEffect(() => {
    
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        block: "nearest", 
        inline: "nearest", 
      });
    }
  }, [pathname]);

  const getLinkClassName = (path) => {
    return pathname === path ? styles.activado : styles.desactivado;
  };

  return (
    <section className={styles.containerHerramientas}>
      <Link
        href="/administrador-usuarios"
        passHref
        ref={pathname === "/administrador-usuarios" ? activeItemRef : null}
        className={`${styles.itermTools} ${getLinkClassName(
          "/administrador-usuarios"
        )}`}
      >
        <FontAwesomeIcon
              icon={faCircleUser}
              size="2x"
              className={styles.icon}
            />
        <h3>Usuarios</h3>
      </Link>
      <Link
        href="/administrador-rutinas"
        passHref
        className={`${styles.itermTools} ${getLinkClassName(
          "/administrador-rutinas"
        )}`}
        ref={pathname === "/administrador-rutinas" ? activeItemRef : null}
      >
        <Image
          src="/images/icons/training.svg"
          alt="Entrenamiento"
          width={35}
          height={35}
        />
        <h3>Rutinas</h3>
      </Link>
      <Link
        href="/administrador-alimentacion"
        passHref
        className={`${styles.itermTools} ${getLinkClassName(
          "/administrador-alimentacion"
        )}`}
        ref={pathname === "/administrador-alimentacion" ? activeItemRef : null}
      >
        <Image
          src="/images/icons/food.svg"
          alt="Alimentación"
          width={30}
          height={35}
        />
        <h3>Alimentación</h3>
      </Link>
      <Link
        href="/administrador-infoproductos"
        passHref
        className={`${styles.itermTools} ${getLinkClassName(
          "/administrador-infoproductos"
        )}`}
        ref={pathname === "/administrador-infoproductos" ? activeItemRef : null}
      >
        <FontAwesomeIcon icon={faStore} size="2x" className={styles.iconTwo} />
        <h3>Infoproductos</h3>
      </Link>
    </section>
  );
}
