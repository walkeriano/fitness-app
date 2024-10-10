"use client";
import React, { useRef } from "react";
import styles from "./page.module.css";
import Head from "next/head";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Closing from "@/components/closing/closing";
import HeroSub from "@/components/heroSub/heroSub";
import Explicacion from "@/components/explicacion/explicacion";
import Beneficios from "@/components/beneficios/beneficios";
import Onetoone from "@/components/onetoone/onetoone";

export default function AccesUser() {
  const goUp = useRef(null);


  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Quesada Coach App</title>
        <meta name="description" content="quesada coach app - fitness" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.contAccesUser}>
        <div ref={goUp} className={styles.ref}></div>
        <Header/>
        <HeroSub />
        <Explicacion />
        <Beneficios />
        <Onetoone />
        <Closing goUp={goUp} />
        <Footer />
      </main>
    </>
  );
}
