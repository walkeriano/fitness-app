const CHAT_STORAGE_VERSION = 1;
const CHAT_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_STORED_MESSAGES = 20;

function getStorageKey(userId) {
  return `nutrition-chat:${userId}`;
}

function isValidRole(role) {
  return role === "user" || role === "assistant";
}

function sanitizeImage(image) {
  if (!image || typeof image.url !== "string" || !image.url.trim()) {
    return null;
  }

  return {
    url: image.url,
    alt: typeof image.alt === "string" ? image.alt : "",
    photographer:
      typeof image.photographer === "string" ? image.photographer : null,
    photographerUrl:
      typeof image.photographerUrl === "string"
        ? image.photographerUrl
        : null,
    sourceUrl: typeof image.sourceUrl === "string" ? image.sourceUrl : null,
    isFallback: image.isFallback === true,
  };
}

function sanitizeVisibleContent(content, role) {
  const normalizedContent = content.trim();

  if (role !== "assistant") {
    return normalizedContent;
  }

  return normalizedContent
    .split("\n")
    .filter(
      (line) =>
        !/^(consulta|búsqueda|query)\s+(de\s+)?(foto|fotografía|imagen|visual)(\s+en\s+inglés)?\s*:/i.test(
          line.trim(),
        ),
    )
    .join("\n")
    .trim();
}

function sanitizeMessage(message) {
  if (
    !message ||
    !isValidRole(message.role) ||
    typeof message.content !== "string" ||
    !message.content.trim()
  ) {
    return null;
  }

  const content = sanitizeVisibleContent(message.content, message.role);

  if (!content) {
    return null;
  }

  return {
    id:
      typeof message.id === "string" && message.id
        ? message.id
        : crypto.randomUUID(),
    role: message.role,
    content,
    image: sanitizeImage(message.image),
  };
}

function getPersistableMessages(messages) {
  return messages
    .filter((message) => !message.isInitial && !message.isError)
    .map(sanitizeMessage)
    .filter(Boolean)
    .slice(-MAX_STORED_MESSAGES);
}

export function loadAIChatSession(userId) {
  if (!userId || typeof window === "undefined") {
    return [];
  }

  const storageKey = getStorageKey(userId);

  try {
    const storedValue = window.localStorage.getItem(storageKey);

    if (!storedValue) {
      return [];
    }

    const session = JSON.parse(storedValue);
    const isExpired =
      typeof session.expiresAt !== "number" || Date.now() >= session.expiresAt;

    if (
      session.version !== CHAT_STORAGE_VERSION ||
      !Array.isArray(session.messages) ||
      isExpired
    ) {
      window.localStorage.removeItem(storageKey);
      return [];
    }

    return session.messages
      .map(sanitizeMessage)
      .filter(Boolean)
      .slice(-MAX_STORED_MESSAGES);
  } catch (error) {
    console.error("No se pudo recuperar la conversación temporal:", error);
    window.localStorage.removeItem(storageKey);
    return [];
  }
}

export function saveAIChatSession(userId, messages) {
  if (!userId || typeof window === "undefined") {
    return;
  }

  const persistableMessages = getPersistableMessages(messages);

  if (persistableMessages.length === 0) {
    return;
  }

  const now = Date.now();

  try {
    window.localStorage.setItem(
      getStorageKey(userId),
      JSON.stringify({
        version: CHAT_STORAGE_VERSION,
        savedAt: now,
        expiresAt: now + CHAT_TTL_MS,
        messages: persistableMessages,
      }),
    );
  } catch (error) {
    console.error("No se pudo guardar la conversación temporal:", error);
  }
}

export function removeAIChatSession(userId) {
  if (!userId || typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(getStorageKey(userId));
  } catch (error) {
    console.error("No se pudo eliminar la conversación temporal:", error);
  }
}
