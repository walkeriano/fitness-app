import styles from "./sliderCasos.module.css";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function SliderCasos() {
  return (
    <section className={styles.sliderContainer}>
      <section className={styles.overflow}>
        <section className={styles.contAnimator}>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-01.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-02.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-03.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-04.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-05.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-06.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-07.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-08.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-09.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-10.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-11.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-12.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-13.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-14.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-15.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
          <section className={styles.object}>
            <div className={styles.imageBox}>
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  size="2x"
                  className={styles.icon}
                />
              </span>
              <div className={styles.contFirst}>
                <Image src="/images/caso-16.jpg" alt="woman" fill={true} />
              </div>
            </div>
            <div className={styles.comment}>
              <div className={styles.textComment}>
                <h3>Sin Carlos y Karina no hubiera sido posible</h3>
              </div>
              <span>
                <p>Marta Gonzales</p>
                <div>
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className={styles.icon}
                  />
                  <FontAwesomeIcon
                    icon={faInstagram}
                    size="2x"
                    className={styles.icon}
                  />
                </div>
              </span>
            </div>
          </section>
        </section>
      </section>
      <Link href="/suscripcion-mensual" className={styles.btnSuscripcion}>
        suscribirme ahora
        <span>
          <FontAwesomeIcon
            icon={faArrowRight}
            size="2x"
            className={styles.icon}
          />
        </span>
      </Link>
      <div className={styles.blur}></div>
    </section>
  );
}
