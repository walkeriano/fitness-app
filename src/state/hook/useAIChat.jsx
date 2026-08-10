"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import AuthContext from "@/state/auth/auth-context";
import useUserProfile from "@/state/hook/useUserProfile";
import {
  getMissingUserContextFields,
  normalizeUserContext,
} from "@/services/ai/userContext";

function createInitialMessage(name) {
  const greeting = name ? `Hola ${name}` : "Hola";

  return {
    id: "initial-assistant-message",
    role: "assistant",
    content: `🙌🏻 ${greeting}, soy tu Chef Personal 👨🏽‍🍳. Estaré encantado de ayudarte y asesorarte en tu alimentación, recetas y nutrición.`,
    isInitial: true,
  };
}

export default function useAIChat() {
  const { user } = useContext(AuthContext);
  const {
    userProfile,
    loading: profileLoading,
    error: profileError,
  } = useUserProfile(user);
  const userContext = normalizeUserContext(userProfile);
  const [messages, setMessages] = useState(() => [createInitialMessage(null)]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const personalizedInitialMessage = createInitialMessage(userContext?.name);

    setMessages((previousMessages) =>
      previousMessages.map((message) =>
        message.isInitial ? personalizedInitialMessage : message,
      ),
    );
  }, [userContext?.name]);

  const completeMessageAnimation = useCallback((messageId) => {
    setMessages((previousMessages) =>
      previousMessages.map((message) =>
        message.id === messageId ? { ...message, animate: false } : message,
      ),
    );
  }, []);

  const sendMessage = async (text) => {
    const normalizedText = text.trim();

    if (!normalizedText || loading) {
      return false;
    }

    if (!user) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Debes iniciar sesión para utilizar el asistente.",
          isError: true,
        },
      ]);

      return false;
    }

    if (profileLoading) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Estamos cargando tu perfil. Inténtalo nuevamente en unos segundos.",
          isError: true,
        },
      ]);

      return false;
    }

    if (profileError) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "No se pudo cargar la información de tu perfil.",
          isError: true,
        },
      ]);

      return false;
    }

    const missingFields = getMissingUserContextFields(userContext);

    if (missingFields.length > 0) {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Completa tu nombre, edad, número de comidas, peso y objetivo físico para recibir respuestas personalizadas.",
          isError: true,
        },
      ]);

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

    setMessages((previousMessages) => [...previousMessages, userMessage]);

    setLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversation,
          userContext,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error?.message || "No se pudo obtener una respuesta.",
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
            error.message || "Ha ocurrido un error. Inténtalo nuevamente.",
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
