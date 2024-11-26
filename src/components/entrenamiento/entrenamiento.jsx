import React, { useState, useEffect, useContext } from "react";
import styles from "./entrenamiento.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import ContactCoach from "../contactCoach/contactCoach";
import Loading from "@/components/loadingExtra/loadingExtra";
import AuthContext from "@/state/auth/auth-context";
import useUserProfile from "@/state/hook/useUserProfile";
import { useRouter } from "next/navigation";
import VisualizerTraining from "@/components/visualizerTraining/visualizerTraining";
import InfoProducts from "@/components/infoProducts/infoProducts";
import masculino from "/public/images/icons/masculino-icon.svg";
import femenino from "/public/images/icons/femenino-icon.svg";

export default function Entrenamiento() {
  const { user } = useContext(AuthContext);
  const { userProfile, loading, error } = useUserProfile(user);
  const router = useRouter();
  const [rutina, setRutina] = useState(false);
  const [generoUser, setGeneroUser] = useState(null);

  useEffect(() => {
    if (!loading && !userProfile) {
      router.push("/"); 
    }
  }, [loading, userProfile, router]);


  useEffect(() => {
    if (userProfile?.genero === "masculino") {
      setGeneroUser(masculino);
    } else if (userProfile?.genero === "femenino") {
      setGeneroUser(femenino);
    }
  }, [userProfile?.genero]);

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
          <span></span>
          <button onClick={() => setRutina(false)}>
            <FontAwesomeIcon icon={faXmark} size="2x" className={styles.icon} />
          </button>
          <VisualizerTraining />
        </section>
      ) : (
        <>
          <section className={styles.rightContainer}>
            <section className={styles.infoTrainer}>
              <div className={styles.datosFisicos}>
                <span>
                  <Image
                    src="/images/icons/objetivo-fisico.svg"
                    alt="icon-info"
                    width={40}
                    height={40}
                  />
                </span>
                <div className={styles.contFlexInfo}>
                  <h4>{userProfile?.objetivoFisico}</h4>
                  <p>Objetivo físico</p>
                </div>
              </div>
              <div className={styles.datosFisicos}>
                <span>
                  <Image
                    src="/images/icons/fuerza.svg"
                    alt="icon-info"
                    width={38}
                    height={38}
                  />
                </span>
                <div className={styles.contFlexInfo}>
                  <h4>Fuerza</h4>
                  <p>Principal</p>
                </div>
              </div>
              <div className={styles.datosFisicos}>
                <span>
                  <Image
                    src="/images/icons/cardio.svg"
                    alt="icon-info"
                    width={35}
                    height={35}
                  />
                </span>
                <div className={styles.contFlexInfo}>
                  <h4>Cardio</h4>
                  <p>Secundario</p>
                </div>
              </div>
              <div className={styles.datosFisicos}>
                <span>
                  {generoUser && (
                    <Image
                      src={generoUser}
                      alt="icon-info"
                      width={32}
                      height={32}
                    />
                  )}
                </span>
                <div className={styles.contFlexInfo}>
                  <h4>{userProfile?.genero}</h4>
                  <p>Genero</p>
                </div>
              </div>
              <div className={styles.coachResponsive}>
                <ContactCoach coachName={userProfile?.coach} />
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
          <div className={styles.coachMobile}>
          <ContactCoach coachName={userProfile?.coach} />
          </div>
          
          <InfoProducts />
        </>
      )}
    </section>
  );
}
