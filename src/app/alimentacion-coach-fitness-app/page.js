"use client";
import styles from "./page.module.css";
import Head from "next/head";
import HeaderPerfil from "@/components/headerPerfil/headerPerfil";
import Footer from "@/components/footer/footer";
import Menu from "@/components/menu/menu";
import InfoProducts from "@/components/infoProducts/infoProducts";
import Alimentacion from "@/components/alimentacion/alimentacion";

export default function AlimentacionCoachFitnessApp() {
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
        <Alimentacion/>
        <InfoProducts />
        <Footer />
      </main>
    </>
  );
}
