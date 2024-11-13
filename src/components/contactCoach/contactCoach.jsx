"use client";
import React, { useState, useEffect, useContext } from "react";
import styles from "./contactCoach.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";
import imagenCarlos from "/public/images/coach-carlos-perfil.png";
import imagenKarina from "/public/images/coach-karina-perfil.png";

export default function ContactCoach({ coachName }) {
  const [imagenCoach, setImagenCoach] = useState(null);

  useEffect(() => {
    if (coachName === "carlos quesada") {
      setImagenCoach(imagenCarlos);
    } else if (coachName === "karina durand") {
      setImagenCoach(imagenKarina);
    }
  }, [coachName]);

  return (
    <section className={styles.contactCoach}>
      <section className={styles.leftSpace}>
        <div className={styles.title}>
          <h3>¿Necesitas ayuda?</h3>
          <p>{coachName}</p>
        </div>
        <div className={styles.btnSpace}>
          <Link href="/contacto" className={styles.btnContact}>
            <FontAwesomeIcon
              icon={faWhatsapp}
              size="2x"
              className={styles.icon}
            />
          </Link>
          <Link href="/contacto" className={styles.btnContact}>
            <FontAwesomeIcon
              icon={faPaperPlane}
              size="2x"
              className={styles.icon}
            />
          </Link>
        </div>
      </section>
      <section className={styles.rightSpace}>
        {imagenCoach && (
          <Image
            src={imagenCoach}
            alt="image-coach"
            fill={true}
          />
        )}
      </section>
    </section>
  );
}
