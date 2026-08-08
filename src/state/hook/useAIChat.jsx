"use client";

import { useCallback, useState } from "react";

const INITIAL_MESSAGE = {
  id: "initial-assistant-message",
  role: "assistant",
  content:
    "👋 Hola. Soy tu asistente nutricional. Pregúntame sobre alimentación, recetas o hábitos saludables.",
  isInitial: true,
};

export default function useAIChat() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [loading, setLoading] = useState(false);

  const completeMessageAnimation = useCallback((messageId) => {
    setMessages((previousMessages) =>
      previousMessages.map((message) =>
        message.id === messageId
          ? { ...message, animate: false }
          : message
      )
    );
  }, []);

  const sendMessage = async (text) => {
    const normalizedText = text.trim();

    if (!normalizedText || loading) {
      return false;
    }

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: normalizedText,
    };

    const previousConversation = messages
      .filter((message) => !message.isInitial && !message.isError)
      .map(({ role, content }) => ({
        role,
        content,
      }));

    const conversation = [
      ...previousConversation,
      {
        role: userMessage.role,
        content: userMessage.content,
      },
    ];

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversation,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error?.message || "No se pudo obtener una respuesta."
        );
      }

      if (typeof data.answer !== "string" || !data.answer.trim()) {
        throw new Error("El asistente devolvió una respuesta vacía.");
      }

      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer.trim(),
        animate: true,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);

      return true;
    } catch (error) {
      console.error("Error enviando mensaje al asistente:", error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            error.message ||
            "Ha ocurrido un error. Inténtalo nuevamente.",
          isError: true,
        },
      ]);

      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    sendMessage,
    completeMessageAnimation,
  };
}
