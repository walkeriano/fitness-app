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

    const updateAnimation = () => {
      const containerHeight =
        containerRef.current.getBoundingClientRect().height; 
      const displacement = containerHeight * 1.1; 

   
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.id === triggerId)
        .forEach((trigger) => trigger.kill());

      
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
        },
      });

      
      ScrollTrigger.refresh();
    };

    
    updateAnimation();

    
    window.addEventListener("resize", updateAnimation);

    
    return () => {
      window.removeEventListener("resize", updateAnimation);

      
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.vars.id === triggerId)
        .forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.hero} ref={containerRef}>
      <section className={styles.info}>
        <h1>
          Fitness
          <span>life style</span>
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
              <div>
                <Image
                  src="/images/caso-01.jpg"
                  alt="reputacion-1"
                  className={styles.iconReputacion}
                  fill={true}
                />
              </div>
              <div>
                <Image
                  src="/images/caso-04.jpg"
                  alt="reputacion-1"
                  className={styles.iconReputacion}
                  fill={true}
                />
              </div>
              <div>
                <Image
                  src="/images/caso-06.jpg"
                  alt="reputacion-1"
                  className={styles.iconReputacion}
                  fill={true}
                />
              </div>
              <div>
                <Image
                  src="/images/caso-08.jpg"
                  alt="reputacion-1"
                  className={styles.iconReputacion}
                  fill={true}
                />
              </div>
              <span>
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
              <a href="">
              <FontAwesomeIcon
                icon={faFacebookF}
                size="2x"
                className={styles.icon}
              />
              </a>
              <a href="">
              <FontAwesomeIcon
                icon={faInstagram}
                size="2x"
                className={styles.icon}
              />
              </a>
              <a href="">
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
        />
        <span></span>
        <span></span>
      </section>
    </section>
  );
}
