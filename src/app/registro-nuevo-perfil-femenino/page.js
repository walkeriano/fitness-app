"use client";
import styles from "./page.module.css";
import Head from "next/head";
import FormFemenino from "@/components/formularios/formFemenino";
import HeaderPerfil from "@/components/headerPerfil/headerPerfil";
import Footer from "@/components/footer/footer";

export default function PerfilFemenino() {
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
        <FormFemenino />
        <span className={styles.blur}></span>
        <Footer />
      </main>
    </>
  );
}
