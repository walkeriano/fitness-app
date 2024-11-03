"use client";
import React, { useRef } from "react";
import styles from "./page.module.css";
import Head from "next/head";
import HeaderPerfil from "@/components/headerPerfil/headerPerfil";
import Footer from "@/components/footer/footer";
import Menu from "@/components/menu/menu";
import Entrenamiento from "@/components/entrenamiento/entrenamiento";
import Closing from "@/components/closing/closing";



export default function EntrenamientoCoachFitnessApp() {
  const goUp = useRef(null);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Quesada Coach App</title>
        <meta name="description" content="quesada coach app - fitness" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main ref={goUp} className={styles.contGeneralPerfil}>
        <HeaderPerfil />
        <Menu />
        <span className={styles.blur}></span>
        <Entrenamiento/>
        <Closing goUp={goUp} />
        <Footer />
      </main>
    </>
  );
}
