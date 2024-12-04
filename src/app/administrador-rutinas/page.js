"use client";
import React, { useRef } from "react";
import styles from "./page.module.css";
import Head from "next/head";
import HeaderPerfil from "@/components/headerPerfil/headerPerfil";
import Footer from "@/components/footer/footer";
import Herramientas from "@/components/herramientas/herramientas";
import HeroAdmin from "@/components/heroAdmin/heroAdmin";
import Closing from "@/components/closing/closing";
import AllRutinas from "@/components/allRutinas/allRutinas";



export default function AdministradorRutinas() {
  const goUp = useRef(null);


  return (
    <>
      <Head>
      <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          Quesada Coach App - Planes de entrenamiento y nutrición personalizados
          creados por expertos
        </title>
        <meta
          name="description"
          content="Descubre Quesada Coach App, Planes de entrenamiento y nutrición personalizados creados por
            expertos, diseñados para transformar tu cuerpo y tu vida"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main ref={goUp} className={styles.contGeneralPerfil}>
        <section className={styles.flexGeneral}>
          <section className={styles.flexHeader}>
            <HeaderPerfil />
            <Herramientas />
          </section>
          <section className={styles.flexPerfil}>
            <HeroAdmin />
            <AllRutinas />
          </section>
        </section>
        <span className={styles.blur}></span>
        <Closing goUp={goUp} />
        <Footer />
      </main>
    </>
  );
}
