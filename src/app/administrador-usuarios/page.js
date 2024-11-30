"use client";
import React, { useRef } from "react";
import styles from "./page.module.css";
import Head from "next/head";
import HeaderPerfil from "@/components/headerPerfil/headerPerfil";
import Footer from "@/components/footer/footer";
import Herramientas from "@/components/herramientas/herramientas";
import HeroAdmin from "@/components/heroAdmin/heroAdmin";
import AllUsers from "@/components/allUsers/allUsers";
import Closing from "@/components/closing/closing";



export default function Administrador() {
  const goUp = useRef(null);


  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Quesada Coach App</title>
        <meta name="description" content="Quesada coach app" />
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
            <AllUsers />
          </section>
        </section>
        <span className={styles.blur}></span>
        <Closing goUp={goUp} />
        <Footer />
      </main>
    </>
  );
}
