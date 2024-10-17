import React, { useState } from "react";
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

export default function Header() {
  const [menu, setMenu] = useState(true);

  return (
    <header className={styles.header}>
      <Link href="/acceso-fitness-app">
        <FontAwesomeIcon
          icon={faCircleUser}
          size="2x"
          className={styles.icon}
        />
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
