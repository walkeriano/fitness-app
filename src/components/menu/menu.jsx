import React from "react";
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

  const getLinkClassName = (path) => {
    return pathname === path ? styles.activado : styles.desactivado;
  };

  return (
    <section className={styles.menuContainer}>
      <Link
        href="/perfil-coach-fitness-app"
        className={`${styles.item} ${
          pathname === "/perfil-coach-fitness-app"
            ? styles.activado
            : styles.desactivado
        }`}
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
        className={`${styles.itemTwo} ${
          pathname === "/entrenamiento-coach-fitness-app"
            ? styles.activado
            : styles.desactivado
        }`}
      >
        <Image
          src="/images/icons/training.svg"
          alt="imagen-usuario"
          width={35}
          height={40}
        />
        <p>Entrenamiento</p>
      </Link>
      <Link
        className={`${styles.itemTre} ${
          pathname === "/alimentacion-coach-fitness-app"
            ? styles.activado
            : styles.desactivado
        }`}
        href="/alimentacion-coach-fitness-app"
      >
        <Image
          src="/images/icons/food.svg"
          alt="imagen-usuario"
          width={30}
          height={30}
        />
        <p>Alimentación</p>
      </Link>
    </section>
  );
}
