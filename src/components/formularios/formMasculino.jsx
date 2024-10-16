"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./form.module.css";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCamera,
  faTriangleExclamation,
  faXmark,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "@/state/auth/auth-context";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "../../../firebase-config";
import imageCompression from "browser-image-compression";

gsap.registerPlugin(ScrollToPlugin);

export default function FormMasculino() {
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
  const [training, setTraining] = useState(false);
  const [impedimento, setImpedimento] = useState(false);
  const [suplemento, setSuplemento] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAge, setSelectedAge] = useState("");

  useEffect(() => {
    if (user === undefined) return; // Asegúrate de que user esté definido

    if (!user) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    if (!user) return; // Verificar si hay usuario antes de continuar
    try {
      let imageUrl = "";

      if (selectedImage) {
        // Opciones para la compresión de la imagen
        const options = {
          maxSizeMB: 0.5, // Máximo tamaño de la imagen en MB (500 KB)
          maxWidthOrHeight: 1920, // Máxima dimensión de ancho o alto
          useWebWorker: true,
        };

        const compressedImage = await imageCompression(selectedImage, options); // Comprimir la imagen

        // Crear una referencia para almacenar la imagen en Firebase Storage
        const storageRef = ref(
          storage,
          `images/${user.uid}/${compressedImage.name}`
        );
        // Subir la imagen comprimida a Firebase Storage
        const snapshot = await uploadBytes(storageRef, compressedImage);
        // Obtener la URL pública de la imagen almacenada
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Crear un nuevo objeto de datos excluyendo el campo 'image'
      const { image, ...dataWithoutImage } = data; // Excluye el campo 'image'
      const formData = { ...dataWithoutImage, imageUrl }; // Agrega solo la URL de la imagen

      // Guardar los datos en el documento del usuario en Firestore
      await setDoc(doc(db, "users", user.uid), formData, { merge: true });
      console.log("Datos guardados correctamente:", formData);

      // Resetear el formulario y limpiar la imagen seleccionada
      reset(); // Resetea todos los campos del formulario
      setSelectedImage(null); // Limpia la imagen seleccionada
      setImagePreview(null); // Limpia la vista previa de la imagen
    } catch (error) {
      console.error("Error al guardar los datos:", error);
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

  const handleAgeChange = (e) => {
    setSelectedAge(e.target.value); // Actualiza el estado cuando se selecciona una opción
  };

  // Mostramos un mensaje de carga mientras verificamos el estado de autenticación
  if (loading) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formMasculino}>
      <section className={styles.contBtns}>
        <section className={styles.contUser}>
          <h4>{user ? user.email : "Usuario no disponible"}</h4>
          <h5>Nuevo perfil: Masculino</h5>
          <label htmlFor="image" className={styles.imgPerfil}>
            {imagePreview && ( // Renderizar la vista previa si existe
              <div className={styles.imagePreview}>
                <Image src={imagePreview} alt="Vista previa" fill={true} />
              </div>
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image", { required: true })}
              onChange={onImageChange}
              hidden
            />
            {errors.image && <p>La imagen es requerida</p>}
            <span>
              <FontAwesomeIcon
                icon={faCamera}
                size="2x"
                className={styles.icon}
              />
            </span>
            <p>
              Adjuntar
              <br />
              imagen
            </p>
          </label>
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
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, // Solo permite letras y espacios
                      message: "Solo se permiten letras*",
                    },
                  })}
                  placeholder="Escribir aqui..."
                  className={
                    touchedFields.name
                      ? errors.name
                        ? styles.invalid
                        : styles.valid
                      : ""
                  }
                />
                {errors.name && (
                  <p className={styles.error}>{errors.name.message}</p>
                )}
              </div>
              <div className={styles.itemInput}>
                <label>Apellidos:</label>
                <input
                  type="text"
                  {...register("lastName", {
                    required: "El nombre es obligatorio",
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, // Solo permite letras y espacios
                      message: "Solo se permiten letras*",
                    },
                  })}
                  placeholder="Escribir aqui..."
                  className={
                    touchedFields.lastName
                      ? errors.lastName
                        ? styles.invalid
                        : styles.valid
                      : ""
                  }
                />
                {errors.lastName && (
                  <p className={styles.error}>{errors.lastName.message}</p>
                )}
              </div>
            </section>
            <section className={styles.flexBox}>
              <div className={styles.itemInput}>
                <label>País:</label>
                <input
                  type="text"
                  placeholder="Escribir aqui..."
                  {...register("country", {
                    required: "El nombre es obligatorio",
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, // Solo permite letras y espacios
                      message: "Solo se permiten letras*",
                    },
                  })}
                  className={
                    touchedFields.country
                      ? errors.country
                        ? styles.invalid
                        : styles.valid
                      : ""
                  }
                />
                {errors.country && (
                  <p className={styles.error}>{errors.country.message}</p>
                )}
              </div>
              <div className={styles.itemInput}>
                <label>Ciudad:</label>
                <input
                  type="text"
                  placeholder="Escribir aqui..."
                  {...register("city", {
                    required: "El nombre es obligatorio",
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, // Solo permite letras y espacios
                      message: "Solo se permiten letras*",
                    },
                  })}
                  className={
                    touchedFields.city
                      ? errors.city
                        ? styles.invalid
                        : styles.valid
                      : ""
                  }
                />
                {errors.city && (
                  <p className={styles.error}>{errors.city.message}</p>
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
              <label
                htmlFor="edad1"
                className={`${styles.boxEdad} ${
                  selectedAge === "18-25" ? styles.valid : ""
                }`}
              >
                <input
                  type="radio"
                  hidden
                  id="edad1"
                  {...register("edad", {
                    required: "La edad es obligatoria",
                    onChange: handleAgeChange,
                  })}
                  value="18-25"
                />
                <p>18-25 años</p>
                <Image
                  src="/images/sujeto-4.png"
                  alt="sujeto-edad"
                  width={95}
                  height={110}
                />
              </label>
              <label
                htmlFor="edad2"
                className={`${styles.boxEdad} ${
                  selectedAge === "26-35" ? styles.valid : ""
                }`}
              >
                <input
                  type="radio"
                  hidden
                  id="edad2"
                  {...register("edad", {
                    required: "La edad es obligatoria",
                    onChange: handleAgeChange,
                  })}
                  value="26-35"
                />
                <p>26-35 años</p>
                <Image
                  src="/images/sujeto-2.png"
                  alt="sujeto-edad"
                  width={95}
                  height={110}
                />
              </label>
              <label
                htmlFor="edad3"
                className={`${styles.boxEdad} ${
                  selectedAge === "36-45" ? styles.valid : ""
                }`}
              >
                <input
                  type="radio"
                  hidden
                  id="edad3"
                  {...register("edad", {
                    required: "La edad es obligatoria",
                    onChange: handleAgeChange,
                  })}
                  value="36-45"
                />
                <p>36-45 años</p>
                <Image
                  src="/images/sujeto-3.png"
                  alt="sujeto-edad"
                  width={95}
                  height={110}
                />
              </label>
              <label
                htmlFor="edad4"
                className={`${styles.boxEdad} ${
                  selectedAge === "46-65" ? styles.valid : ""
                }`}
              >
                <input
                  type="radio"
                  hidden
                  id="edad4"
                  {...register("edad", {
                    required: "La edad es obligatoria",
                  })}
                  value="46-65"
                />
                <p>45-65 años</p>
                <Image
                  src="/images/sujeto-1.png"
                  alt="sujeto-edad"
                  width={95}
                  height={110}
                />
              </label>
              {errors.edad && (
                <p className={styles.error}>{errors.edad.message}</p>
              )}
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
              <label className={styles.boxEdad}>
                <input
                  type="radio"
                  hidden
                  id="tipoCuerpo1"
                  value="ectomorfo"
                />
                <p>Ectomorfo</p>
                <Image
                  src="/images/body-1.png"
                  alt="sujeto-edad"
                  width={80}
                  height={120}
                />
              </label>
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
