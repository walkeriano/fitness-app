import styles from "./allRutinas.module.css";
import React, { useState, useEffect, useContext } from "react";
import useFetchTraining from "@/state/hook/useFetchTraining";
import { useRouter } from "next/navigation";
import AuthContext from "@/state/auth/auth-context";
import useUserProfile from "@/state/hook/useUserProfile";
import useUploadFile from "@/state/hook/useUploadFile";
import Loading from "@/components/loadingExtra/loadingExtra";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faFilePdf,
  faArrowRight,
  faCircleLeft,
  faCirclePlus,
  faXmark,
  faFileCircleCheck
} from "@fortawesome/free-solid-svg-icons";

export default function AllRutinas() {
  const { user } = useContext(AuthContext);
  const { userProfile } = useUserProfile(user);
  const router = useRouter();
  const { rutinas, loading, error } = useFetchTraining();
  const { handleUpload, uploading, error: uploadError } = useUploadFile();
  const [actualizar, setActualizar] = useState(null);

  useEffect(() => {
    if (!loading && !userProfile) {
      router.push("/"); 
    } else if (!loading && userProfile?.superUser === false) {
      router.push("/"); 
    }
  }, [loading, userProfile, router]);

  
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedRutina, setSelectedRutina] = useState(null);


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  
  const clearFile = () => {
    setSelectedFile(null);
    setSelectedRutina(null);
  };

 
  const handleFileUpload = async () => {
    if (selectedFile && selectedRutina) {
      const url = await handleUpload(selectedFile, selectedRutina);
      if (url) {
        console.log("Archivo subido y URL guardada:", url);
        clearFile(); 
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.containerRutinas}>
      {rutinas.map((rutina) => (
        <section key={rutina.id} className={styles.boxRutina}>
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
                {rutina?.nombre}
              </h3>
              <h3>
                <span>Genero: </span>
                {rutina?.genero}
              </h3>
              <h3>
                <span>Nivel: </span>
                {rutina?.nivel}
              </h3>
            </div>
          </section>
          {actualizar === rutina.id ? (
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
                  {selectedFile && selectedRutina === rutina.id ? (
                    <section  className={styles.onDoc}>
                      <h4>Listo para subir</h4>
                      <FontAwesomeIcon icon={faFileCircleCheck} size="1x" className={styles.icon} />
                      <button
                        onClick={clearFile}
                        className={styles.clearButton}
                      >
                        <FontAwesomeIcon icon={faXmark} size="1x"  className={styles.icon} />
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
                      setSelectedRutina(rutina.id); // Guardamos el ID de la rutina actual
                    }}
                    disabled={uploading}
                  />
                </label>
                <button
                  className={styles.deleteOn}
                  onClick={handleFileUpload}
                  disabled={
                    uploading || !selectedFile || selectedRutina !== rutina.id
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
              onClick={() => setActualizar(rutina.id)}
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
