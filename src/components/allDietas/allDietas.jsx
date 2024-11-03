import styles from "./allDietas.module.css";
import React, { useState, useEffect, useContext } from "react";
import useFetchAlimentacion from "@/state/hook/useFetchAlimentacion";
import { useRouter } from "next/navigation";
import AuthContext from "@/state/auth/auth-context";
import useUserProfile from "@/state/hook/useUserProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faFilePdf,
  faArrowRight,
  faCircleLeft,
  faCirclePlus,
  faXmark,
  faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/loadingExtra/loadingExtra";
import useUploadFile from "@/state/hook/useUploadFile";

export default function AllDietas() {
  const { user } = useContext(AuthContext);
  const { userProfile } = useUserProfile(user);
  const router = useRouter();
  const { dietas, loading, error } = useFetchAlimentacion();
  const { handleUpload, uploading, error: uploadError } = useUploadFile();
  const [actualizar, setActualizar] = useState(null);

  useEffect(() => {
    // Redirige al home si no hay usuario logueado o si la suscripción está desactivada
    if (!loading && !userProfile) {
      router.push("/"); // Redirige al home si no hay usuario logueado
    } else if (!loading && userProfile?.superUser === false) {
      router.push("/"); // Redirige al home si el usuario es superuser
    }
  }, [loading, userProfile, router]);

  // Estados para almacenar el archivo y la rutina seleccionada
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedRutina, setSelectedRutina] = useState(null);

  // Maneja el archivo seleccionado por el usuario
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Función para limpiar el archivo seleccionado
  const clearFile = () => {
    setSelectedFile(null);
    setSelectedRutina(null);
  };

  // Subida del archivo
  const handleFileUpload = async () => {
    if (selectedFile && selectedRutina) {
      const url = await handleUpload(selectedFile, selectedRutina);
      if (url) {
        console.log("Archivo subido y URL guardada:", url);
        clearFile(); // Limpiamos el archivo y la rutina seleccionada una vez subido
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.containerRutinas}>
      {dietas.map((dieta) => (
        <section key={dieta.id} className={styles.boxRutina}>
          <section className={styles.contInfo}>
            <div className={styles.iRutina}>
              <FontAwesomeIcon
                icon={faFilePdf}
                size="2x"
                className={styles.icon}
              />
            </div>
            <div className={styles.datosName}>
              <h3>
                <span>Objetivo: </span>
                {dieta?.nombre}
              </h3>
              <h3>
                <span>Genero: </span>
                {dieta?.genero}
              </h3>
              <h3>
                <span>Comidas: </span>
                {dieta?.comidas}
              </h3>
            </div>
          </section>
          {actualizar === dieta.id ? (
            <section className={styles.deleteOficial}>
              <p>Adjuntar nuevo documento:</p>
              <button
                onClick={() => setActualizar(null)}
                className={styles.closeBtn}
              >
                <FontAwesomeIcon
                  icon={faCircleLeft}
                  size="2x"
                  className={styles.icon}
                />
              </button>
              <div className={styles.contSubmit}>
                <label htmlFor="archivo" className={styles.adjuntar}>
                  {selectedFile && selectedRutina === dieta.id ? (
                    <section className={styles.onDoc}>
                      <h4>Listo para subir</h4>
                      <FontAwesomeIcon
                        icon={faFileCircleCheck}
                        size="1x"
                        className={styles.icon}
                      />
                      <button
                        onClick={clearFile}
                        className={styles.clearButton}
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          size="1x"
                          className={styles.icon}
                        />
                      </button>
                    </section>
                  ) : (
                    <section className={styles.offDoc}>
                      <h4>Adjuntar aquí</h4>
                      <FontAwesomeIcon
                        icon={faCirclePlus}
                        size="2x"
                        className={styles.icon}
                      />
                    </section>
                  )}

                  <input
                    type="file"
                    id="archivo"
                    hidden
                    accept="application/pdf"
                    onChange={(e) => {
                      handleFileChange(e);
                      setSelectedRutina(dieta.id); // Guardamos el ID de la rutina actual
                    }}
                    disabled={uploading}
                  />
                </label>
                <button
                  className={styles.deleteOn}
                  onClick={handleFileUpload}
                  disabled={
                    uploading || !selectedFile || selectedRutina !== dieta.id
                  }
                >
                  Publicar archivo
                  <span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      size="2x"
                      className={styles.icon}
                    />
                  </span>
                </button>
                {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
              </div>
            </section>
          ) : (
            <button
              className={styles.btnEliminar}
              onClick={() => setActualizar(dieta.id)}
            >
              Actualizar rutina
              <span>
                <FontAwesomeIcon
                  icon={faArrowsRotate}
                  size="2x"
                  className={styles.icon}
                />
              </span>
            </button>
          )}
        </section>
      ))}
    </section>
  );
}
