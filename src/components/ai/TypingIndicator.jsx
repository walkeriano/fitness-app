import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function TypingIndicator() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "16px",
        color: "#6b7280",
      }}
    >
      <FontAwesomeIcon icon={faSpinner} spin />
      Pensando...
    </div>
  );
}
