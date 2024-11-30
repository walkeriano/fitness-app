import styles from "./infoProducts.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import useInfoproductos from "@/state/hook/useInfoproductos";

export default function InfoProducts() {
  const { infoproductosData, loading, error } = useInfoproductos();

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={styles.sectionGeneral}>
      <section className={styles.titleSection}>
        <FontAwesomeIcon icon={faStore} size="2x" className={styles.icon} />
        <h2>Tienda de Infoproductos</h2>
      </section>
      {infoproductosData ? (
        <section className={styles.sliderContainer}>
          {infoproductosData.map((producto) => (
            <section key={producto.id} className={styles.itemSlider}>
              <section className={styles.imgCard}>
                <Image
                  src={producto?.image}
                  alt="imagen-info-producto"
                  fill={true}
                />
              </section>
              <section className={styles.infoCard}>
                <h3>{producto?.nombre}</h3>
                <p>{producto?.descripcion}</p>
                <h4>
                  S/.{producto?.precio}{" "}
                  <span>S/.{producto?.precioAntiguo}</span>
                </h4>
                <Link
                  href={producto?.url || "/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnCard}
                >
                  Comprar
                  <FontAwesomeIcon
                    icon={faCartArrowDown}
                    size="2x"
                    className={styles.icon}
                  />
                </Link>
              </section>
            </section>
          ))}
        </section>
      ) : (
        <p>No hay infoproductos disponibles</p>
      )}
    </section>
  );
}
