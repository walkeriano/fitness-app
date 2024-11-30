import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./explicacion.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Explicacion() {
  const imagePhoneRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      imagePhoneRef.current,
      { opacity: 0, x: 100, scale: 1.5 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          id: "explicacionTrigger",
          trigger: imagePhoneRef.current,
          start: "top 60%",
          end: "top 20%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className={styles.containerExplicacion}>
      <h3>
        ¿Qué es <span>quesada coach app?</span>
      </h3>
      <div className={styles.imagePhone} ref={imagePhoneRef}>
        <Image
          src="/images/mock-oficial.png"
          alt="app-previsualizacion"
          fill={true}
        />
      </div>
      <h4>
        Una experiencia fitness premium diseñada para alcanzar tus metas.
        Descubre la fórmula perfecta entre entrenamiento, nutrición y motivación
        para resultados garantizados.
      </h4>
      <p>
        Toda nuestra experiencia y conocimientos en en una aplicación que te
        ayudará a lograr tus objetivos físicos en tiempo record!
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
