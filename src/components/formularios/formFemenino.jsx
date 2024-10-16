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
  faXmark,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import AuthContext from "@/state/auth/auth-context";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "../../../firebase-config";
import imageCompression from "browser-image-compression";
import LoadingExtra from "@/components/loadingExtra/loadingForm";

gsap.registerPlugin(ScrollToPlugin);

export default function FormFemenino() {
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
  const [training, setTraining] = useState(false);
  const [impedimento, setImpedimento] = useState(false);
  const [suplemento, setSuplemento] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [imagePreview1, setImagePreview1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [imagePreview2, setImagePreview2] = useState(null);
  const [selectedImage3, setSelectedImage3] = useState(null);
  const [imagePreview3, setImagePreview3] = useState(null);
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedComidasXdia, setSelectedComidasXdia] = useState("");
  const [selectedObjetivoFisico, setSelectedObjetivoFisico] = useState("");
  const [selectedCoach, setSelectedCoach] = useState("");
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [selectedBody, setSelectedBody] = useState("");
  const [selectedTraining, setSelectedTraining] = useState(false);
  const [selectedImpedimento, setSelectedImpedimento] = useState(false);
  const [selectedSuplementos, setSelectedSuplementos] = useState(false);

  useEffect(() => {
    if (user === undefined) return;

    if (!user) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  const onImageChange = (e, imageIndex) => {
    const file = e.target.files[0];
    if (file) {
      if (imageIndex === 1) {
        setSelectedImage1(file);
        setImagePreview1(URL.createObjectURL(file));
      } else if (imageIndex === 2) {
        setSelectedImage2(file);
        setImagePreview2(URL.createObjectURL(file));
      } else if (imageIndex === 3) {
        setSelectedImage3(file);
        setImagePreview3(URL.createObjectURL(file));
      } else {
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const onSubmit = async (data) => {
    if (!user) return; // Verificar si hay usuario antes de continuar

    try {
      setLoadingForm(true); // Activar el loading
      let imageUrl = "";
      let imageUrl1 = "";
      let imageUrl2 = "";
      let imageUrl3 = "";

      // Comprimir y subir la primera imagen
      if (selectedImage) {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedImage = await imageCompression(selectedImage, options);
        const storageRef = ref(
          storage,
          `images/${user.uid}/${compressedImage.name}`
        );
        const snapshot = await uploadBytes(storageRef, compressedImage);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Comprimir y subir la segunda imagen
      if (selectedImage1) {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedImage1 = await imageCompression(
          selectedImage1,
          options
        );
        const storageRef1 = ref(
          storage,
          `images/${user.uid}/${compressedImage1.name}`
        );
        const snapshot1 = await uploadBytes(storageRef1, compressedImage1);
        imageUrl1 = await getDownloadURL(snapshot1.ref);
      }

      // Comprimir y subir la tercera imagen
      if (selectedImage2) {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedImage2 = await imageCompression(
          selectedImage2,
          options
        );
        const storageRef2 = ref(
          storage,
          `images/${user.uid}/${compressedImage2.name}`
        );
        const snapshot2 = await uploadBytes(storageRef2, compressedImage2);
        imageUrl2 = await getDownloadURL(snapshot2.ref);
      }

      // Comprimir y subir la cuarta imagen
      if (selectedImage3) {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedImage3 = await imageCompression(
          selectedImage3,
          options
        );
        const storageRef3 = ref(
          storage,
          `images/${user.uid}/${compressedImage3.name}`
        );
        const snapshot3 = await uploadBytes(storageRef3, compressedImage3);
        imageUrl3 = await getDownloadURL(snapshot3.ref);
      }

      // Crear un nuevo objeto de datos excluyendo los campos 'image', 'image1', 'image2'
      const { image, image1, image2, image3, ...dataWithoutImages } = data;

      // Filtrar los campos vacíos
      const filteredData = Object.fromEntries(
        Object.entries(dataWithoutImages).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined
        )
      );

      // Agregar las URLs de las imágenes al objeto filtrado
      const formData = {
        ...filteredData,
        imageUrl,
        imageUrl1,
        imageUrl2,
        imageUrl3,
      };

      // Guardar los datos en el documento del usuario en Firestore
      await setDoc(doc(db, "users", user.uid), formData, { merge: true });
      console.log("Datos guardados correctamente:", formData);

      // Resetear el formulario y limpiar las imágenes seleccionadas
      reset();
      setSelectedImage(null);
      setImagePreview(null);
      setSelectedImage1(null);
      setImagePreview1(null);
      setSelectedImage2(null);
      setImagePreview2(null);
      setSelectedImage3(null);
      setImagePreview3(null);
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

  const handleAgeChange = (e) => {
    setSelectedAge(e.target.value); // Actualiza el estado cuando se selecciona una opción
  };

  const handleComidasXdiaChange = (e) => {
    setSelectedComidasXdia(e.target.value); // Actualiza el estado cuando se selecciona una opción
  };

  const handleObjetivoFisicoChange = (e) => {
    setSelectedObjetivoFisico(e.target.value); // Actualiza el estado cuando se selecciona una opción
  };

  const handleCoachChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCoach(selectedValue);

    // Habilita el botón si se ha seleccionado un coach
    if (selectedValue) {
      setIsSubmitEnabled(true);
    }
  };

  const handleBodyChange = (e) => {
    setSelectedBody(e.target.value); // Actualiza el estado cuando se selecciona una opción
  };

  const handleTrainingChange = (e) => {
    setSelectedTraining(e.target.checked); // Actualiza el estado cuando se selecciona una opción
  };

  const handleImpedimentoChange = (e) => {
    setSelectedImpedimento(e.target.checked); // Actualiza el estado cuando se selecciona una opción
  };

  const handleSuplementosChange = (e) => {
    setSelectedSuplementos(e.target.checked); // Actualiza el estado cuando se selecciona una opción
  };

  // Mostramos un mensaje de carga mientras verificamos el estado de autenticación
  if (loading) {
    return <p>Cargando información del usuario...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formMasculino}>
      {loadingForm && <LoadingExtra />}
      <section className={styles.contBtns}>
        <section className={styles.contUser}>
          <h4>{user ? user.email : "Usuario no disponible"}</h4>
          <h5>Nuevo perfil: Femenino</h5>
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
          {errors.image && <p>La imagen es requerida</p>}
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
                  src="/images/sujeto-2-fem.png"
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
                  src="/images/sujeto-4-fem.png"
                  alt="sujeto-edad"
                  width={105}
                  height={120}
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
                  src="/images/sujeto-3-fem.png"
                  alt="sujeto-edad"
                  width={105}
                  height={115}
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
                  src="/images/sujeto-1-fem.png"
                  alt="sujeto-edad"
                  width={100}
                  height={120}
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
              <label
                htmlFor="body1"
                className={`${styles.boxEdad} ${
                  selectedBody === "ectomorfo" ? styles.valid : ""
                }`}
              >
                <input
                  type="radio"
                  hidden
                  id="body1"
                  value="ectomorfo"
                  {...register("body", {
                    required: "La edad es obligatoria",
                    onChange: handleBodyChange,
                  })}
                />
                <p>Ectomorfo</p>
                <Image
                  src="/images/body-1-fem.png"
                  alt="sujeto-edad"
                  width={80}
                  height={120}
                />
              </label>
              <label
                htmlFor="body2"
                className={`${styles.boxEdad} ${
                  selectedBody === "mesomorfo" ? styles.valid : ""
                }`}
              >
                <input
                  type="radio"
                  hidden
                  id="body2"
                  value="mesomorfo"
                  {...register("body", {
                    required: "La edad es obligatoria",
                    onChange: handleBodyChange,
                  })}
                />
                <p>Mesomorfo</p>
                <Image
                  src="/images/body-2-fem.png"
                  alt="sujeto-edad"
                  width={80}
                  height={130}
                />
              </label>
              <label
                htmlFor="body3"
                className={`${styles.boxEdad} ${
                  selectedBody === "endomorfo" ? styles.valid : ""
                }`}
              >
                <input
                  type="radio"
                  hidden
                  id="body3"
                  value="endomorfo"
                  {...register("body", {
                    required: "La edad es obligatoria",
                    onChange: handleBodyChange,
                  })}
                />
                <p>Endomorfo</p>
                <Image
                  src="/images/body-3-fem.png"
                  alt="sujeto-edad"
                  width={85}
                  height={130}
                />
              </label>
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
                <h3>Foto Frontal</h3>
                <h4>Formato 1º</h4>
                <label htmlFor="image1">
                  {imagePreview1 && (
                    <div className={styles.imagePreviewFirst}>
                      <Image
                        src={imagePreview1}
                        alt="Vista previa 1"
                        fill={true}
                      />
                    </div>
                  )}
                  <div className={styles.iconCam}>
                    <FontAwesomeIcon
                      icon={faCamera}
                      size="2x"
                      className={styles.icon}
                    />
                  </div>
                  <p className={styles.textAdj}>Adjuntar aqui</p>
                  <div className={styles.bgItem}>
                    <span></span>
                    <span></span>
                    <Image
                      src="/images/icons/silueta-03.svg"
                      alt="silueta"
                      fill={true}
                    />
                  </div>
                  <input
                    type="file"
                    id="image1"
                    accept="image/*"
                    {...register("image1", { required: true })}
                    onChange={(e) => onImageChange(e, 1)}
                    hidden
                  />
                </label>
                {errors.image1 && (
                  <p className={styles.error}>La imagen 1 es requerida</p>
                )}
              </div>
              <div className={styles.itemAdjuntar}>
                <h3>Foto Perfil</h3>
                <h4>Formato 2º</h4>
                <label htmlFor="image2">
                  {imagePreview2 && (
                    <div className={styles.imagePreviewFirst}>
                      <Image
                        src={imagePreview2}
                        alt="Vista previa 1"
                        fill={true}
                      />
                    </div>
                  )}
                  <div className={styles.iconCam}>
                    <FontAwesomeIcon
                      icon={faCamera}
                      size="2x"
                      className={styles.icon}
                    />
                  </div>
                  <p className={styles.textAdj}>Adjuntar aqui</p>
                  <div className={styles.bgItem}>
                    <span></span>
                    <span></span>
                    <Image
                      src="/images/icons/silueta-02.svg"
                      alt="silueta"
                      fill={true}
                    />
                  </div>
                  <input
                    type="file"
                    id="image2"
                    accept="image/*"
                    {...register("image2", { required: true })}
                    onChange={(e) => onImageChange(e, 2)}
                    hidden
                  />
                </label>
                {errors.image2 && (
                  <p className={styles.error}>La imagen 2 es requerida</p>
                )}
              </div>
              <div className={styles.itemAdjuntar}>
                <h3>Foto Espalda</h3>
                <h4>Formato 3º</h4>
                <label htmlFor="image3">
                  {imagePreview3 && (
                    <div className={styles.imagePreviewFirst}>
                      <Image
                        src={imagePreview3}
                        alt="Vista previa 1"
                        fill={true}
                      />
                    </div>
                  )}
                  <div className={styles.iconCam}>
                    <FontAwesomeIcon
                      icon={faCamera}
                      size="2x"
                      className={styles.icon}
                    />
                  </div>
                  <p className={styles.textAdj}>Adjuntar aqui</p>
                  <div className={styles.bgItem}>
                    <span></span>
                    <span></span>
                    <Image
                      src="/images/icons/silueta-04.svg"
                      alt="silueta"
                      fill={true}
                    />
                  </div>
                  <input
                    type="file"
                    id="image3"
                    accept="image/*"
                    {...register("image3", { required: true })}
                    onChange={(e) => onImageChange(e, 3)}
                    hidden
                  />
                </label>
                {errors.image3 && (
                  <p className={styles.error}>La imagen 3 es requerida</p>
                )}
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
                <input
                  type="text"
                  {...register("estatura", {
                    required: "La estatura es obligatoria",
                    pattern: {
                      value: /^\d+([.,]?\d+)?$/, // Permite números con punto o coma como separador decimal
                      message:
                        "Solo se permiten números y un separador decimal (punto o coma)*",
                    },
                  })}
                  placeholder="Escribir aqui..."
                  className={
                    touchedFields.estatura
                      ? errors.estatura
                        ? styles.invalid
                        : styles.valid
                      : ""
                  }
                />
                {errors.estatura && (
                  <p className={styles.error}>{errors.estatura.message}</p>
                )}
              </div>
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
                      <input
                        type="text"
                        placeholder="Escribir aqui..."
                        {...register("tiempoEntrenando")}
                        className={
                          touchedFields.tiempoEntrenando
                            ? errors.tiempoEntrenando
                              ? styles.invalid
                              : styles.valid
                            : ""
                        }
                      />
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
                      <input
                        type="text"
                        placeholder="Escribir aqui..."
                        {...register("vecesXsemana")}
                        className={
                          touchedFields.vecesXsemana
                            ? errors.vecesXsemana
                              ? styles.invalid
                              : styles.valid
                            : ""
                        }
                      />
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
              <label
                htmlFor="experiencia"
                className={`${styles.btnState} ${
                  selectedTraining ? styles.valid : ""
                }`}
              >
                <p>
                  Todavia no <span>⛔️</span>
                </p>
                <input
                  type="checkbox"
                  hidden
                  id="experiencia"
                  {...register("experiencia", {
                    onChange: handleTrainingChange,
                  })}
                  checked={selectedTraining}
                />
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
                      <input
                        type="text"
                        placeholder="Escribir aqui..."
                        {...register("lesionesFisicas")}
                        className={
                          touchedFields.lesionesFisicas
                            ? errors.lesionesFisicas
                              ? styles.invalid
                              : styles.valid
                            : ""
                        }
                      />
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
              <label
                htmlFor="impedimento"
                className={`${styles.btnState} ${
                  selectedImpedimento ? styles.valid : ""
                }`}
              >
                <p>
                  No ninguno <span>🙌🏻</span>
                </p>
                <input
                  type="checkbox"
                  hidden
                  id="impedimento"
                  {...register("impedimentoFisico", {
                    onChange: handleImpedimentoChange,
                  })}
                  checked={selectedImpedimento}
                />
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
                      <input
                        type="text"
                        placeholder="Escribir aqui..."
                        {...register("conSuplementos")}
                        className={
                          touchedFields.conSuplementos
                            ? errors.conSuplementos
                              ? styles.invalid
                              : styles.valid
                            : ""
                        }
                      />
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
              <label
                htmlFor="sinSuplementos"
                className={`${styles.btnState} ${
                  selectedSuplementos ? styles.valid : ""
                }`}
              >
                <p>
                  No aún no <span>😜</span>
                </p>
                <input
                  type="checkbox"
                  hidden
                  id="sinSuplementos"
                  {...register("sinSuplementos", {
                    onChange: handleSuplementosChange,
                  })}
                  checked={selectedSuplementos}
                />
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
                  src="/images/objetivo-1-fem.jpg"
                  alt="objetivo-fisico"
                  fill={true}
                />
              </label>
              <label
                htmlFor="objetivoFisico2"
                className={`${styles.itemObjetivo} ${
                  selectedObjetivoFisico === "masa muscular" ? styles.valid : ""
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
                  value="masa muscular"
                />
                <Image
                  src="/images/objetivo-2-fem.jpg"
                  alt="objetivo-fisico"
                  fill={true}
                />
              </label>
              <label
                htmlFor="objetivoFisico3"
                className={`${styles.itemObjetivo} ${
                  selectedObjetivoFisico === "recomposicion corporal"
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
                  value="recomposicion corporal"
                />
                <Image
                  src="/images/objetivo-3-fem.jpg"
                  alt="objetivo-fisico"
                  fill={true}
                />
              </label>
            </section>
          </section>
        </div>
        <div className={styles.question}>
          <section className={styles.title}>
            <p className={styles.subtitle}>Personaliza el plan ideal para ti</p>
            <h4 className={styles.firstitle}>
              Selecciona el coach de preferencia
            </h4>
          </section>
          <section className={styles.contForm}>
            <section className={styles.flexBoxObjetivo}>
              <label
                htmlFor="coach1"
                className={`${styles.itemObjetivo} ${
                  selectedCoach === "carlos quesada" ? styles.valid : ""
                }`}
              >
                <div className={styles.titleBox}>
                  <h4>Carlos quesada</h4>
                </div>
                <input
                  type="radio"
                  hidden
                  id="coach1"
                  {...register("coach", {
                    required: "El objetivo físico es obligatoria",
                    onChange: handleCoachChange,
                  })}
                  value="carlos quesada"
                />
                <Image
                  src="/images/carlos-coach.jpg"
                  alt="objetivo-fisico"
                  fill={true}
                />
              </label>
              <label
                htmlFor="coach2"
                className={`${styles.itemObjetivo} ${
                  selectedCoach === "karina quispe" ? styles.valid : ""
                }`}
              >
                <div className={styles.titleBox}>
                  <h4>karina quispe</h4>
                </div>

                <input
                  type="radio"
                  hidden
                  id="coach2"
                  {...register("coach", {
                    required: "El objetivo físico es obligatoria",
                    onChange: handleCoachChange,
                  })}
                  value="karina quispe"
                />
                <Image
                  src="/images/karina-coach.jpg"
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
