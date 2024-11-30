"use client";
import styles from "./page.module.css";
import Head from "next/head";
import HeaderPerfil from "@/components/headerForm/headerForm";
import FormAumentarNivel from "@/components/formAumentarNivel/formAumentarNivel";
import Footer from "@/components/footer/footer";

export default function AumentarNivel() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Quesada Coach App</title>
        <meta name="description" content="Quesada coach app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.containerPerfilMasculino}>
        <HeaderPerfil />
        <FormAumentarNivel/>
        <span className={styles.blur}></span>
        <Footer />
      </main>
    </>
  );
}