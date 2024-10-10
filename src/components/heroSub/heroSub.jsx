"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./heroSub.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function HeroHub() {
  const [result, setResult] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    watch, // Observa los valores de los campos
  } = useForm(); // Desestructura useForm

  const onSubmit = async (data) => {
    setResult("Sending....");
    const formData = new FormData();
  
    // Añadir datos del formulario a FormData
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
  
    // Generar una URL especial para el usuario
    const specialUrl = `http://localhost:3000/registro-nuevo-perfil`;
    formData.append("Crear perfil de usuario", specialUrl); // Añadimos la URL especial a FormData
  
    formData.append("access_key", "285d4c2e-2da7-44f5-8632-15a4707d41a5");
  
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
  
      const responseData = await response.json();
  
      if (responseData.success) {
        setResult("Form Submitted Successfully");
        reset(); // Resetea el formulario
        router.push("/acceso-fitness-app"); // Redirige al usuario al home principal
      } else {
        setResult(`Error: ${responseData.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult("An error occurred while submitting the form. Please try again.");
    }
  };

  // Observa los valores de los inputs
  const nombresValue = watch("nombres");
  const apellidosValue = watch("apellidos");
  const telefonoValue = watch("telefono");
  const emailValue = watch("email");

  return (
    <section className={styles.contHero}>
      <section className={styles.info}>
        <h2>
          Suscripción <span>mensual</span>
        </h2>
        <div className={styles.price}>
          <p>S/.100</p>
          <p>
            S/.120
            <span></span>
          </p>
        </div>
        <div className={styles.contImg}>
          <Image
            src="/images/image-subs-2.png"
            alt="logo-quesada"
            fill={true}
          />
          <span></span>
        </div>
      </section>
      <section className={styles.contForm}>
        <h3>Registra tus datos para confirmar la compra</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputCont}>
            <label>Nombres:</label>
            <input
              type="text"
              {...register("nombres", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, // Solo permite letras y espacios
                  message: "Solo se permiten letras",
                },
              })}
              placeholder="Escribir aqui..."
              className={
                errors.nombres || !nombresValue ? styles.invalid : styles.valid
              }
            />
            {errors.nombres && (
              <span className={styles.error}>{errors.nombres.message}</span>
            )}
          </div>
          <div className={styles.inputCont}>
            <label>Apellidos:</label>
            <input
              type="text"
              {...register("apellidos", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, // Solo permite letras y espacios
                  message: "Solo se permiten letras",
                },
              })}
              placeholder="Escribir aqui..."
              className={
                errors.apellidos || !apellidosValue
                  ? styles.invalid
                  : styles.valid
              }
            />
            {errors.apellidos && (
              <span className={styles.error}>{errors.apellidos.message}</span>
            )}
          </div>
          <div className={styles.inputCont}>
            <label>Nº Teléfono:</label>
            <input
              type="tel"
              {...register("telefono", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Solo se permiten números",
                },
              })}
              placeholder="Escribir aqui..."
              className={
                errors.telefono || !telefonoValue
                  ? styles.invalid
                  : styles.valid
              }
            />
            {errors.telefono && (
              <span className={styles.error}>{errors.telefono.message}</span>
            )}
          </div>
          <div className={styles.inputCont}>
            <label htmlFor="name">Email:</label>
            <input
              type="email"
              {...register("email", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email no es válido",
                },
              })}
              placeholder="Escribir aqui..."
              className={
                errors.email || !emailValue ? styles.invalid : styles.valid
              }
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              {...register("terms", {
                required: "Debes aceptar los términos y condiciones",
              })}
            />
            <label>Acepto los términos y condiciones</label>
          </div>
          {errors.terms && (
            <span className={styles.error}>{errors.terms.message}</span>
          )}

          <button type="submit" className={styles.btnSend}>
            Comprar suscripción
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
    </section>
  );
}
