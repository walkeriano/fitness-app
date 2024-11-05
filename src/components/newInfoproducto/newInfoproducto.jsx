import styles from "./newInfoproducto.module.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCirclePlus,
  faChevronDown,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import imageCompression from "browser-image-compression";
import { db, storage } from "../../../firebase-config";

export default function NewInfoproducto() {
  const [showCreate, setShowCreate] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imageFile, setImageFile] = useState(null); // Estado para almacenar el archivo de imagen
  const [imagePreview, setImagePreview] = useState(null);

  // Función para manejar el cambio en el input de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Mostrar vista previa
    }
  };

  const onSubmit = async (data) => {
    setLoading(true); // Inicia el estado de carga

    try {
      let image = "";

      if (imageFile) {
        const options = {
          maxSizeMB: 0.15,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(imageFile, options);

        const imageRef = ref(storage, `productos/${compressedFile.name}`);
        await uploadBytes(imageRef, compressedFile);

        image = await getDownloadURL(imageRef);
      }

      const docRef = await addDoc(collection(db, "infoproductos"), {
        ...data,
        image,
      });
      console.log("Documento agregado con ID:", docRef.id);

      reset();
      setImageFile(null);
      setImagePreview(null);

      // Simula un tiempo de espera de 5 segundos
      setTimeout(() => {
        setLoading(false); // Oculta el loading después de 5 segundos
      }, 5000);
    } catch (error) {
      console.error("Error al agregar documento:", error);
      setLoading(false); // Si hay un error, desactiva el loading
    }
  };

  return (
    <section className={styles.allGeneral}>
      {showCreate ? (
        <section
          className={styles.activate}
          onClick={() => setShowCreate(false)}
        >
          <p>Crear nuevo infoproducto</p>
          <FontAwesomeIcon
            icon={faCirclePlus}
            size="2x"
            className={styles.icon}
          />
        </section>
      ) : (
        <section className={styles.showForm}>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.loader} ></div>
              <p>Publicando, por favor espera...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formulario}>
              <h3>
                Crear nuevo infoproducto
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size="2x"
                  className={styles.icon}
                />
              </h3>
              <div className={styles.itemInput}>
                <p>Nombre:</p>
                <input
                  type="text"
                  {...register("nombre", {
                    required: "El nombre es obligatorio",
                  })}
                  placeholder="Escribir aqui..."
                />
                {errors.nombre && <p>{errors.nombre.message}</p>}
              </div>
              <div className={styles.itemInput}>
                <p>Descripción:</p>
                <input
                  type="text"
                  {...register("descripcion", {
                    required: "La descripción es obligatoria",
                  })}
                  placeholder="Escribir aqui..."
                />
                {errors.descripcion && <p>{errors.descripcion.message}</p>}
              </div>
              <div className={styles.itemInput}>
                <p>Precio ahora:</p>
                <input
                  type="number"
                  {...register("precio", {
                    required: "El precio es obligatorio",
                    min: {
                      value: 0,
                      message: "El precio debe ser mayor o igual a 0",
                    },
                  })}
                  placeholder="Escribir aqui..."
                />
                {errors.precio && <p>{errors.precio.message}</p>}
              </div>
              <div className={styles.itemInput}>
                <p>Precio antes:</p>
                <input
                  type="number"
                  {...register("precioAntiguo", {
                    required: "El precio es obligatorio",
                    min: {
                      value: 0,
                      message: "El precio debe ser mayor o igual a 0",
                    },
                  })}
                  placeholder="Escribir aqui..."
                />
                {errors.precioAntiguo && <p>{errors.precioAntiguo.message}</p>}
              </div>
              <div className={styles.itemInput}>
                <p>Archivo:</p>
                <input type="text" placeholder="Escribir aqui..." />
              </div>
              <div className={styles.itemInput}>
                <p>Imagen:</p>
                <label htmlFor="image">
                  {imagePreview && (
                    <div className={styles.imgInput}>
                      <img
                        src={imagePreview}
                        alt="Vista previa"
                        
                      />
                    </div>
                  )}
                  <FontAwesomeIcon
                    icon={faImage}
                    size="2x"
                    className={styles.icon}
                  />
                  <p>Adjuntar aqui...</p>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                    name="image"
                    id="image"
                  />
                </label>
              </div>
              <button type="submit">
                Publicar ahora
                <span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size="2x"
                    className={styles.icon}
                  />
                </span>
              </button>
            </form>
          )}
          <button
            className={styles.titleSection}
            onClick={() => setShowCreate(true)}
          >
            <FontAwesomeIcon
              icon={faArrowRight}
              size="2x"
              className={styles.icon}
            />
            Minimizar ventana
            <FontAwesomeIcon
              icon={faArrowRight}
              size="2x"
              className={styles.icon}
            />
          </button>
        </section>
      )}
    </section>
  );
}
