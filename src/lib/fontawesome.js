// lib/fontawesome.js
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleUser,
  faBars,
  faArrowRight,
  faChevronDown,
  faStar,
  faCheckToSlot,
  faXmark,
  faGear,
  faCamera,
  faTriangleExclamation,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false; // Evita que FontAwesome inserte CSS automáticamente

library.add(
  faCircleUser,
  faBars,
  faArrowRight,
  faFacebook,
  faInstagram,
  faChevronDown,
  faStar,
  faCheckToSlot,
  faXmark,
  faGear,
  faCamera,
  faTriangleExclamation,
  faRightFromBracket,
);
