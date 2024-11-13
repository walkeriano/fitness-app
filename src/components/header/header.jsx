import React, { useState, useContext } from "react";
import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faBars,
  faXmark,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import useUserProfile from "@/state/hook/useUserProfile";
import AuthContext from "@/state/auth/auth-context";

export default function Header() {
  const [menu, setMenu] = useState(true);
  const { user } = useContext(AuthContext);
  const { userProfile } = useUserProfile(user);

  return (
    <header className={styles.header}>
      <Link
        href={user ? "/perfil-coach-fitness-app" : "/acceso-fitness-app"}
        className={styles.ancorPerfil}
      >
        {userProfile && userProfile.imageUrl ? (
          <Image
            src={userProfile?.imageUrl}
            alt="Imagen del usuario"
            className={styles.userImage}
            fill={true}
          />
        ) : (
          <>
            <FontAwesomeIcon
              icon={faCircleUser}
              size="2x"
              className={styles.icon}
            />
            <p>Acceder</p>
          </>
        )}
      </Link>

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
          <p>Menú</p>
        </section>
      ) : (
        <section className={styles.menuShow}>
          <section className={styles.headMenu}>
            <Image
              src="/images/icons/logo.svg"
              alt="logo-quesada"
              width={210}
              height={60}
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
              <Link href="/acceso-fitness-app">Iniciar sesión</Link>
              <span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="2x"
                  className={styles.icon}
                />
              </span>
            </li>
            <li>
              <Link href="/suscripcion-mensual">Suscribirme</Link>
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
