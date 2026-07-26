"use client";
import React, { useState } from "react";
import styles from "./chatWindow.module.css";
import useAIChat from "@/state/hook/useAIChat";
import ChatMessage from "../ChatMessage";
import ChatInput from "@/components/ai/chatInput/chatInput";
import TypingIndicator from "../TypingIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function ChatWindow() {
  const { messages, loading, sendMessage } = useAIChat();
  const [openChatAi, setOpenChatAi] = useState(false);

  return (
    <>
      {openChatAi ? (
        <section className={styles.bgContainer}>
          <div className={styles.messageContainer}>
            <button onClick={() => setOpenChatAi(false)}>cerrar</button>
            <div className={styles.contenidoInteraction}>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {loading && <TypingIndicator />}
            </div>
            <ChatInput onSend={sendMessage} loading={loading} />
          </div>
        </section>
      ) : (
        <section className={styles.containerBtnActive}>
          <button
            onClick={() => setOpenChatAi(true)}
            className={styles.btnChatActive}
          >
            <h3>Buen día, ¿Qué quieres desayunar?</h3>
            <div className={styles.flexName}>
              <p>OPEN AI</p>
              <FontAwesomeIcon
                icon={faStar}
                size="2x"
                className={styles.icon}
              />
            </div>
          </button>
        </section>
      )}
    </>
  );
}
