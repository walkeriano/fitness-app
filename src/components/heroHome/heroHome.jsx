import React, {useEffect, useRef} from "react";
import styles from "./heroHome.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';



export default function HeroHome() {
  const divRef = useRef(null); // Referencia al div que queremos animar

  const containerRef = useRef(null); // Referencia al contenedor padre

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Obtener la altura del contenedor padre
    const containerHeight = containerRef.current.getBoundingClientRect().height;

    // Calcular el desplazamiento deseado (ejemplo: 100% de la altura del contenedor)
    const displacement = containerHeight * 1.0; // 50% de la altura del contenedor

    const animation = gsap.to(divRef.current, {
      y: displacement, // Usar el desplazamiento calculado
      filter: 'grayscale(100%)',
      ease: 'power1.out',
      scrollTrigger: {
        trigger: divRef.current,
        start: 'top 15%',
        end: `+=${displacement}`, // También usar el desplazamiento aquí
        scrub: 1,
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
    
  return (
    <section className={styles.hero} ref={containerRef}>
      <section className={styles.info}>
        <h1>
          Fitness<span>life style</span>
        </h1>
        <section className={styles.contInfo}>
          <h2>Los grandes secretos del fitness en tus manos</h2>
          <div className={styles.slide}>
            <p>Seguir deslizando</p>
            <FontAwesomeIcon
              icon={faChevronDown}
              size="2x"
              className={styles.icon}
            />
          </div>
          <div className={styles.butonsHero}>
            <Link href="/acceso-fitness-app" className={styles.button}>
              Iniciar sesión
              <span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="2x"
                  className={styles.icon}
                />
              </span>
            </Link>
            <Link href="/suscripcion-mensual" className={styles.button} >
              Suscribirme
              <span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="2x"
                  className={styles.icon}
                />
              </span>
            </Link>
          </div>
        </section>
      </section>
      <section ref={divRef} className={styles.imageBox}>
        <Image src="/images/partners-one.png" alt="carlos-y-karina" fill={true} />
        <span></span>
        <span></span>
      </section>
    </section>
  );
}
