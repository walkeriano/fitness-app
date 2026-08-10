import { useState } from "react";
import styles from "./chatInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


const MAX_MESSAGE_LENGTH = 1000;

export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState("");

  const normalizedText = text.trim();
  const canSend = normalizedText.length > 0 && !loading;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!canSend) {
      return;
    }

    const sentSuccessfully = await onSend(normalizedText);

    if (sentSuccessfully) {
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.contanerInput}
    >
      <input
        type="text"
        value={text}
        maxLength={MAX_MESSAGE_LENGTH}
        disabled={loading}
        autoComplete="off"
        aria-label="Pregunta para el asistente nutricional"
        placeholder="Escribe tu pregunta..."
        onChange={(event) => setText(event.target.value)}
      />

      <button
        type="submit"
        disabled={!canSend}
      >
        {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Enviar"}
      </button>
    </form>
  );
}