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
            <p>¿Preguntas frecuentes?</p>
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
            <p>respuesta</p>
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
            <p>¿Preguntas frecuentes?</p>
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
            <p>respuesta</p>
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
            <p>¿Preguntas frecuentes?</p>
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
            <p>respuesta</p>
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
            <p>¿Preguntas frecuentes?</p>
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
            <p>respuesta</p>
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
      </section>
      <section className={stylesFrecuentQuestions.bgImage}>
        <span></span>
        <Image
          src="/images/partners-one.png"
          alt="kerby-coach"
          fill={true}
          className={stylesFrecuentQuestions.img}
        />
      </section>
    </section>
  );
}
