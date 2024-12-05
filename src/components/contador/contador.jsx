import React from "react";
import styles from "./contador.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Contador({ calculatedData }) {
  if (!calculatedData) {
    return null; 
  }

  return (
    <section className={styles.containerContador}>
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
          <Image src="/images/icons/texture.svg" alt="textura" fill={true} />
        </div>
      </section>
      <section className={styles.extraInfo}>
        <section className={styles.detallesInfo}>
          <p>Objetivos del día</p>
          <FontAwesomeIcon
            icon={faChevronDown}
            size="2x"
            className={styles.icon}
          />
        </section>
        <section className={styles.extras}>
          <div className={styles.itemCalories}>
            <p>Proteínas</p>
            <h4>
              {calculatedData?.proteinas} g{" "}
              <span>({calculatedData?.proteinasCalorias} cals)</span>
            </h4>
          </div>
          <div className={styles.itemCalories}>
            <p>Carbos</p>
            <h4>
              {calculatedData?.carbohidratos} g{" "}
              <span>({calculatedData?.carbohidratosCalorias} cals)</span>
            </h4>
          </div>
          <div className={styles.itemCalories}>
            <p>Grasas</p>
            <h4>
              {calculatedData?.grasas} g{" "}
              <span>({calculatedData?.grasasCalorias} cals)</span>
            </h4>
          </div>
          
        </section>
      </section>
    </section>
  );
}
