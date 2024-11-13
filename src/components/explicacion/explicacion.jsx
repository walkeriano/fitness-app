import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./explicacion.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Explicacion() {
  const imagePhoneRef = useRef(null); // Crear la referencia

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger); // Registrar el plugin ScrollTrigger

    // Animación de opacidad sincronizada con el scroll
    gsap.fromTo(
      imagePhoneRef.current, // El elemento a animar
      { opacity: 0, x: 100, scale: 1.5 }, // Desde opacidad 0
      {
        opacity: 1,
        x: 0, // Hasta opacidad 1
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: imagePhoneRef.current, // El div que activará el scroll
          start: "top 60%", // Inicia la animación cuando el div está al 80% del viewport
          end: "top 20%", // Termina cuando llega al 50% del viewport
          scrub: true, // Hace que la animación se sincronice con el scroll
        },
      }
    );
  }, []);

  return (
    <section className={styles.containerExplicacion}>
      <h3>
        ¿Qué es <span>quesada coach fitness app?</span>
      </h3>
      <div className={styles.imagePhone} ref={imagePhoneRef}>
        <Image
          src="/images/mockup.png"
          alt="app-previsualizacion"
          fill={true}
        />
      </div>
      <h4>
        Aplicación fitness desarrollada para facilitar el seguimiento físico y
        alimenticio en el progreso del día a día
      </h4>
      <p>
        Toda nuestra experiencia y conocimientos en en una aplicación que te
        ayudará a lograr tus objetivos físicos en tiedadsampo record!
      </p>
      <Link href="/" className={styles.btnSuscripcion}>
        Suscribirme ahora
        <span>
          <FontAwesomeIcon
            icon={faArrowRight}
            size="2x"
            className={styles.icon}
          />
        </span>
      </Link>
    </section>
  );
}
