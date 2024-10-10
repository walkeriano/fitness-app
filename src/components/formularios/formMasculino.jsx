"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import styles from "./form.module.css";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCamera,
  faTriangleExclamation,
  faXmark,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "@/state/auth/auth-context";

export default function FormMasculino() {
  const { register: registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const formRef = useRef(null);
  const [training, setTraining] = useState(false);
  const [impedimento, setImpedimento] = useState(false);
  const [suplemento, setSuplemento] = useState(false);

  const scrollToQuestion = (index) => {
    const questionElement = formRef.current.children[index];
    questionElement.scrollIntoView({
      behavior: "smooth",
      flex: "flex",
    });
  };

  const handleNext = () => {
    if (currentQuestion < formRef.current.children.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      scrollToQuestion(currentQuestion + 1);
    }
    console.log("next");
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      scrollToQuestion(currentQuestion - 1);
    }
    console.log("prev");
  };

  const updateVisibility = useCallback(() => {
    const totalQuestions = formRef.current?.children.length || 0;

    for (let i = 0; i < totalQuestions; i++) {
      const questionElement = formRef.current.children[i];
      if (i === currentQuestion) {
        questionElement.style.display = "flex"; // Mostrar solo la pregunta actual
      } else {
        questionElement.style.display = "none"; // Ocultar las preguntas que no están visibles
      }
    }
  }, [currentQuestion]);

  useEffect(() => {
    updateVisibility();
    const calculateProgress = () => {
      const totalQuestions = formRef.current?.children.length || 1;
      return (currentQuestion / (totalQuestions - 1)) * 100;
    };

    setProgress(calculateProgress());
  }, [currentQuestion, updateVisibility]);

  const onSubmit = async (data) => {
    setErrorMessage("");
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        name: data.name,
        lastName: data.lastName,
        country: data.country,
        city: data.city,
        createdAt: new Date(),
      });
      console.log("Registro exitoso");
      router.push("/perfil-coach-fitness-app");
    } catch (err) {
      const error = handleFirebaseError(err);
      setErrorMessage(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formMasculino}>
      <section className={styles.contBtns}>
        <button
          type="button"
          onClick={handlePrev}
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
          <button type="submit" className={styles.btnFin}>
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
            <h4 className={styles.firstitle}>Crea tus credenciales</h4>
          </section>
          <section className={styles.contForm}>
            <section className={styles.flexBox}>
              <div className={styles.itemInput}>
                <label htmlFor="name">Email:</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "El email es obligatorio",
                  })}
                  placeholder="Escribir aqui..."
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className={styles.itemInput}>
                <label htmlFor="name">Contraseña:</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                  placeholder="Escribir aqui..."
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>
            </section>
          </section>
        </div>
        <div className={styles.question}>
          <section className={styles.title}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>Datos informativos</h4>
          </section>
          <section className={styles.contForm}>
            <section className={styles.flexBox}>
              <div className={styles.itemInput}>
                <label>Nombres:</label>
                <input
                  type="text"
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                  placeholder="Escribir aqui..."
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>
              <div className={styles.itemInput}>
                <label>Apellidos:</label>
                <input
                  type="text"
                  {...register("lastName", {
                    required: "El nombre es obligatorio",
                  })}
                  placeholder="Escribir aqui..."
                />
              </div>
              {errors.lastName && (
                <p style={{ color: "red" }}>{errors.lastName.message}</p>
              )}
            </section>
            <section className={styles.flexBox}>
              <div className={styles.itemInput}>
                <label>País:</label>
                <input
                  type="text"
                  placeholder="Escribir aqui..."
                  {...register("country", {
                    required: "El nombre es obligatorio",
                  })}
                />
                {errors.country && (
                  <p style={{ color: "red" }}>{errors.country.message}</p>
                )}
              </div>
              <div className={styles.itemInput}>
                <label>Ciudad:</label>
                <input
                  type="text"
                  placeholder="Escribir aqui..."
                  {...register("city", {
                    required: "El nombre es obligatorio",
                  })}
                />
                {errors.city && (
                  <p style={{ color: "red" }}>{errors.city.message}</p>
                )}
              </div>
            </section>
          </section>
        </div>
        <div className={styles.question}>
          <section className={styles.title}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>¿Cuál es tu Edad?</h4>
          </section>
          <section className={styles.contForm}>
            <section className={styles.flexBoxEdad}>
              <div className={styles.boxEdad}>
                <p>18-25 años</p>
                <Image
                  src="/images/sujeto-4.png"
                  alt="sujeto-edad"
                  width={95}
                  height={110}
                />
              </div>
              <div className={styles.boxEdad}>
                <p>25-35 años</p>
                <Image
                  src="/images/sujeto-2.png"
                  alt="sujeto-edad"
                  width={95}
                  height={110}
                />
              </div>
              <div className={styles.boxEdad}>
                <p>35-45 años</p>
                <Image
                  src="/images/sujeto-3.png"
                  alt="sujeto-edad"
                  width={95}
                  height={110}
                />
              </div>
              <div className={styles.boxEdad}>
                <p>45-65 años</p>
                <Image
                  src="/images/sujeto-1.png"
                  alt="sujeto-edad"
                  width={95}
                  height={110}
                />
              </div>
            </section>
          </section>
        </div>
        <div className={styles.question}>
          <section className={styles.title}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>Tipo de cuerpo</h4>
          </section>
          <section className={styles.contForm}>
            <section className={styles.flexBoxEdad}>
              <div className={styles.boxEdad}>
                <p>Ectomorfo</p>
                <Image
                  src="/images/body-1.png"
                  alt="sujeto-edad"
                  width={80}
                  height={120}
                />
              </div>
              <div className={styles.boxEdad}>
                <p>Mesomorfo</p>
                <Image
                  src="/images/body-2.png"
                  alt="sujeto-edad"
                  width={80}
                  height={120}
                />
              </div>
              <div className={styles.boxEdad}>
                <p>Endomorfo</p>
                <Image
                  src="/images/body-3.png"
                  alt="sujeto-edad"
                  width={80}
                  height={120}
                />
              </div>
            </section>
          </section>
        </div>
        <div className={styles.question}>
          <section className={styles.title}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>Estado físico actual</h4>
          </section>
          <section className={styles.contForm}>
            <section className={styles.flexBoxAdjuntar}>
              <div className={styles.itemAdjuntar}>
                <h3>Frontal</h3>
                <h4>Formato 1º</h4>
                <label>
                  <div className={styles.iconCam}>
                    <FontAwesomeIcon
                      icon={faCamera}
                      size="2x"
                      className={styles.icon}
                    />
                  </div>
                  <div className={styles.bgItem}>
                    <span></span>
                    <span></span>
                    <Image
                      src="/images/icons/silueta-03.svg"
                      alt="silueta"
                      fill={true}
                    />
                  </div>
                  <input type="file" hidden />
                </label>
                <div className={styles.notification}>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    size="2x"
                    className={styles.icon}
                  />
                  <p>Campo vacío</p>
                </div>
              </div>
              <div className={styles.itemAdjuntar}>
                <h3>Perfil</h3>
                <h4>Formato 2º</h4>
                <label>
                  <div className={styles.iconCam}>
                    <FontAwesomeIcon
                      icon={faCamera}
                      size="2x"
                      className={styles.icon}
                    />
                  </div>
                  <div className={styles.bgItem}>
                    <span></span>
                    <span></span>
                    <Image
                      src="/images/icons/silueta-02.svg"
                      alt="silueta"
                      fill={true}
                    />
                  </div>
                  <input type="file" hidden />
                </label>
                <div className={styles.notification}>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    size="2x"
                    className={styles.icon}
                  />
                  <p>Campo vacío</p>
                </div>
              </div>
              <div className={styles.itemAdjuntar}>
                <h3>Espalda</h3>
                <h4>Formato 3º</h4>
                <label>
                  <div className={styles.iconCam}>
                    <FontAwesomeIcon
                      icon={faCamera}
                      size="2x"
                      className={styles.icon}
                    />
                  </div>
                  <div className={styles.bgItem}>
                    <span></span>
                    <span></span>
                    <Image
                      src="/images/icons/silueta-04.svg"
                      alt="silueta"
                      fill={true}
                    />
                  </div>
                  <input type="file" hidden />
                </label>
                <div className={styles.notification}>
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                    size="2x"
                    className={styles.icon}
                  />
                  <p>Campo vacío</p>
                </div>
              </div>
            </section>
          </section>
        </div>
        <div className={styles.question}>
          <section className={styles.title}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>Detalles físicos</h4>
          </section>
          <section className={styles.contForm}>
            <section className={styles.flexBox}>
              <div className={styles.itemInput}>
                <label>Estatura (mts):</label>
                <input type="text" placeholder="Escribir aqui..." />
              </div>
              <div className={styles.itemInput}>
                <label>Peso (kg):</label>
                <input type="text" placeholder="Escribir aqui..." />
              </div>
            </section>
          </section>
        </div>
        <div className={styles.question}>
          <section className={styles.title}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>¿Entrenas actualmente?</h4>
          </section>
          <section className={styles.contForm}>
            <section className={styles.flexBoxState}>
              <div
                className={styles.btnState}
                onClick={() => setTraining(true)}
              >
                <p>
                  Claro que si! <span>💪🏼</span>
                </p>
              </div>
              {training && (
                <section className={styles.showInputs}>
                  <section className={styles.boxItem}>
                    <div className={styles.contInp}>
                      <label>¿Desde hace cuanto tiempo?:</label>
                      <input type="text" placeholder="Escribir aqui..." />
                    </div>
                    <button
                      className={styles.cerrar}
                      onClick={() => setTraining(false)}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        size="2x"
                        className={styles.icon}
                      />
                    </button>
                  </section>
                  <section className={styles.boxItem}>
                    <div className={styles.contInp}>
                      <label>¿Cuántas veces a la semana?</label>
                      <input type="text" placeholder="Escribir aqui..." />
                    </div>
                    <button
                      className={styles.cerrar}
                      onClick={() => setTraining(false)}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        size="2x"
                        className={styles.icon}
                      />
                    </button>
                  </section>
                </section>
              )}
              <label htmlFor="" className={styles.btnState}>
                <p>
                  Todavia no <span>⛔️</span>
                </p>
                <input type="radio" hidden />
              </label>
            </section>
          </section>
        </div>
        <div className={styles.question}>
          <section className={styles.title}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>
              ¿Tienes algún impedimento físico?
            </h4>
          </section>
          <section className={styles.contForm}>
            <section className={styles.flexBoxState}>
              <div
                className={styles.btnState}
                onClick={() => setImpedimento(true)}
              >
                <p>
                  Si tengo <span>😰</span>
                </p>
              </div>
              {impedimento && (
                <section className={styles.showInputs}>
                  <section className={styles.boxItem}>
                    <div className={styles.contInp}>
                      <label>Especificar limitación física:</label>
                      <input type="text" placeholder="Escribir aqui..." />
                    </div>
                    <button
                      className={styles.cerrar}
                      onClick={() => setImpedimento(false)}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        size="2x"
                        className={styles.icon}
                      />
                    </button>
                  </section>
                </section>
              )}
              <label className={styles.btnState}>
                <p>
                  No ninguno <span>🙌🏻</span>
                </p>
                <input type="radio" hidden />
              </label>
            </section>
          </section>
        </div>
        <div className={styles.question}>
          <section className={styles.title}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>¿Consumes algún suplemento?</h4>
          </section>
          <section className={styles.contForm}>
            <section className={styles.flexBoxState}>
              <div
                className={styles.btnState}
                onClick={() => setSuplemento(true)}
              >
                <p>
                  Claro que si! <span>😎</span>
                </p>
              </div>
              {suplemento && (
                <section className={styles.showInputs}>
                  <section className={styles.boxItem}>
                    <div className={styles.contInp}>
                      <label>Especificar cuál:</label>
                      <input type="text" placeholder="Escribir aqui..." />
                    </div>
                    <button
                      className={styles.cerrar}
                      onClick={() => setSuplemento(false)}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        size="2x"
                        className={styles.icon}
                      />
                    </button>
                  </section>
                </section>
              )}
              <label className={styles.btnState}>
                <p>
                  No aún no <span>😜</span>
                </p>
                <input type="radio" hidden />
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
              <label className={styles.btnState}>
                <p>
                  3 veces <span>🍗</span>
                </p>
                <input type="radio" hidden />
              </label>
              <label className={styles.btnState}>
                <p>
                  4 veces <span>🍖</span>
                </p>
                <input type="radio" hidden />
              </label>
              <label className={styles.btnState}>
                <p>
                  5 veces <span>🥩</span>
                </p>
                <input type="radio" hidden />
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
              <label className={styles.itemObjetivo}>
                <div className={styles.titleBox}>
                  <h4>Definición</h4>
                  <span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      size="2x"
                      className={styles.icon}
                    />
                  </span>
                </div>

                <input type="radio" hidden />
                <Image
                  src="/images/objetivo-1.jpg"
                  alt="objetivo-fisico"
                  fill={true}
                />
              </label>
              <label className={styles.itemObjetivo}>
                <div className={styles.titleBox}>
                  <h4>Masa muscular</h4>
                  <span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      size="2x"
                      className={styles.icon}
                    />
                  </span>
                </div>

                <input type="radio" hidden />
                <Image
                  src="/images/objetivo-2.jpg"
                  alt="objetivo-fisico"
                  fill={true}
                />
              </label>
              <label className={styles.itemObjetivo}>
                <div className={styles.titleBox}>
                  <h4>Recomposición corporal</h4>
                  <span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      size="2x"
                      className={styles.icon}
                    />
                  </span>
                </div>
                <input type="radio" hidden />
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
