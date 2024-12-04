"use client";
import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import AuthContext from "@/state/auth/auth-context";
import styles from "./page.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faArrowRight, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

export default function RegistroNuevoPerfil() {
  const [newRegister, setNewRegister] = useState(true);
  const { user, register: registerUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setErrorMessage("");
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        createdAt: new Date(),
      });
      setNewRegister(false); // Cambia al formulario de login
      console.log("Registro exitoso");
    } catch (err) {
      const error = handleFirebaseError(err);
      setErrorMessage(error);
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
      <main className={styles.containerSelection}>
        <Header />
        {newRegister ? (
          <section className={styles.registerForm}>
            <div className={styles.titelForm}>
              <p>Registrate para iniciar sesión</p>
              <h3>Crear credenciales de usuario</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.boxInput}>
                <label>Email de acceso:</label>
                <input
                  type="email"
                  placeholder="Escribir aqui.."
                  className={
                    touchedFields.email
                      ? errors.email
                        ? styles.invalid
                        : styles.valid
                      : ""
                  }
                  {...register("email", {
                    required: "El email es obligatorio*",
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
                    required: "La contraseña es obligatoria*",
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
                <p className={styles.indication}>
                  *Mínimo 6 carácteres entre números y letras
                </p>
                {errors.password && (
                  <span className={styles.error}>
                    {errors.password.message}
                  </span>
                )}
              </div>
              <button type="submit" className={styles.btnAcces}>
                Registrar
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
        ) : (
          <section className={styles.selector}>
            <div className={styles.imgBoxSelector}>
              <Image
                src="/images/partners-two.png"
                alt="carlos-y-karina"
                fill={true}
              />
              <span className={styles.blurTwo}></span>
            </div>
            <section className={styles.infoGeneral}>
              <h2>Excelente!</h2>
              <h3>Empecémos a crear el plan ideal para ti</h3>
              <div className={styles.parraf}>
                <p>Seleccionar genero</p>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size="2x"
                  className={styles.icon}
                />
              </div>
            </section>
            <section className={styles.selectorContainer}>
              <Link
                href="/registro-nuevo-perfil-masculino"
                className={styles.linkGen}
              >
                <div className={styles.conTitle}>
                  <h4>Masculino</h4>
                  <span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      size="2x"
                      className={styles.icon}
                    />
                  </span>
                </div>
                <Image
                  src="/images/genero-masculino.jpg"
                  alt="genero-masculino"
                  fill={true}
                />
              </Link>
              <Link
                href="/registro-nuevo-perfil-femenino"
                className={styles.linkGen}
              >
                <div className={styles.conTitle}>
                  <h4>Femenino</h4>
                  <span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      size="2x"
                      className={styles.icon}
                    />
                  </span>
                </div>
                <Image
                  src="/images/genero-femenino.jpg"
                  alt="genero-masculino"
                  fill={true}
                />
              </Link>
            </section>
          </section>
        )}
        <span className={styles.blur}></span>
        <Footer />
      </main>
    </>
  );
}
