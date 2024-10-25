import React, { useState, useEffect, useContext } from "react";
import styles from "./entrenamiento.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faHeartPulse,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import ContactCoach from "../contactCoach/contactCoach";
import Loading from "@/components/loadingExtra/loadingExtra";
import AuthContext from "@/state/auth/auth-context";
import useUserProfile from "@/state/hook/useUserProfile";
import { useRouter } from "next/navigation";
import VisualizerTraining from "@/components/visualizerTraining/visualizerTraining";

export default function Entrenamiento() {
  const { user } = useContext(AuthContext);
  const { userProfile, loading, error } = useUserProfile(user);
  const router = useRouter();
  const [rutina, setRutina] = useState(false);

  useEffect(() => {
    // Si no hay usuario logueado y no estamos cargando, redirige al home
    if (!loading && !userProfile) {
      router.push("/"); // Redirige al home si no hay usuario logueado
    }
  }, [loading, userProfile, router]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.containerEntrenamiento}>
      <section className={styles.leftContainer}>
        <h3>Plan de entrenamiento</h3>
        <div className={styles.detalle}>
          <p>Rutina personalizada</p>
          <FontAwesomeIcon
            icon={faChevronDown}
            size="2x"
            className={styles.icon}
          />
        </div>
      </section>
      {rutina ? (
        <section className={styles.containerVisualizer}>
          <button onClick={() => setRutina(false)}>
            <FontAwesomeIcon
              icon={faArrowRight}
              size="2x"
              className={styles.icon}
            />
          </button>
          <VisualizerTraining />
        </section>
      ) : (
        <>
          <section className={styles.rightContainer}>
            <section className={styles.infoTrainer}>
              <div className={styles.datosFisicos}>
                <span>
                  <FontAwesomeIcon
                    icon={faHeartPulse}
                    size="2x"
                    className={styles.icon}
                  />
                </span>
                <h4>Masa muscular</h4>
                <p>Objetivo físico</p>
              </div>
              <div className={styles.datosFisicos}>
                <span>
                  <FontAwesomeIcon
                    icon={faHeartPulse}
                    size="2x"
                    className={styles.icon}
                  />
                </span>
                <h4>Fuerza</h4>
                <p>Principal</p>
              </div>
              <div className={styles.datosFisicos}>
                <span>
                  <FontAwesomeIcon
                    icon={faHeartPulse}
                    size="2x"
                    className={styles.icon}
                  />
                </span>
                <h4>Cardio</h4>
                <p>Secundario</p>
              </div>
              <div className={styles.datosFisicos}>
                <span>
                  <FontAwesomeIcon
                    icon={faHeartPulse}
                    size="2x"
                    className={styles.icon}
                  />
                </span>
                <h4>Masculino</h4>
                <p>Genero</p>
              </div>
            </section>
            <section className={styles.imgContainer}>
              <button
                onClick={() => setRutina(true)}
                className={styles.btnRutina}
              >
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="2x"
                  className={styles.icon}
                />
                Ver rutina
                <span></span>
              </button>
              <div className={styles.containerImg}>
                <span></span>
                <Image src="/images/hologram.svg" alt="hello" fill={true} />
              </div>
            </section>
            <div className={styles.expand}></div>
            <div className={styles.grilla}>
              <Image src="/images/grilla.svg" alt="hello" fill={true} />
            </div>
          </section>
          <ContactCoach />
        </>
      )}
    </section>
  );
}
