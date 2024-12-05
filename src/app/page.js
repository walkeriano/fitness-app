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
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="fitness, Quesada Coach, alimentación saludalbe, bienestar, entrenamiento personalizado"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://quesadacoach.com/logo512.png" />
        <meta
          property="og:title"
          content="Quesada Coach App - Planes de entrenamiento y nutrición personalizados
          creados por expertos"
        />
        <meta
          property="og:description"
          content="Descubre Quesada Coach App, Planes de entrenamiento y nutrición personalizados creados por
            expertos, diseñados para transformar tu cuerpo y tu vida."
        />
        <meta
          property="og:image"
          content="https://quesadacoach.com/logo512.png"
        />
        <meta property="og:url" content="https://quesadacoach.com" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://quesadacoach.com" />
      </Head>
      <main className={styles.main}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div ref={goUp} className={styles.ref}></div>
            <Header />
            <HeroHome />
            <Presentacion />
            <SliderCasos />
            <Explicacion />
            <Beneficios />
            <Onetoone />
            <PreguntasFrecuentes />
            <Closing goUp={goUp} />
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
