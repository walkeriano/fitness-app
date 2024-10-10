"use client";
import styles from "./page.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function RegistroNuevoPerfil() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Quesada Coach App</title>
        <meta name="description" content="quesada coach app - fitness" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.containerSelection}>
        <Header />
        <section className={styles.selector}>
          <section className={styles.infoGeneral}>
            <p>Selecciona para iniciar</p>
            <h3>Personaliza el plan ideal para ti</h3>
          </section>
          <section className={styles.selectorContainer}>
            <Link
              href="/registro-nuevo-perfil-masculino"
              className={styles.linkGen}
            >
              <div className={styles.conTitle}>
                <h4>Masculino</h4>
                <span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="2x"
                    className={styles.icon}
                  />
                </span>
              </div>
              <Image
                src="/images/genero-masculino.jpg"
                alt="genero-masculino"
                fill={true}
              />
            </Link>
            <Link
              href="/registro-nuevo-perfil-masculino"
              className={styles.linkGen}
            >
              <div className={styles.conTitle}>
                <h4>Femenino</h4>
                <span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="2x"
                    className={styles.icon}
                  />
                </span>
              </div>
              <Image
                src="/images/genero-femenino.jpg"
                alt="genero-masculino"
                fill={true}
              />
            </Link>
          </section>
        </section>
        <span className={styles.blur}></span>
        <Footer />
      </main>
    </>
  );
}
