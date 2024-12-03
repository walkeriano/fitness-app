import { useState } from "react";
import stylesFrecuentQuestions from "./preguntasFrecuentes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

export default function PreguntasFrecuentes() {
  const [showOne, setShowOne] = useState(true);
  const [showTwo, setShowTwo] = useState(true);
  const [showTre, setShowTre] = useState(true);
  const [showFor, setShowFor] = useState(true);
  const [showFive, setShowFive] = useState(true);
  const [showSix, setShowSix] = useState(true);

  return (
    <section className={stylesFrecuentQuestions.sectionQuestions}>
      <section className={stylesFrecuentQuestions.partLeft}>
        <h4>
          preguntas
          <br />
          <span>frecuentes</span>
        </h4>
        <div className={stylesFrecuentQuestions.questionsChannels}>
          <a href="/">
            <FontAwesomeIcon
              className={stylesFrecuentQuestions.icon}
              icon={faFacebookF}
              size="2x"
            />
          </a>
          <a href="/">
            <FontAwesomeIcon
              className={stylesFrecuentQuestions.icon}
              icon={faInstagram}
              size="2x"
            />
          </a>
          <a href="/">
            <FontAwesomeIcon
              className={stylesFrecuentQuestions.icon}
              icon={faTiktok}
              size="2x"
            />
          </a>
        </div>
      </section>
      <section className={stylesFrecuentQuestions.sectionAll}>
        {showOne ? (
          <div
            className={stylesFrecuentQuestions.questionsItem}
            onClick={() => setShowOne(false)}
          >
            <p>¿Cómo se personalizan los planes?</p>
            <div className={stylesFrecuentQuestions.boxIcon}>
              <FontAwesomeIcon
                icon={faXmark}
                className={stylesFrecuentQuestions.icon}
                size="2x"
              />
            </div>
          </div>
        ) : (
          <div className={stylesFrecuentQuestions.questionsItemOn}>
            <p>
              A través de un análisis inicial de tus metas, nivel físico y
              estilo de vida.
            </p>
            <div
              className={stylesFrecuentQuestions.boxIcon}
              onClick={() => setShowOne(true)}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className={stylesFrecuentQuestions.icon}
                size="2x"
              />
            </div>
          </div>
        )}
        <hr />
        {showTwo ? (
          <div
            className={stylesFrecuentQuestions.questionsItem}
            onClick={() => setShowTwo(false)}
          >
            <p>¿Qué diferencia a esta app de otras?</p>
            <div className={stylesFrecuentQuestions.boxIcon}>
              <FontAwesomeIcon
                icon={faXmark}
                className={stylesFrecuentQuestions.icon}
                size="2x"
              />
            </div>
          </div>
        ) : (
          <div className={stylesFrecuentQuestions.questionsItemOn}>
            <p>
              La experiencia y trayectoria de Carlos Quesada, junto con
              herramientas tecnológicas avanzadas, hacen que nuestros planes
              sean realmente únicos.
            </p>
            <div
              className={stylesFrecuentQuestions.boxIcon}
              onClick={() => setShowTwo(true)}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className={stylesFrecuentQuestions.icon}
                size="2x"
              />
            </div>
          </div>
        )}
        <hr />
        {showTre ? (
          <div
            className={stylesFrecuentQuestions.questionsItem}
            onClick={() => setShowTre(false)}
          >
            <p>¿Puedo cancelar en cualquier momento?</p>
            <div className={stylesFrecuentQuestions.boxIcon}>
              <FontAwesomeIcon
                icon={faXmark}
                className={stylesFrecuentQuestions.icon}
                size="2x"
              />
            </div>
          </div>
        ) : (
          <div className={stylesFrecuentQuestions.questionsItemOn}>
            <p>
              Sí, puedes cambiar o cancelar tu suscripción en cualquier momento
              desde la app.
            </p>
            <div
              className={stylesFrecuentQuestions.boxIcon}
              onClick={() => setShowTre(true)}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className={stylesFrecuentQuestions.icon}
                size="2x"
              />
            </div>
          </div>
        )}
        <hr />
        {showFor ? (
          <div
            className={stylesFrecuentQuestions.questionsItem}
            onClick={() => setShowFor(false)}
          >
            <p>¿Necesito equipo para realizar los entrenamientos?</p>
            <div className={stylesFrecuentQuestions.boxIcon}>
              <FontAwesomeIcon
                icon={faXmark}
                className={stylesFrecuentQuestions.icon}
                size="2x"
              />
            </div>
          </div>
        ) : (
          <div className={stylesFrecuentQuestions.questionsItemOn}>
            <p>
              No, los planes están diseñados para adaptarse a cualquier
              situación, ya sea en casa sin equipo o en el gimnasio con máquinas
              y pesas.
            </p>
            <div
              className={stylesFrecuentQuestions.boxIcon}
              onClick={() => setShowFor(true)}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className={stylesFrecuentQuestions.icon}
                size="2x"
              />
            </div>
          </div>
        )}
        <hr />
        {showFive ? (
          <div
            className={stylesFrecuentQuestions.questionsItem}
            onClick={() => setShowFive(false)}
          >
            <p>¿Puedo usar la app si tengo una condición médica o lesión?</p>
            <div className={stylesFrecuentQuestions.boxIcon}>
              <FontAwesomeIcon
                icon={faXmark}
                className={stylesFrecuentQuestions.icon}
                size="2x"
              />
            </div>
          </div>
        ) : (
          <div className={stylesFrecuentQuestions.questionsItemOn}>
            <p>
              Sí, pero te recomendamos consultar con tu médico antes de comenzar
              cualquier programa. Los planes se pueden ajustar a tus necesidades
              específicas.
            </p>
            <div
              className={stylesFrecuentQuestions.boxIcon}
              onClick={() => setShowFive(true)}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className={stylesFrecuentQuestions.icon}
                size="2x"
              />
            </div>
          </div>
        )}
        <hr />
        {showSix ? (
          <div
            className={stylesFrecuentQuestions.questionsItem}
            onClick={() => setShowSix(false)}
          >
            <p>¿La app es adecuada para principiantes?</p>
            <div className={stylesFrecuentQuestions.boxIcon}>
              <FontAwesomeIcon
                icon={faXmark}
                className={stylesFrecuentQuestions.icon}
                size="2x"
              />
            </div>
          </div>
        ) : (
          <div className={stylesFrecuentQuestions.questionsItemOn}>
            <p>
              Absolutamente. Diseñamos planes específicos para principiantes que
              te guían paso a paso hacia tu meta.
            </p>
            <div
              className={stylesFrecuentQuestions.boxIcon}
              onClick={() => setShowSix(true)}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className={stylesFrecuentQuestions.icon}
                size="2x"
              />
            </div>
          </div>
        )}
      </section>
      <section className={stylesFrecuentQuestions.bgImage}>
        <span></span>
        <Image
          src="/images/partners-one-oficial.png"
          alt="carlos-coach"
          fill={true}
          className={stylesFrecuentQuestions.img}
          priority
        />
      </section>
    </section>
  );
}
