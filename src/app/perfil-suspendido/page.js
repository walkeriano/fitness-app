"use client";
import styles from "./page.module.css";
import Head from "next/head";
import HeaderPerfil from "@/components/headerPerfil/headerPerfil";
import Footer from "@/components/footer/footer";
import PerfilSuspendidoComp from "@/components/perfilSuspendido/perfilSuspendido";
import Menu from "@/components/menu/menu";

export default function PerfilSuspendido() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Quesada Coach App</title>
        <meta name="description" content="Quesada coach app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.contGeneralPerfil}>
        <HeaderPerfil />
        <span className={styles.blur}></span>
        <PerfilSuspendidoComp />
        <Footer />
      </main>
    </>
  );
}
