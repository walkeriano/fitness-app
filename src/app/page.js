"use client";
import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import styles from "./page.module.css";
import Header from "@/components/header/header";
import HeroHome from "@/components/heroHome/heroHome";
import Presentacion from "@/components/presentacion/presentacion";
import SliderCasos from "@/components/sliderCasos/sliderCasos";
import Explicacion from "@/components/explicacion/explicacion";
import Beneficios from "@/components/beneficios/beneficios";
import Onetoone from "@/components/onetoone/onetoone";
import Footer from "@/components/footer/footer";
import Closing from "@/components/closing/closing";
import Loading from "@/components/loading/loading";
import PreguntasFrecuentes from "@/components/preguntasFrecuentes/preguntasFrecuentes";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const goUp = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Quesada Coach App</title>
        <meta name="description" content="quesada coach app - fitness" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div ref={goUp} className={styles.ref}></div>
            <Header/>
            <HeroHome />
            <Presentacion />
            <SliderCasos />
            <Explicacion />
            <Beneficios />
            <Onetoone />
            <PreguntasFrecuentes/>
            <Closing goUp={goUp} />
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
