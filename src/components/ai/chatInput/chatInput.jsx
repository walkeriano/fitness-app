import styles from "./chatInput.module.css";
import { useState } from "react";

export default function ChatInput({ onSend, loading }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    await onSend(text);

    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.contanerInput}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe tu pregunta..."
      />

      <button
        disabled={loading}
        type="submit"
      >
        Enviar
      </button>
    </form>
  );
}