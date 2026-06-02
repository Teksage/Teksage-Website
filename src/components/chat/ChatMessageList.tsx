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
    <div
      className={cn(
        "relative z-10 flex flex-col gap-3 py-3",
        CHAT_LAYOUT.messageGutter
      )}
    >
      {messages.map((message) => (
        <ChatMessageBubble
          key={message.id}
          message={message}
          userInitials={userInitials}
          onRetry={
            message.role === "user" && message.status === "failed"
              ? () => onRetry(message.id)
              : undefined
          }
        />
      ))}
      {showTyping ? <ChatTypingIndicator /> : null}
      <div ref={listEndRef} className="h-px shrink-0" aria-hidden />
    </div>
  );
}
