import { ChatMessageBubble } from "@/components/chat/ChatMessageBubble";
import { ChatTypingIndicator } from "@/components/chat/ChatTypingIndicator";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { cn } from "@/lib/utils";
import type { ChatMessageListProps } from "@/types/ui/chat";

export function ChatMessageList({
  messages,
  userInitials,
  onRetry,
  listEndRef,
  showTyping,
}: ChatMessageListProps) {
  return (
    <div className={cn(CHAT_LAYOUT.messageGutter, CHAT_LAYOUT.messageList)}>
      <div className={CHAT_LAYOUT.messageListGlow} aria-hidden />
      {messages.map((message, index) => {
        const prevUserQuestion =
          message.role === "assistant" &&
          index > 0 &&
          messages[index - 1].role === "user"
            ? messages[index - 1].text
            : undefined;

        return (
          <ChatMessageBubble
            key={message.id}
            message={message}
            userInitials={userInitials}
            userQuestion={prevUserQuestion}
            onRetry={
              message.role === "user" && message.status === "failed"
                ? () => onRetry(message.id)
                : undefined
            }
          />
        );
      })}
      {showTyping ? <ChatTypingIndicator /> : null}
      <div ref={listEndRef} className="h-px shrink-0" aria-hidden />
    </div>
  );
}
