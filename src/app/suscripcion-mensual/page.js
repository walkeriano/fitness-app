"use client";
import React, { useRef, useState, useContext, useEffect } from "react";
import styles from "./page.module.css";
import Head from "next/head";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Closing from "@/components/closing/closing";
import HeroSub from "@/components/heroSub/heroSub";
import Explicacion from "@/components/explicacion/explicacion";
import Beneficios from "@/components/beneficios/beneficios";
import Onetoone from "@/components/onetoone/onetoone";
import AuthContext from "@/state/auth/auth-context";
import { useRouter } from "next/navigation";

export default function AccesUser() {
  const goUp = useRef(null);
  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/perfil-coach-fitness-app");
    }
  }, [user, router]);

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
      <main className={styles.contAccesUser}>
        <div ref={goUp} className={styles.ref}></div>
        <Header />
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
