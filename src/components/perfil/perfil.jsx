"use client";
import React, { useState, useEffect, useContext } from "react";
import styles from "./perfil.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faArrowRight,
  faPaperPlane,
  faArrowUpRightDots,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import useUserProfile from "@/state/hook/useUserProfile";
import AuthContext from "@/state/auth/auth-context";
import Loading from "@/components/loadingExtra/loadingExtra";
import InfoProducts from "@/components/infoProducts/infoProducts";
import Contador from "@/components/contador/contador";
import imagenCarlos from "/public/images/coach-carlos-perfil.png";
import imagenKarina from "/public/images/coach-karina-perfil.png";

export default function Perfil() {
  const { user } = useContext(AuthContext);
  const { userProfile, calculatedData, loading, error } = useUserProfile(user);
  const router = useRouter();
  const [imagenCoach, setImagenCoach] = useState(null);

  useEffect(() => {
    
    if (!loading && !userProfile) {
      router.push("/"); 
    } else if (!loading && userProfile?.suscripcion === "suspendido") {
      router.push("/perfil-suspendido"); 
    } else if (!loading && userProfile?.superUser === true) {
      router.push("/administrador-usuarios"); 
    }
  }, [loading, userProfile, router]);


  useEffect(() => {
    if (userProfile?.coach === "carlos quesada") {
      setImagenCoach(imagenCarlos);
    } else if (userProfile?.coach === "karina durand") {
      setImagenCoach(imagenKarina);
    }
  }, [userProfile?.coach]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.perfilInfo}>
      {userProfile ? (
        <>
          <section className={styles.flexBoxCont}>
            <section className={styles.contGeneralPerfil}>
              <section className={styles.infoPerfil}>
                <div className={styles.namePerfil}>
                  <h3>Hola,</h3>
                  <h2>{userProfile?.name}</h2>
                  <h2>{userProfile?.lastName}</h2>
                </div>
                <div className={styles.infoContact}>
                  <p>
                    {userProfile?.city}, {userProfile?.country}
                  </p>
                  <p>{userProfile?.email}</p>
                  <p>993 394 394</p>
                </div>

                {userProfile.niveles === "activo" ? (
                  <Link href="/aumentar-nivel" className={styles.btnEditar}>
                    <FontAwesomeIcon
                      icon={faArrowUpRightDots}
                      size="2x"
                      className={styles.icon}
                    />
                    Aumentar nivel
                  </Link>
                ) : (
                  <Link href="/aumentar-nivel" className={styles.btnEditarOff}>
                    <FontAwesomeIcon
                      icon={faArrowUpRightDots}
                      size="2x"
                      className={styles.icon}
                    />
                    Aumentar nivel
                  </Link>
                )}
              </section>
              <section className={styles.infoImg}>
                <span></span>
                <Image
                  src={userProfile?.imageUrl}
                  alt="image-persons"
                  fill={true}
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 50vw"
                />
              </section>
            </section>
            <section className={styles.contInfoFisica}>
              <section className={styles.titleInfo}>
                <p>Información Física:</p>
                <div className={styles.titleCont}>
                  <h4>{userProfile?.genero}</h4>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </section>
              <section className={styles.infoFisica}>
                <div className={styles.itemFis}>
                  <Image
                    src="/images/icons/calendar.svg"
                    alt="icon-info"
                    width={35}
                    height={35}
                  />
                  <h3>
                    {userProfile?.edad} <span>años</span>
                  </h3>
                  <p>Edad</p>
                </div>
                <div className={styles.itemFis}>
                  <Image
                    src="/images/icons/altura.svg"
                    alt="icon-info"
                    width={35}
                    height={35}
                  />
                  <h3>
                    {userProfile?.estatura} <span>mts</span>
                  </h3>
                  <p>Altura</p>
                </div>
                <div className={styles.itemFis}>
                  <Image
                    src="/images/icons/peso.svg"
                    alt="icon-info"
                    width={35}
                    height={35}
                  />
                  <h3>
                    {userProfile?.peso} <span>kg</span>
                  </h3>
                  <p>Peso</p>
                </div>
              </section>
            </section>
          </section>
          <section className={styles.containerFunctions}>
            <section className={styles.flexTraining}>
              <Link
                href="/entrenamiento-coach-fitness-app"
                className={styles.trainningBox}
              >
                <div className={styles.titleSection}>
                  <h4>Plan de entrenamiento</h4>
                  <div className={styles.contDetalle}>
                    <p>{userProfile?.coach}</p>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      size="2x"
                      className={styles.icon}
                    />
                  </div>
                </div>
                <Link
                  href="/entrenamiento-coach-fitness-app"
                  className={styles.btnRedirect}
                >
                  <p>Ver rutina</p>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    size="2x"
                    className={styles.icon}
                  />
                </Link>
                <div className={styles.imgCoach}>
                  {imagenCoach && (
                    <Image
                      src={imagenCoach}
                      alt="image-coach"
                      fill={true}
                      className={styles.imgItem}
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, 50vw"
                    />
                  )}
                </div>
              </Link>
              <Link
                href="/alimentacion-coach-fitness-app"
                className={styles.containerFoodTwo}
              >
                <section className={styles.titleFood}>
                  <div className={styles.boxtitleFood}>
                    <h4>Guía de alimentación</h4>
                    <div className={styles.contDetalle}>
                      <p>Comidas: {userProfile?.comidasXdia}</p>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        size="2x"
                        className={styles.icon}
                      />
                    </div>
                  </div>
                  <Link
                    href="/alimentacion-coach-fitness-app"
                    className={styles.btnRedirect}
                  >
                    <p>Ver Dieta</p>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      size="2x"
                      className={styles.icon}
                    />
                  </Link>
                </section>
                <div className={styles.imgFood}>
                  <Image src="/images/food.png" alt="image-coach" fill={true} loading="lazy" sizes="(max-width: 768px) 50vw, 50vw" />
                </div>
              </Link>
            </section>
            <section className={styles.flexCalculate}>
              <section className={styles.totalCalculo}>
                <Contador calculatedData={calculatedData} />
              </section>
              <section className={styles.containerContactTwo}>
                <section className={styles.containerTitle}>
                  <h4>¿Algúna consulta?</h4>
                  <p>Contacta al coach</p>
                </section>
                <section className={styles.containerLinks}>
                  <a
                    href="https://wa.me/51997474185?text=Hola%20necesito%20ayuda"
                    target="_blank"
                    className={styles.itemWss}
                  >
                    <FontAwesomeIcon
                      icon={faWhatsapp}
                      size="2x"
                      className={styles.icon}
                    />
                  </a>
                  <a
                    href="mailto: consultas@comopezenelaula.com"
                    className={styles.itemEmail}
                  >
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      size="2x"
                      className={styles.icon}
                    />
                  </a>
                </section>
              </section>
            </section>
          </section>
          <Link
            href="/alimentacion-coach-fitness-app"
            className={styles.containerFood}
          >
            <section className={styles.titleFood}>
              <div className={styles.boxtitleFood}>
                <h4>Guía de alimentación</h4>
                <div className={styles.contDetalle}>
                  <p>Comidas: {userProfile?.comidasXdia}</p>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </div>
              <Link
                href="/alimentacion-coach-fitness-app"
                className={styles.btnRedirect}
              >
                <p>Ver Dieta</p>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="2x"
                  className={styles.icon}
                />
              </Link>
            </section>
            <div className={styles.imgFood}>
              <Image src="/images/food.png" alt="image-coach" fill={true} loading="lazy" />
            </div>
          </Link>
          <section className={styles.containerContact}>
            <section className={styles.containerTitle}>
              <h4>¿Algúna consulta?</h4>
              <p>Contacta al coach</p>
            </section>
            <section className={styles.containerLinks}>
              <a
                href="https://wa.me/51997474185?text=Hola%20necesito%20ayuda"
                target="_blank"
                className={styles.itemWss}
              >
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  size="2x"
                  className={styles.icon}
                />
              </a>
              <a
                href="mailto: consultas@comopezenelaula.com"
                className={styles.itemEmail}
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  size="2x"
                  className={styles.icon}
                />
              </a>
            </section>
          </section>
          <InfoProducts />
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
}
