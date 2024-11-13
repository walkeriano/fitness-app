"use client";
import styles from "./page.module.css";
import Head from "next/head";
import HeaderPerfil from "@/components/headerPerfil/headerPerfil";
import AumentarNivelComp from "@/components/formularios/formAumentarNivel";
import Footer from "@/components/footer/footer";

export default function AumentarNivel() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Quesada Coach App</title>
        <meta name="description" content="quesada coach app - fitness" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.containerPerfilMasculino}>
        <HeaderPerfil />
        <AumentarNivelComp/>
        <span className={styles.blur}></span>
        <Footer />
      </main>
    </>
  );
}