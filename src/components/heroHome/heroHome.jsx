import React, { useEffect, useRef } from "react";
import styles from "./heroHome.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronDown,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroHome() {
  const divRef = useRef(null);

  const containerRef = useRef(null);
  
  useEffect(() => {
    const triggerId = "myComponentAnimation";

    const initAnimation = () => {
      const containerHeight = containerRef.current.getBoundingClientRect().height;
      const displacement = containerHeight * 1.1;

      gsap.to(divRef.current, {
        y: displacement,
        filter: "grayscale(100%)",
        ease: "power1.out",
        scrollTrigger: {
          id: triggerId,
          trigger: divRef.current,
          start: "top 15%",
          end: `+=${displacement}`,
          scrub: 1,
          onUpdate: self => {
            if (self.isActive) {
              const updatedHeight = containerRef.current.getBoundingClientRect().height;
              const newDisplacement = updatedHeight * 1.1;
              if (newDisplacement !== displacement) {
                self.vars.end = `+=${newDisplacement}`;
              }
            }
          }
        }
      });
    };

    initAnimation();

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.id === triggerId)
        .forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.hero} ref={containerRef}>
      <section className={styles.info}>
        <h1>
          Tu mejor versión,
          <span>a un click</span>
        </h1>
        <section className={styles.contInfo}>
          <h2>
            Planes de entrenamiento y nutrición personalizados creados por
            expertos, diseñados para transformar tu cuerpo y tu vida
          </h2>
          <div className={styles.slide}>
            <p>Seguir deslizando</p>
            <FontAwesomeIcon
              icon={faChevronDown}
              size="2x"
              className={styles.icon}
            />
          </div>
          <section className={styles.containerReputacion}>
            <div className={styles.boxTitle}>
              <p>Asesorados activos</p>
              <FontAwesomeIcon
                icon={faChevronDown}
                size="2x"
                className={styles.icon}
              />
            </div>
            <section className={styles.recomendacion}>
              <div className={styles.divG}>
                <Image
                  src="/images/caso-01.jpg"
                  alt="reputacion-1"
                  className={styles.iconReputacion}
                  fill={true}
                  sizes="(max-width: 75px)"
                />
              </div>
              <div className={styles.divG}>
                <Image
                  src="/images/caso-04.jpg"
                  alt="reputacion-1"
                  className={styles.iconReputacion}
                  fill={true}
                  sizes="(max-width: 75px)"
                />
              </div>
              <div className={styles.divG}>
                <Image
                  src="/images/caso-06.jpg"
                  alt="reputacion-1"
                  className={styles.iconReputacion}
                  fill={true}
                  sizes="(max-width: 75px)"
                />
              </div>
              <div className={styles.divG}>
                <Image
                  src="/images/caso-08.jpg"
                  alt="reputacion-1"
                  className={styles.iconReputacion}
                  fill={true}
                  sizes="(max-width: 75px)"
                />
              </div>
              <span className={styles.spanta}>
                +150
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
            </section>
          </section>
          <section className={styles.socialMedia}>
            <div className={styles.boxInfoSocial}>
              <p>Encuentranos en</p>
              <FontAwesomeIcon
                icon={faChevronDown}
                size="2x"
                className={styles.icon}
              />
            </div>
            <section className={styles.channelSocial}>
              <a href="/" className={styles.boxchannel}>
                <FontAwesomeIcon
                  icon={faFacebookF}
                  size="2x"
                  className={styles.icon}
                />
              </a>
              <a href="/" className={styles.boxchannel}>
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="2x"
                  className={styles.icon}
                />
              </a>
              <a href="/" className={styles.boxchannel}>
                <FontAwesomeIcon
                  icon={faTiktok}
                  size="2x"
                  className={styles.icon}
                />
              </a>
            </section>
          </section>
          <div className={styles.butonsHero}>
            <Link href="/acceso-fitness-app" className={styles.buttonFirst}>
              Iniciar sesión
              <span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="2x"
                  className={styles.icon}
                />
              </span>
            </Link>
            <Link href="/suscripcion-mensual" className={styles.buttonFirst}>
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
        <Image
          src="/images/partners-one-oficial.png"
          alt="carlos-y-karina"
          fill={true}
          priority={true}
        />
        <span></span>
        <span></span>
      </section>
    </section>
  );
}
