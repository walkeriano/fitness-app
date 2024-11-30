import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import styles from "./beneficios.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheckToSlot } from "@fortawesome/free-solid-svg-icons";

export default function Beneficios() {
  const [detailsOne, setDetailsOne] = useState(false);
  const [detailsTwo, setDetailsTwo] = useState(false);
  const [detailsTre, setDetailsTre] = useState(false);
  const [detailsFor, setDetailsFor] = useState(false);

  const container1Ref = useRef(null);
  const container2Ref = useRef(null);
  const container3Ref = useRef(null);
  const container4Ref = useRef(null);

  useEffect(() => {
    const container1 = container1Ref.current;
    const container2 = container2Ref.current;
    const container3 = container3Ref.current;
    const container4 = container4Ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const { target } = entry;
          if (entry.isIntersecting) {
            gsap.to(target, {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power4.out",
            });
          } else {
            gsap.to(target, {
              opacity: 0,
              x: -100,
              duration: 1,
              ease: "power4.out",
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (container1 && container2 && container3 && container4) {
      observer.observe(container1);
      observer.observe(container2);
      observer.observe(container3);
      observer.observe(container4);
    }

    return () => {
      if (container1 && container2 && container3 && container4) {
        observer.unobserve(container1);
        observer.unobserve(container2);
        observer.unobserve(container3);
        observer.unobserve(container4);
      }
    };
  }, []);

  return (
    <section className={styles.containerBeneficios}>
      <section className={styles.contFlex}>
        <div
          ref={container1Ref}
          className={styles.link}
          onClick={() => setDetailsOne(!detailsOne)}
        >
          <span>
            <FontAwesomeIcon
              icon={faArrowRight}
              size="2x"
              className={styles.icon}
            />
          </span>
          <h3>Planes de entrenamiento</h3>
          <Image
            src="/images/benefits-one.jpg"
            alt="image-service"
            fill={true}
          />
        </div>
        {detailsOne && (
          <section className={styles.details}>
            <p>
              Planes de entrenamiento Diseñados por expertos para adaptarse a tu
              nivel, metas y estilo de vida.
            </p>
            <ul>
              <li>
                <Image
                  src="/images/icons/check.svg"
                  alt="icon-check"
                  width={20}
                  height={20}
                />
                faCheckToSlot
              </li>
              <li>
                <Image
                  src="/images/icons/check.svg"
                  alt="icon-check"
                  width={20}
                  height={20}
                />
                faCheckToSlot
              </li>
              <li>
                <Image
                  src="/images/icons/check.svg"
                  alt="icon-check"
                  width={20}
                  height={20}
                />
                faCheckToSlot
              </li>
            </ul>
          </section>
        )}
        <div
          ref={container2Ref}
          className={styles.link}
          onClick={() => setDetailsTwo(!detailsTwo)}
        >
          <span>
            <FontAwesomeIcon
              icon={faArrowRight}
              size="2x"
              className={styles.icon}
            />
          </span>
          <h3>Nutrición personalizada</h3>
          <Image
            src="/images/benefits-two.jpg"
            alt="image-service"
            fill={true}
          />
        </div>
        {detailsTwo && (
          <section className={styles.details}>
            <p>
              Nutrición personalizada Dietas específicas para perder grasa,
              ganar músculo o mantenerte en forma.
            </p>
            <ul>
              <li>
                <Image
                  src="/images/icons/check.svg"
                  alt="icon-check"
                  width={20}
                  height={20}
                />
                faCheckToSlot
              </li>
              <li>
                <Image
                  src="/images/icons/check.svg"
                  alt="icon-check"
                  width={20}
                  height={20}
                />
                faCheckToSlot
              </li>
              <li>
                <Image
                  src="/images/icons/check.svg"
                  alt="icon-check"
                  width={20}
                  height={20}
                />
                faCheckToSlot
              </li>
            </ul>
          </section>
        )}
      </section>
      <section className={styles.contFlex}>
        <div
          ref={container3Ref}
          className={styles.link}
          onClick={() => setDetailsTre(!detailsTre)}
        >
          <span>
            <FontAwesomeIcon
              icon={faArrowRight}
              size="2x"
              className={styles.icon}
            />
          </span>
          <h3>Seguimiento de progreso</h3>
          <Image
            src="/images/benefits-tre.jpg"
            alt="image-service"
            fill={true}
          />
        </div>
        {detailsTre && (
          <section className={styles.details}>
            <p>
              Seguimiento de progresoHerramientas integradas para registrar
              avances y celebrar cada logro.
            </p>
            <ul>
              <li>
                <Image
                  src="/images/icons/check.svg"
                  alt="icon-check"
                  width={20}
                  height={20}
                />
                faCheckToSlot
              </li>
              <li>
                <Image
                  src="/images/icons/check.svg"
                  alt="icon-check"
                  width={20}
                  height={20}
                />
                faCheckToSlot
              </li>
              <li>
                <Image
                  src="/images/icons/check.svg"
                  alt="icon-check"
                  width={20}
                  height={20}
                />
                faCheckToSlot
              </li>
            </ul>
          </section>
        )}
        <div
          ref={container4Ref}
          className={styles.link}
          onClick={() => setDetailsFor(!detailsFor)}
        >
          <span>
            <FontAwesomeIcon
              icon={faArrowRight}
              size="2x"
              className={styles.icon}
            />
          </span>
          <h3>Infoproductos exclusivos</h3>
          <Image
            src="/images/benefits-for.jpg"
            alt="image-service"
            fill={true}
          />
        </div>
        {detailsFor && (
          <section className={styles.details}>
            <p>
              Infoproductos exclusivos Disponibles solo dentro de la plataforma
              y accesibles para su compra una vez que seas parte de nuestra
              comunidad.
            </p>
            <ul>
              <li>
                <Image
                  src="/images/icons/check.svg"
                  alt="icon-check"
                  width={20}
                  height={20}
                />
                faCheckToSlot
              </li>
              <li>
                <Image
                  src="/images/icons/check.svg"
                  alt="icon-check"
                  width={20}
                  height={20}
                />
                faCheckToSlot
              </li>
              <li>
                <Image
                  src="/images/icons/check.svg"
                  alt="icon-check"
                  width={20}
                  height={20}
                />
                faCheckToSlot
              </li>
            </ul>
          </section>
        )}
      </section>
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
  );
}
