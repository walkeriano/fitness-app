import React, { useState, useEffect, useContext } from "react";
import styles from "./alimentacion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faArrowRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import ContactCoach from "../contactCoach/contactCoach";
import Image from "next/image";
import Loading from "@/components/loadingExtra/loadingExtra";
import AuthContext from "@/state/auth/auth-context";
import useUserProfile from "@/state/hook/useUserProfile";
import VisualizerAlimentacion from "@/components/visualizerAlimentacion/visualizerAlimentacion";
import InfoProducts from "@/components/infoProducts/infoProducts";
export default function Alimentacion() {
  const { user } = useContext(AuthContext);
  const { userProfile, calculatedData, loading, error } = useUserProfile(user);
  const router = useRouter();
  const [alimentacion, setAlimentacion] = useState(false);

  useEffect(() => {
    if (!loading && !userProfile) {
      router.push("/");
    }
  }, [loading, userProfile, router]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.generalAlimentacion}>
      <section className={styles.titleAlimentacion}>
        <h3>Guía de alimentación</h3>
        <div className={styles.detalle}>
          <p>Rutina personalizada</p>
          <FontAwesomeIcon
            icon={faChevronDown}
            size="2x"
            className={styles.icon}
          />
        </div>
      </section>
      {alimentacion ? (
        <section className={styles.containerVisualizer}>
          <span></span>
          <button onClick={() => setAlimentacion(false)}>
            <FontAwesomeIcon icon={faXmark} size="2x" className={styles.icon} />
          </button>
          <VisualizerAlimentacion />
        </section>
      ) : (
        <>
          <section className={styles.contadorGeneral}>
            <section className={styles.flexContador}>
            <section className={styles.totalInfo}>
              <div className={styles.generalTitle}>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="2x"
                  className={styles.icon}
                />
                <div className={styles.loader}></div>
                <h3>{calculatedData?.tdee}</h3>
                <p>Total kcal</p>
              </div>
              <div className={styles.boxImg}>
                <Image
                  src="/images/icons/texture.svg"
                  alt="textura"
                  fill={true}
                  loading="lazy"
                />
              </div>
            </section>
            <section className={styles.linkDieta}>
              <button onClick={() => setAlimentacion(true)}>
                Ver Dieta
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="2x"
                  className={styles.icon}
                />
              </button>
            </section>
            </section>
            <section className={styles.containerInfo}>
              <h3>Objetivos nutritivos del día:</h3>
              <section className={styles.containerItems}>
                <div className={styles.datoItem}>
                  <p>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      size="2x"
                      className={styles.icon}
                    />
                    Proteínas
                  </p>
                  <h4>{calculatedData?.proteinas} g</h4>
                  <h5>({calculatedData?.proteinasCalorias} cals)</h5>
                </div>
                <div className={styles.datoItem}>
                  <p>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      size="2x"
                      className={styles.icon}
                    />
                    Grasas
                  </p>
                  <h4>{calculatedData?.grasas} g</h4>
                  <h5>({calculatedData?.grasasCalorias} cals)</h5>
                </div>
                <div className={styles.datoItem}>
                  <p>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      size="2x"
                      className={styles.icon}
                    />
                    Carbos
                  </p>
                  <h4>{calculatedData?.carbohidratos} g</h4>
                  <h5>({calculatedData?.carbohidratosCalorias} cals)</h5>
                </div>
              </section>
            </section>
          </section>
          <section className={styles.flexContact}>
            <ContactCoach coachName={userProfile?.coach} />
          </section>
          <InfoProducts />
        </>
      )}
    </section>
  );
}
