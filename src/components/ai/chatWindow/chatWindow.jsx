"use client";
import React, { useState } from "react";
import styles from "./chatWindow.module.css";
import useAIChat from "@/state/hook/useAIChat";
import ChatMessage from "../chatMessage/chatMessage";
import ChatInput from "@/components/ai/chatInput/chatInput";
import TypingIndicator from "../TypingIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faChevronDown,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function ChatWindow() {
  const { messages, loading, sendMessage, completeMessageAnimation } =
    useAIChat();
  const [openChatAi, setOpenChatAi] = useState(false);

  return (
    <>
      {openChatAi ? (
        <section className={styles.bgContainer}>
          <div className={styles.messageContainer}>
            <section className={styles.headerChat}>
              <section className={styles.flexNameBox}>
                <div className={styles.imgContainer}>
                  <Image
                    src="/images/edit-img.jpg"
                    alt="Chef Personal I.A"
                    fill={true}
                  />
                </div>
                <div className={styles.flexNameText}>
                  <h3>Chef Personal I.A</h3>
                  <p>Disponible...</p>
                </div>
              </section>
              <button
                className={styles.btnCerrar}
                onClick={() => setOpenChatAi(false)}
              >
                <FontAwesomeIcon
                  size="2x"
                  icon={faXmark}
                  className={styles.icon}
                />
              </button>
            </section>
            <div className={styles.contenidoInteraction}>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onAnimationComplete={completeMessageAnimation}
                />
              ))}
              {loading && <TypingIndicator />}
            </div>
            <ChatInput onSend={sendMessage} loading={loading} />
          </div>
        </section>
      ) : (
        <section className={styles.containerBtnActive}>
          <div className={styles.boxtitleFood}>
            <h4>Cheff Nutricionista I.A</h4>
            <div className={styles.contDetalle}>
              <p>Recetas y nutrición</p>
              <FontAwesomeIcon
                icon={faChevronDown}
                size="2x"
                className={styles.icon}
              />
            </div>
          </div>
          <Image
            src="/images/cheff-ia.png"
            alt="Chef Personal I.A"
            fill={true}
          />
          <button
            onClick={() => setOpenChatAi(true)}
            className={styles.btnChatActive}
          >
            <h3>Abrir Chat</h3>
            <FontAwesomeIcon
              icon={faArrowRight}
              size="2x"
              className={styles.icon}
            />
          </button>
        </section>
      )}
    </>
  );
}