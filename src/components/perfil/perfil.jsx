"use client";
import React, { useEffect } from "react";
import styles from "./perfil.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import useUserProfile from "@/state/hook/useUserProfile";
import Loading from "@/components/loadingExtra/loadingExtra";

export default function Perfil() {
  const { userProfile, loading, error } = useUserProfile();
  const router = useRouter();

  useEffect(() => {
    // Si no hay usuario logueado y no estamos cargando, redirige al home
    if (!loading && !userProfile) {
      router.push("/"); // Redirige al home si no hay usuario logueado
    }
  }, [loading, userProfile, router]);

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
              <img
                src={userProfile?.imageUrl}
                alt="image-persons"
              />
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
                <Image src="/images/icons/calendar.svg" alt="icon-info" width={35} height={35} />
                <h3>{userProfile?.edad}</h3>
                <p>Edad</p>
              </div>
              <div className={styles.itemFis}>
                <Image src="/images/icons/altura.svg" alt="icon-info" width={35} height={35} />
                <h3>{userProfile?.estatura} cm</h3>
                <p>Altura</p>
              </div>
              <div className={styles.itemFis}>
                <Image src="/images/icons/peso.svg" alt="icon-info" width={35} height={35} />
                <h3>{userProfile?.peso}</h3>
                <p>Peso</p>
              </div>
            </section>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
}
