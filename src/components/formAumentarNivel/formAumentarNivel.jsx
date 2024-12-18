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
    if (!user) return; 

    try {
      setLoadingForm(true); 

      
      const { ...dataWithoutImages } = data;

      
      const filteredData = Object.fromEntries(
        Object.entries(dataWithoutImages).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined
        )
      );

      
      const formData = {
        ...filteredData,
        suscripcion: "activa",
        superUser: false,
      };


      await setDoc(doc(db, "users", user.uid), formData, { merge: true });
      console.log("Datos guardados correctamente:", formData);


      reset();
      localStorage.removeItem("userProfile");
      localStorage.removeItem("calculatedData");
      localStorage.removeItem("trainingData");
      localStorage.removeItem("alimentacionData");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    } finally {
      
      const loadingDuration = 6000;
      setTimeout(() => {
        setLoadingForm(false); 
        router.push("/perfil-coach-fitness-app");
      }, loadingDuration);
    }
  };

  
  const scrollToQuestion = (index) => {
    const questionElement = formRef.current.children[index];

    if (questionElement) {
      gsap.to(window, {
        duration: 0.5, 
        scrollTo: { y: questionElement, offsetY: 10 }, 
        ease: "power2.out", 
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

  useEffect(() => {
    const totalQuestions = formRef.current?.children.length || 0;

    for (let i = 0; i < totalQuestions; i++) {
      const questionElement = formRef.current.children[i];
      if (i === currentQuestion) {
        gsap.fromTo(
          questionElement,
          { x: -100, autoAlpha: 0 }, 
          {
            duration: 0.5,
            x: 0, 
            autoAlpha: 1, 
            display: "flex",
            ease: "power2.out",
          }
        );
      } else {
        gsap.to(questionElement, {
          duration: 0.5,
          x: 100, 
          autoAlpha: 0, 
          onComplete: () => {
            questionElement.style.display = "none";
          },
        });
      }
    }

    const calculateProgress = () => {
      const totalQuestions = formRef.current?.children.length || 1; 
      const progressValue = (currentQuestion / totalQuestions) * 100;
      return progressValue;
    };

    setProgress(calculateProgress());
  }, [currentQuestion]);

  const handleNivelChange = (e) => {
    setSelectedNivel(e.target.value); 
  };

  const handleComidasXdiaChange = (e) => {
    setSelectedComidasXdia(e.target.value); 
  };

  const handleObjetivoFisicoChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedObjetivoFisico(selectedValue); 
    
    if (selectedValue) {
      setIsSubmitEnabled(true);
    }
  };

  
  if (loading) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formAumentar}>
      <Link href="/perfil-coach-fitness-app" className={styles.backside}>
        Volver
      </Link>
      {loadingForm && <LoadingExtra />}
      <section className={styles.contBtnsAumentar}>
        <section className={styles.contUserAumentar}>
          <FontAwesomeIcon
            icon={faArrowUpRightDots}
            size="2x"
            className={styles.iconTwoAumentar}
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
            Aumentar
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
      <section ref={formRef} className={styles.formContainerAumentar}>
        <div className={styles.questionAumentar}>
          <section className={styles.titleAumentar}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>Detalles físicos</h4>
          </section>
          <section className={styles.contFormAumentar}>
            <section className={styles.flexBoxAumentar}>
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
        <div className={styles.questionAumentar}>
          <section className={styles.titleAumentar}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>Definir intensidad</h4>
          </section>
          <section className={styles.contFormAumentar}>
            <section className={styles.flexBoxEdadAumentar}>
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
        <div className={styles.questionAumentar}>
          <section className={styles.titleAumentar}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>
              ¿Cuántas comidas sólidas al día prefieres hacer?
            </h4>
          </section>
          <section className={styles.contFormAumentar}>
            <section className={styles.flexBoxStateAumentar}>
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
        <div className={styles.questionAumentar}>
          <section className={styles.titleAumentar}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>
              ¿Cuál es tu objetivo físico ideal?
            </h4>
          </section>
          <section className={styles.contFormAumentar}>
            <section className={styles.flexBoxObjetivoAumentar}>
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
