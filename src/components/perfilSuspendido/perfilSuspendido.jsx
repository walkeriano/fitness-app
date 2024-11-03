"use client";
import React, { useEffect, useContext } from "react";
import styles from "./perfilSuspendido.module.css";
import useUserProfile from "@/state/hook/useUserProfile";
import AuthContext from "@/state/auth/auth-context";
import { useRouter } from "next/navigation";
import Loading from "@/components/loadingExtra/loadingExtra";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faSkullCrossbones,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function PerfilSuspendido() {
  const { user } = useContext(AuthContext);
  const { userProfile, loading, error } = useUserProfile(user);
  const router = useRouter();

  useEffect(() => {
    // Redirige al home si no hay usuario logueado o si la suscripción está desactivada
    if (!loading && !userProfile) {
      router.push("/"); // Redirige al home si no hay usuario logueado
    } else if (!loading && userProfile?.suscripcion === "activo") {
      router.push("/perfil-coach-fitness-app"); // Redirige al home si la suscripción del usuario está desactivada
    }
  }, [loading, userProfile, router]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.containerGeneral}>
      {userProfile ? (
        <section className={styles.containerAllInfo}>
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
            </section>
            <section className={styles.infoImg}>
              <span></span>
              <Image
                src={userProfile?.imageUrl}
                alt="image-persons"
                fill={true}
              />
            </section>
          </section>
          <section className={styles.notificationInfo}>
            <FontAwesomeIcon
              icon={faSkullCrossbones}
              size="2x"
              className={styles.icon}
            />
            <div className={styles.message}>
              <h3>Cuenta suspendida</h3>
              <p>Renueva tu suscripción o contactanos</p>
            </div>
            <div className={styles.btnBox}>
              <Link href="/" className={styles.btnSuscripcion}>Renovar ahora!</Link>
              <Link href="/" className={styles.btnContact}>Atención al cliente</Link>
            </div>
          </section>
        </section>
      ) : (
        <Loading />
      )}
    </section>
  );
}
