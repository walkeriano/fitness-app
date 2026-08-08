"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./chatMessage.module.css";

const WORD_DELAY_MS = 55;

export default function ChatMessage({ message, onAnimationComplete }) {
  const isUser = message.role === "user";
  const words = useMemo(
    () => message.content.match(/\S+\s*/g) || [],
    [message.content]
  );
  const shouldAnimate = !isUser && message.animate === true;
  const [visibleWords, setVisibleWords] = useState(
    shouldAnimate ? 0 : words.length
  );

  useEffect(() => {
    if (!shouldAnimate) {
      setVisibleWords(words.length);
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || words.length === 0) {
      setVisibleWords(words.length);
      onAnimationComplete?.(message.id);
      return;
    }

    setVisibleWords(0);

    const intervalId = window.setInterval(() => {
      setVisibleWords((currentValue) => {
        const nextValue = currentValue + 1;

        if (nextValue >= words.length) {
          window.clearInterval(intervalId);
          onAnimationComplete?.(message.id);
          return words.length;
        }

        return nextValue;
      });
    }, WORD_DELAY_MS);

    return () => window.clearInterval(intervalId);
  }, [message.id, onAnimationComplete, shouldAnimate, words]);

  const visibleContent = shouldAnimate
    ? words.slice(0, visibleWords).join("")
    : message.content;

  return (
    <div className={isUser ? styles.userMessage : styles.aiMessage}>
      <div className={isUser ? styles.messageContent : styles.aiMessageContent}>
        <p aria-label={message.content}>
          {visibleContent}
          {shouldAnimate && visibleWords < words.length && (
            <span className={styles.cursor} aria-hidden="true" />
          )}
        </p>
      </div>
    </div>
  );
}
