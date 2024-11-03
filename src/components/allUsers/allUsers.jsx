import React, { useState, useEffect,  useContext } from "react";
import useFetchUsers from "@/state/hook/useFetchUsers";
import styles from "./allUsers.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faTrashCan,
  faSkullCrossbones,
  faBolt
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import AuthContext from "@/state/auth/auth-context";
import useUserProfile from "@/state/hook/useUserProfile";
import Loading from "@/components/loadingExtra/loadingExtra";


export default function AllUsers() {
  const { user } = useContext(AuthContext);
  const { userProfile } = useUserProfile(user);
  const { users, loading, error, deleteUser, suspendUser, activateUser } =
    useFetchUsers();
  const [deleteUserBtn, setDeleteUserBtn] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Redirige al home si no hay usuario logueado o si la suscripción está desactivada
    if (!loading && !userProfile) {
      router.push("/"); // Redirige al home si no hay usuario logueado
    } else if (!loading && userProfile?.superUser === false){
      router.push("/"); // Redirige al home si el usuario es superuser
    }
  }, [loading, userProfile, router]);

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.containerAllUsers}>
      <div className={styles.firstContainer}>
        <p>Total usuarios:</p>
        <div className={styles.totalNumber}>
          <h3>{users?.length}</h3>
          <FontAwesomeIcon
            icon={faArrowRight}
            size="2x"
            className={styles.icon}
          />
        </div>
      </div>
      <section className={styles.secondContainer}>
        {users.map((user) => (
          <section key={user.id} className={styles.boxUser}>
            <div className={styles.imgUser}>
              <Image src={user?.imageUrl} alt="perfil user" fill={true} />
            </div>
            <section className={styles.contInfo}>
              <div className={styles.datosName}>
                <h3>{user?.name}</h3>
                <h3>{user?.lastName}</h3>
              </div>
              <div className={styles.datosEdad}>
                <p>{user?.genero}</p>
                <p>{user?.edad} años</p>
              </div>
              <div className={styles.datoSuscripcion}>
                <p>Suscripción:</p>
                <p>dsadsadasdas</p>
              </div>
            </section>
            {deleteUserBtn === user.id ? (
              <section className={styles.deleteOficial}>
                <p onClick={() => setDeleteUserBtn(null)}>¿Estás seguro?</p>
                <button
                  onClick={() => deleteUser(user.id)}
                  className={styles.deleteOn}
                >
                  Eliminar
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    size="2x"
                    className={styles.icon}
                  />
                </button>
              </section>
            ) : (
              <section className={styles.btnBox}>
                {user.suscripcion === "activo" ? (
                  <button className={styles.btnSuspender} onClick={() => suspendUser(user.id)}>
                    Suspender
                    <span>
                      <FontAwesomeIcon
                        icon={faSkullCrossbones}
                        size="2x"
                        className={styles.icon}
                      />
                    </span>
                  </button>
                ) : (
                  <button  className={styles.btnActivar} onClick={() => activateUser(user.id)}>
                    activar
                    <span>
                      <FontAwesomeIcon
                        icon={faBolt}
                        size="2x"
                        className={styles.icon}
                      />
                    </span>
                  </button>
                )}

                <button  className={styles.btnEliminar} onClick={() => setDeleteUserBtn(user.id)}>
                  Eliminar
                  <span>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      size="2x"
                      className={styles.icon}
                    />
                  </span>
                </button>
              </section>
            )}
          </section>
        ))}
      </section>
    </section>
  );
}
