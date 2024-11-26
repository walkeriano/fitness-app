import React, { useEffect, useRef, useContext } from "react";
import { usePathname } from "next/navigation";
import styles from "./menu.module.css";
import Image from "next/image";
import Link from "next/link";
import useUserProfile from "@/state/hook/useUserProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "@/state/auth/auth-context";

export default function Menu() {
  const { user } = useContext(AuthContext);
  const { userProfile } = useUserProfile(user);
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
    <section className={styles.menuContainer}>
      <Link
        href="/perfil-coach-fitness-app"
        passHref
        className={`${styles.item} ${getLinkClassName(
          "/perfil-coach-fitness-app"
        )}`}
        ref={pathname === "/perfil-coach-fitness-app" ? activeItemRef : null} 
      >
        <div className={styles.boxImg}>
          {userProfile && userProfile.imageUrl ? (
            <Image
              src={userProfile?.imageUrl}
              alt="Imagen del usuario"
              className={styles.userImage}
              fill={true}
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
