"use client";
import React, { useRef } from "react";
import styles from "./page.module.css";
import Head from "next/head";
import HeaderPerfil from "@/components/headerPerfil/headerPerfil";
import Footer from "@/components/footer/footer";
import Herramientas from "@/components/herramientas/herramientas";
import HeroAdmin from "@/components/heroAdmin/heroAdmin";
import Closing from "@/components/closing/closing";
import AllInfoproductos from "@/components/allInfoproductos/allInfoproductos";

export default function AdministradorInfoProductos() {
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
        <span className={styles.blur}></span>
        <HeroAdmin />
        <Herramientas />
        <AllInfoproductos />
        <Closing goUp={goUp} />
        <Footer />
      </main>
    </>
  );
}
