"use client";
import React, { useEffect } from "react";
import styles from "./perfil.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faChevronDown,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import useUserProfile from "@/state/hook/useUserProfile";
import Loading from "@/components/loadingExtra/loadingExtra";
import InfoProducts from "@/components/infoProducts/infoProducts";
import Contador from "@/components/contador/contador";

export default function Perfil() {
  const { userProfile, loading, error } = useUserProfile();
  const router = useRouter();

  useEffect(() => {
    // Si no hay usuario logueado y no estamos cargando, redirige al home
    if (!loading && !userProfile) {
      router.push("/"); // Redirige al home si no hay usuario logueado
    }
  }, [loading, userProfile, router]);

  console.log(userProfile);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.perfilInfo}>
      {userProfile ? (
        <>
          <section className={styles.contGeneralPerfil}>
            <section className={styles.infoPerfil}>
              <div className={styles.namePerfil}>
                <h3>Hola,</h3>
                <h2>{userProfile?.name}</h2>
                <h2>{userProfile?.lastName}</h2>
              </div>
              <div className={styles.infoContact}>
                <p>{userProfile?.email}</p>
                <p>993 394 394</p>
              </div>
              <Link href="/" className={styles.btnEditar}>
                <FontAwesomeIcon
                  icon={faGear}
                  size="2x"
                  className={styles.icon}
                />
                Editar perfil
              </Link>
            </section>
            <section className={styles.infoImg}>
              <img src={userProfile?.imageUrl} alt="image-persons" />
            </section>
          </section>
          <section className={styles.contInfoFisica}>
            <section className={styles.titleInfo}>
              <p>Información Física</p>
              <FontAwesomeIcon
                icon={faChevronDown}
                size="2x"
                className={styles.icon}
              />
            </section>
            <section className={styles.infoFisica}>
              <div className={styles.itemFis}>
                <Image
                  src="/images/icons/calendar.svg"
                  alt="icon-info"
                  width={35}
                  height={35}
                />
                <h3>{userProfile?.edad}</h3>
                <p>Edad</p>
              </div>
              <div className={styles.itemFis}>
                <Image
                  src="/images/icons/altura.svg"
                  alt="icon-info"
                  width={35}
                  height={35}
                />
                <h3>{userProfile?.estatura} cm</h3>
                <p>Altura</p>
              </div>
              <div className={styles.itemFis}>
                <Image
                  src="/images/icons/peso.svg"
                  alt="icon-info"
                  width={35}
                  height={35}
                />
                <h3>{userProfile?.peso} kg</h3>
                <p>Peso</p>
              </div>
            </section>
          </section>
          <section className={styles.containerFunctions}>
            <section className={styles.trainningBox}>
              <div className={styles.titleSection}>
                <h4>Plan de entrenamiento</h4>
                <div className={styles.contDetalle}>
                  <p>Abrir rutina</p>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </div>
              <span className={styles.btnRedirect}>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.imgCoach}>
                <Image
                  src="/images/coach-karina-perfil.png"
                  alt="image-coach"
                  fill={true}
                  className={styles.imgItem}
                />
              </div>
            </section>
            <section className={styles.totalCalculo}>
              <Contador />
            </section>
          </section>
          <section className={styles.containerFood}>
            <section className={styles.titleFood}>
              <div className={styles.boxtitleFood}>
                <h4>Guía de alimentación</h4>
                <div className={styles.contDetalle}>
                  <p>Abrir dieta</p>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </div>
              <span className={styles.btnRedirect}>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  size="2x"
                  className={styles.icon}
                />
              </span>
            </section>
            <div className={styles.imgFood}>
              <Image src="/images/food.png" alt="image-coach" fill={true} />
            </div>
          </section>
          <section className={styles.containerContact}>
            <section className={styles.containerTitle}>
              <h4>¿Necesitas ayuda?</h4>
              <p>Contactar al coach</p>
            </section>
            <section className={styles.containerLinks}>
              <a href="/" className={styles.itemWss}>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  size="2x"
                  className={styles.icon}
                />
              </a>
              <a href="/" className={styles.itemEmail}>
                <FontAwesomeIcon
                  icon={faChevronDown}
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
