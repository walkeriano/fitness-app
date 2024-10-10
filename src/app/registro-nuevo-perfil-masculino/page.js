"use client";
import styles from "./page.module.css";
import Head from "next/head";
import FormMasculino from "@/components/formularios/formMasculino";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function PerfilMasculino() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Quesada Coach App</title>
        <meta name="description" content="quesada coach app - fitness" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.containerPerfilMasculino}>
        <Header />
        <FormMasculino />
        <span className={styles.blur}></span>
        <Footer />
      </main>
    </>
  );
}
