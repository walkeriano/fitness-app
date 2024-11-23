"use client";
import React from "react";
import styles from "./headerForm.module.css";
import Image from "next/image";
import Link from "next/link";

export default function HeaderForm() {

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/images/icons/logo.svg"
          alt="logo-quesada"
          width={175}
          height={50}
        />
      </Link>
      
    </header>
  );
}
