"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./formAumentarNivel.module.css";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faChevronDown,
  faArrowUpRightDots,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "@/state/auth/auth-context";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import LoadingExtra from "@/components/loadingExtra/loadingNivel";
import Link from "next/link";

gsap.registerPlugin(ScrollToPlugin);

export default function FormAumentarNivel() {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm({ mode: "onChange" });
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [selectedNivel, setSelectedNivel] = useState("");
  const [selectedComidasXdia, setSelectedComidasXdia] = useState("");
  const [selectedObjetivoFisico, setSelectedObjetivoFisico] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    if (user === undefined) return;

    if (!user) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  const onSubmit = async (data) => {
    if (!user) return; // Verificar si hay usuario antes de continuar

    try {
      setLoadingForm(true); // Activar el loading

      // Crear un nuevo objeto de datos excluyendo los campos 'image', 'image1', 'image2'
      const { ...dataWithoutImages } = data;

      // Filtrar los campos vacíos
      const filteredData = Object.fromEntries(
        Object.entries(dataWithoutImages).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined
        )
      );

      // Agregar las URLs de las imágenes al objeto filtrado
      const formData = {
        ...filteredData,
        suscripcion: "activa",
        superUser: false,
      };

      // Guardar los datos en el documento del usuario en Firestore
      await setDoc(doc(db, "users", user.uid), formData, { merge: true });
      console.log("Datos guardados correctamente:", formData);

      // Resetear el formulario y limpiar las imágenes seleccionadas
      reset();
      localStorage.removeItem("userProfile");
      localStorage.removeItem("calculatedData");
      localStorage.removeItem("trainingData");
      localStorage.removeItem("alimentacionData");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    } finally {
      // Asegúrate de que el loading permanezca activo al menos 6 segundos
      const loadingDuration = 6000; // 6 segundos
      setTimeout(() => {
        setLoadingForm(false); // Desactivar el loading
        router.push("/perfil-coach-fitness-app"); // Redirigir al usuario
      }, loadingDuration);
    }
  };

  // Función para desplazarse a la pregunta específica usando GSAP
  const scrollToQuestion = (index) => {
    const questionElement = formRef.current.children[index];

    if (questionElement) {
      gsap.to(window, {
        duration: 0.5, // Duración de la animación en segundos
        scrollTo: { y: questionElement, offsetY: 10 }, // Ajusta offsetY si es necesario
        ease: "power2.out", // Curva de aceleración para un movimiento más suave
      });
    } else {
      console.warn("No se encontró el elemento para desplazarse:", index);
    }
  };

  const handleNext = () => {
    if (currentQuestion < formRef.current.children.length - 1) {
      setCurrentQuestion((prevQuestion) => {
        const nextQuestion = prevQuestion + 1;
        scrollToQuestion(nextQuestion);
        return nextQuestion;
      });
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => {
        const previousQuestion = prevQuestion - 1;
        scrollToQuestion(previousQuestion);
        return previousQuestion;
      });
    }
  };

  // Efecto para manejar la actualización de visibilidad y progreso con animación
  useEffect(() => {
    const totalQuestions = formRef.current?.children.length || 0;

    for (let i = 0; i < totalQuestions; i++) {
      const questionElement = formRef.current.children[i];
      if (i === currentQuestion) {
        gsap.fromTo(
          questionElement,
          { x: -100, autoAlpha: 0 }, // Comienza desde la derecha, oculto
          {
            duration: 0.5,
            x: 0, // Se mueve a su posición original
            autoAlpha: 1, // Se vuelve visible
            display: "flex",
            ease: "power2.out",
          }
        );
      } else {
        gsap.to(questionElement, {
          duration: 0.5,
          x: 100, // Se mueve hacia la izquierda
          autoAlpha: 0, // Se vuelve invisible
          onComplete: () => {
            questionElement.style.display = "none"; // Oculta el elemento después de la animación
          },
        });
      }
    }

    // Calcula y actualiza el progreso del formulario con precisión
    const calculateProgress = () => {
      const totalQuestions = formRef.current?.children.length || 1; // Asegúrate de que sea al menos 1
      const progressValue = (currentQuestion / totalQuestions) * 100;
      return progressValue;
    };

    setProgress(calculateProgress());
  }, [currentQuestion]);

  const handleNivelChange = (e) => {
    setSelectedNivel(e.target.value); // Actualiza el estado cuando se selecciona una opción
  };

  const handleComidasXdiaChange = (e) => {
    setSelectedComidasXdia(e.target.value); // Actualiza el estado cuando se selecciona una opción
  };

  const handleObjetivoFisicoChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedObjetivoFisico(selectedValue); // Actualiza el estado cuando se selecciona una opción
    // Habilita el botón si se ha seleccionado un coach
    if (selectedValue) {
      setIsSubmitEnabled(true);
    }
  };

  // Mostramos un mensaje de carga mientras verificamos el estado de autenticación
  if (loading) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formAumentar}>
      {loadingForm && <LoadingExtra />}
      <section className={styles.contBtns}>
        <section className={styles.contUser}>
          <FontAwesomeIcon
            icon={faArrowUpRightDots}
            size="2x"
            className={styles.iconTwo}
          />
          <h4>Aumentar nivel de<br/>rutina y dieta</h4>
          <h5>{user ? user.email : "Usuario no disponible"}l</h5>
        </section>
        <button
          type="button"
          onClick={handlePrev}
          style={{
            opacity: currentQuestion === 0 ? 0.0 : 1,
            cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
          }}
          disabled={currentQuestion === 0}
          className={styles.btnLeft}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            size="2x"
            className={styles.icon}
          />
        </button>
        {currentQuestion === formRef.current?.children.length - 1 ? (
          <button
            type="submit"
            className={`${styles.btnFin} ${
              isSubmitEnabled ? styles.active : styles.disabled
            }`}
            disabled={!isSubmitEnabled}
          >
            Crear plan
            <FontAwesomeIcon
              icon={faCircleCheck}
              size="2x"
              className={styles.icon}
            />
          </button>
        ) : (
          <>
            <div className={styles.progressContainer}>
              <div
                className={styles.progressBar}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <button
              type="button"
              onClick={handleNext}
              className={styles.btnRight}
            >
              <FontAwesomeIcon
                icon={faChevronDown}
                size="2x"
                className={styles.icon}
              />
            </button>
          </>
        )}
      </section>
      <section ref={formRef} className={styles.formContainer}>
        <div className={styles.question}>
          <section className={styles.title}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>Detalles físicos</h4>
          </section>
          <section className={styles.contForm}>
            <section className={styles.flexBox}>
              <div className={styles.itemInput}>
                <label>Peso (kg):</label>
                <input
                  type="text"
                  {...register("peso", {
                    required: "El peso es obligatorio",
                    pattern: {
                      value: /^\d+([.,]?\d+)?$/, // Permite números con punto o coma como separador decimal
                      message:
                        "Solo se permiten números y un separador decimal (punto o coma)*",
                    },
                  })}
                  placeholder="Escribir aqui..."
                  className={
                    touchedFields.peso
                      ? errors.peso
                        ? styles.invalid
                        : styles.valid
                      : ""
                  }
                />
                {errors.peso && (
                  <p className={styles.error}>{errors.peso.message}</p>
                )}
              </div>
              <div className={styles.itemInput}>
                <label>Edad:</label>
                <input
                  type="text"
                  {...register("edad", {
                    required: "El peso es obligatorio",
                    pattern: {
                      message:
                        "Solo se permiten números y un separador decimal (punto o coma)*",
                    },
                  })}
                  placeholder="Escribir aqui..."
                  className={
                    touchedFields.edad
                      ? errors.edad
                        ? styles.invalid
                        : styles.edad
                      : ""
                  }
                />
                {errors.edad && (
                  <p className={styles.error}>{errors.edad.message}</p>
                )}
              </div>
            </section>
          </section>
        </div>
        <div className={styles.question}>
          <section className={styles.title}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>Definir intensidad</h4>
          </section>
          <section className={styles.contForm}>
            <section className={styles.flexBoxEdad}>
              <label
                htmlFor="nivel1"
                className={`${styles.boxEdad} ${
                  selectedNivel === "iniciado" ? styles.valid : ""
                }`}
              >
                <input
                  type="radio"
                  hidden
                  id="nivel1"
                  value="iniciado"
                  {...register("nivel", {
                    required: "La edad es obligatoria",
                    onChange: handleNivelChange,
                  })}
                />
                <p>Iniciado 🤗</p>
              </label>
              <label
                htmlFor="nivel2"
                className={`${styles.boxEdad} ${
                  selectedNivel === "intermedio" ? styles.valid : ""
                }`}
              >
                <input
                  type="radio"
                  hidden
                  id="nivel2"
                  value="intermedio"
                  {...register("nivel", {
                    required: "La edad es obligatoria",
                    onChange: handleNivelChange,
                  })}
                />
                <p>Intermedio 😎</p>
              </label>
              <label
                htmlFor="nivel3"
                className={`${styles.boxEdad} ${
                  selectedNivel === "avanzado" ? styles.valid : ""
                }`}
              >
                <input
                  type="radio"
                  hidden
                  id="nivel3"
                  value="avanzado"
                  {...register("nivel", {
                    required: "La edad es obligatoria",
                    onChange: handleNivelChange,
                  })}
                />
                <p>Avanzado 💪🏼</p>
              </label>
            </section>
          </section>
        </div>
        <div className={styles.question}>
          <section className={styles.title}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>
              ¿Cuántas comidas sólidas al día prefieres hacer?
            </h4>
          </section>
          <section className={styles.contForm}>
            <section className={styles.flexBoxState}>
              <label
                htmlFor="comidasXdia1"
                className={`${styles.btnState} ${
                  selectedComidasXdia === "3xDia" ? styles.valid : ""
                }`}
              >
                <p>
                  3 veces <span>🍗</span>
                </p>
                <input
                  type="radio"
                  hidden
                  id="comidasXdia1"
                  {...register("comidasXdia", {
                    required: "La edad es obligatoria",
                    onChange: handleComidasXdiaChange,
                  })}
                  value="3xDia"
                />
              </label>
              <label
                htmlFor="comidasXdia2"
                className={`${styles.btnState} ${
                  selectedComidasXdia === "4xDia" ? styles.valid : ""
                }`}
              >
                <p>
                  4 veces <span>🍖</span>
                </p>
                <input
                  type="radio"
                  hidden
                  id="comidasXdia2"
                  {...register("comidasXdia", {
                    required: "La edad es obligatoria",
                    onChange: handleComidasXdiaChange,
                  })}
                  value="4xDia"
                />
              </label>
              <label
                htmlFor="comidasXdia3"
                className={`${styles.btnState} ${
                  selectedComidasXdia === "5xDia" ? styles.valid : ""
                }`}
              >
                <p>
                  5 veces <span>🥩</span>
                </p>
                <input
                  type="radio"
                  hidden
                  id="comidasXdia3"
                  {...register("comidasXdia", {
                    required: "La edad es obligatoria",
                    onChange: handleComidasXdiaChange,
                  })}
                  value="5xDia"
                />
              </label>
            </section>
            <section className={styles.message}>
              <p>
                *La cantidad de macros que necesitas consumir al día, se
                dividirá en las cantidades de comidas que prefieres hacer, el
                resultado siempre está garantizado.
              </p>
            </section>
          </section>
        </div>
        <div className={styles.question}>
          <section className={styles.title}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>
              ¿Cuál es tu objetivo físico ideal?
            </h4>
          </section>
          <section className={styles.contForm}>
            <section className={styles.flexBoxObjetivo}>
              <label
                htmlFor="objetivoFisico1"
                className={`${styles.itemObjetivo} ${
                  selectedObjetivoFisico === "definicion" ? styles.valid : ""
                }`}
              >
                <div className={styles.titleBox}>
                  <h4>Definición</h4>
                </div>
                <input
                  type="radio"
                  hidden
                  id="objetivoFisico1"
                  {...register("objetivoFisico", {
                    required: "El objetivo físico es obligatoria",
                    onChange: handleObjetivoFisicoChange,
                  })}
                  value="definicion"
                />
                <Image
                  src="/images/objetivo-1.jpg"
                  alt="objetivo-fisico"
                  fill={true}
                />
              </label>
              <label
                htmlFor="objetivoFisico2"
                className={`${styles.itemObjetivo} ${
                  selectedObjetivoFisico === "masaMuscular" ? styles.valid : ""
                }`}
              >
                <div className={styles.titleBox}>
                  <h4>Masa muscular</h4>
                </div>

                <input
                  type="radio"
                  hidden
                  id="objetivoFisico2"
                  {...register("objetivoFisico", {
                    required: "El objetivo físico es obligatoria",
                    onChange: handleObjetivoFisicoChange,
                  })}
                  value="masaMuscular"
                />
                <Image
                  src="/images/objetivo-2.jpg"
                  alt="objetivo-fisico"
                  fill={true}
                />
              </label>
              <label
                htmlFor="objetivoFisico3"
                className={`${styles.itemObjetivo} ${
                  selectedObjetivoFisico === "recomposicionCorporal"
                    ? styles.valid
                    : ""
                }`}
              >
                <div className={styles.titleBox}>
                  <h4>Recomposición corporal</h4>
                </div>
                <input
                  type="radio"
                  hidden
                  id="objetivoFisico3"
                  {...register("objetivoFisico", {
                    required: "El objetivo físico es obligatoria",
                    onChange: handleObjetivoFisicoChange,
                  })}
                  value="recomposicionCorporal"
                />
                <Image
                  src="/images/objetivo-3.jpg"
                  alt="objetivo-fisico"
                  fill={true}
                />
              </label>
            </section>
          </section>
        </div>
      </section>
    </form>
  );
}
