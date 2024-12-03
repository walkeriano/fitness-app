import styles from "./allInfoproductos.module.css";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import Loading from "@/components/loadingExtra/loadingExtra";
import useFetchInfoproductos from "@/state/hook/useFetchInfoproductos";
import { useRouter } from "next/navigation";
import AuthContext from "@/state/auth/auth-context";
import useUserProfile from "@/state/hook/useUserProfile";
import NewInfoproducto from "@/components//newInfoproducto/newInfoproducto";

export default function AllInfoproductos() {
  const { user } = useContext(AuthContext);
  const { userProfile } = useUserProfile(user);
  const router = useRouter();
  const { infoproductos, loading, error, deleteInfoproducto } = useFetchInfoproductos();

  useEffect(() => {
    
    if (!loading && !userProfile) {
      router.push("/"); 
    } else if (!loading && userProfile?.superUser === false) {
      router.push("/"); 
    }
  }, [loading, userProfile, router]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.containerGeneral}>
      <section className={styles.sectionCreate}>
        <NewInfoproducto/>
      </section>
      <section className={styles.allProducts}>
        {infoproductos.map((infoproducto) => (
          <div key={infoproducto.id} className={styles.product}>
            <div className={styles.boxImg}>
              <Image src={infoproducto?.image} alt="visual-infoproducto" fill={true} loading="lazy" sizes="(max-width: 768px) 50vw, 50vw" />
            </div>
            <div className={styles.priceContainer}>
              <h3>{infoproducto?.nombre}</h3>
              <p>{infoproducto?.descripcion}</p>
              <h4>
                S/.{infoproducto?.precio}<span>S/.{infoproducto?.precioAntiguo}</span>
              </h4>
            </div>
            <Link href="/" className={styles.btnCard}>
              Comprar
              <FontAwesomeIcon
                icon={faCartArrowDown}
                size="2x"
                className={styles.icon}
              />
            </Link>
            <button
              className={styles.deleteButton}
              onClick={() => deleteInfoproducto(infoproducto.id, infoproducto.image)}
            >
              Eliminar
              <FontAwesomeIcon icon={faTrashCan} size="2x" className={styles.icon} />
            </button>
          </div>
        ))}
      </section>
    </section>
  );
}
