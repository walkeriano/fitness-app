"use client";
import React, { useState, useContext } from "react";
import AuthContext from "@/state/auth/auth-context";
import styles from "./headerPerfil.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faBars,
  faXmark,
  faArrowRight,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function HeaderPerfil() {
  const { logout } = useContext(AuthContext);
  const [outside, setOutside] = useState(true);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout(); // Llamamos a la función logout para cerrar la sesión
      localStorage.removeItem("userProfile");
      localStorage.removeItem("calculatedData");
      localStorage.removeItem("trainingData");
      localStorage.removeItem("trainingData");
      localStorage.removeItem("alimentacionData");
      console.log("Sesión cerrada con éxito");
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar la sesión:", error.message);
    }
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/images/icons/logo.svg"
          alt="logo-quesada"
          width={175}
          height={50}
        />
      </Link>
      {outside ? (
        <section onClick={() => setOutside(false)} className={styles.btnHeader}>
          <p>Cerrar sesión</p>
          <FontAwesomeIcon icon={faXmark} size="2x" className={styles.icon} />
        </section>
      ) : (
        <section className={styles.cerrarSesion}>
          <div className={styles.containerClosing}>
            <div onClick={() => setOutside(true)} className={styles.btnClose}>
              <FontAwesomeIcon
                icon={faRotateLeft}
                size="2x"
                className={styles.iconBtn}
              />
            </div>
            <h3>¿Seguro que deseas salir de la sesión?</h3>
            <button onClick={handleLogout} className={styles.btnSesionClosing}>
              Si, Cerrar sesión
              <span>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  size="2x"
                  className={styles.icon}
                />
              </span>
            </button>
          </div>
        </section>
      )}
    </header>
  );
}
