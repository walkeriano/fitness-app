import styles from "./chatMessage.module.css";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={isUser ? styles.userMessage : styles.aiMessage}>
      <div className={isUser ? styles.messageContent : styles.aiMessageContent}>
        <p>{message.content}</p>
      </div>
    </div>
  );
}
