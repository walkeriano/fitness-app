"use client";
import React, { useContext, useEffect } from "react";
import styles from "./page.module.css";
import Head from "next/head";
import FormFemenino from "@/components/formularios/formFemenino";
import HeaderPerfil from "@/components/headerForm/headerForm";
import Footer from "@/components/footer/footer";
import AuthContext from "@/state/auth/auth-context";
import { useRouter } from "next/navigation";

export default function PerfilFemenino() {
  const { user } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
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
      <main className={styles.containerPerfilMasculino}>
        <HeaderPerfil />
        <FormFemenino />
        <span className={styles.blur}></span>
        <Footer />
      </main>
    </>
  );
}
