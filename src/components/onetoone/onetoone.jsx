import React, { useEffect, useRef } from "react";
import styles from "./onetoone.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Onetoone() {
  const imageBoxRef = useRef(null);
  const infoContainerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      imageBoxRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: imageBoxRef.current,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1,
        },
      }
    );

    gsap.fromTo(
      infoContainerRef.current,
      { x: 100, opacity: 0 }, // Estado inicial
      {
        x: 0, // Estado final
        opacity: 1,
        scrollTrigger: {
          trigger: infoContainerRef.current,
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section className={styles.containerOnetoone}>
      <div ref={imageBoxRef} className={styles.imageBox}>
        <Image
          src="/images/partners-two.png"
          alt="persons-carlos-karina"
          fill={true}
        />
      </div>
      <section className={styles.infoContainer}>
        <h3>Webinars grupales exclusivos</h3>
        <p>
          Todos los suscriptores de Quesada Coach App podrán participar en
          webinars en vivo junto a la comunidad, donde nuestros expertos
          compartirán tips, responderán dudas y motivarán tu progreso.
        </p>
        <Link href="/suscripcion-mensual" className={styles.btnSuscripcion}>
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
      <div ref={infoContainerRef} className={styles.texture}>
        <Image
          src="/images/texture.svg"
          alt="persons-carlos-karina"
          fill={true}
        />
      </div>
      <span className={styles.blur}></span>
    </section>
  );
}
