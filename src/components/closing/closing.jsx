import styles from "./closing.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Closing({ goUp }) {
  const scrollUp = () => {
    goUp.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.closing}>
      <section onClick={scrollUp} className={styles.btn}>
        <span></span>
        <span></span>
        <span></span>
        <FontAwesomeIcon
          icon={faArrowRight}
          size="2x"
          className={styles.icon}
        />
      </section>
      <p>fitness coach app</p>
    </section>
  );
}
