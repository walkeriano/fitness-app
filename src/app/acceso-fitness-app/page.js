"use client";
import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "@/state/auth/auth-context";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Head from "next/head";
import Image from "next/image";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEyeSlash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

export default function AccesoFitnessApp() {
  const { user, login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/perfil-coach-fitness-app");
    }
  }, [user, router]);

  const onSubmit = async (data) => {
    setError(null);

    try {
      await login(data.email, data.password);
      router.push("/perfil-coach-fitness-app");
    } catch (error) {
      setError(error.message);
    }
  };

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
      <main className={styles.contGeneral}>
        <Header />
        <section className={styles.container}>
          <section className={styles.infoImage}>
            <h2>
              Acceso de<span>usuarios</span>
            </h2>
            <div className={styles.contImg}>
              <Image
                src="/images/partners-one-oficial.png"
                alt="carlos-y-karina"
                fill={true}
              />
            </div>
          </section>
          <section className={styles.contAcces}>
            <h3>Iniciar sesión</h3>
            <p>Ingresa tus credenciales</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.boxInput}>
                <label>Email:</label>
                <input
                  type="text"
                  placeholder="Escribir aqui.."
                  className={
                    touchedFields.email
                      ? errors.email
                        ? styles.invalid
                        : styles.valid
                      : ""
                  }
                  {...register("email", {
                    required: "El email es obligatorio",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email no es válido",
                    },
                  })}
                />
                {errors.email && (
                  <span className={styles.error}>{errors.email.message}</span>
                )}
              </div>
              <div className={styles.boxInput}>
                <label>Contraseña:</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Escribir aqui.."
                  className={
                    touchedFields.password
                      ? errors.password
                        ? styles.invalid
                        : styles.valid
                      : ""
                  }
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                      message: "La contraseña debe contener letras y números",
                    },
                  })}
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)} // Alterna la visibilidad
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className={styles.icon}
                  />
                </button>
                {errors.password && (
                  <span className={styles.error}>
                    {errors.password.message}
                  </span>
                )}
              </div>
              <p className={styles.indication}>
                *Mínimo 6 carácteres entre números y letras
              </p>
              {error && <span className={styles.error}>{error}</span>}
              <button type="submit" className={styles.btnAcces}>
                Acceder
                <span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size="2x"
                    className={styles.icon}
                  />
                </span>
              </button>
            </form>
          </section>
          <span className={styles.blur}></span>
        </section>
        <Footer />
      </main>
    </>
  );
}
