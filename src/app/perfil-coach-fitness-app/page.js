"use client";
import styles from "./page.module.css";
import Head from "next/head";
import Image from "next/image";
import HeaderPerfil from "@/components/headerPerfil/headerPerfil";
import Footer from "@/components/footer/footer";
import Perfil from "@/components/perfil/perfil";
import Menu from "@/components/menu/menu";

export default function PerfilCoachFitnessApp() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>Quesada Coach App</title>
        <meta name="description" content="quesada coach app - fitness" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.contGeneralPerfil}>
        <HeaderPerfil />
        <Menu />
        <span className={styles.blur}></span>
        <Perfil />
        <Footer />
      </main>
    </>
  );
}
