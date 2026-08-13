"use client";

import { useI18nConstants } from "@/hooks/useT";
import { ChatAssistantAudioSlot } from "@/components/chat/ChatAssistantAudioSlot";
import { ChatMessageActions } from "@/components/chat/ChatMessageActions";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import { CHAT_LAYOUT, CHAT_SCREEN } from "@/lib/constants/chat-screen";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/chat";

export function ChatMessageBubble({
  message,
  userInitials,
  userQuestion,
  onRetry,
}: {
  message: ChatMessage;
  userInitials: string;
  /** Text of the preceding user message — enables Ask Astrologer / Book Consultation actions. */
  userQuestion?: string;
  onRetry?: () => void;
}) {
  const CS = useI18nConstants(CHAT_SCREEN);
  const isUser = message.role === "user";
  const showActions = !isUser && Boolean(userQuestion);

  return (
    <div className={cn("relative flex w-full", isUser ? "justify-end" : "justify-start")}>
      {!isUser ? (
        <img
          src={CHAT_ASSETS.botLogo}
          alt=""
          className={CHAT_LAYOUT.botAvatar}
        />
      ) : null}
      <div className={CHAT_LAYOUT.messageColumn}>
        <div
          className={
            isUser ? CHAT_LAYOUT.userMessageCard : CHAT_LAYOUT.botMessageCard
          }
        >
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
          {!isUser ? (
            <ChatAssistantAudioSlot
              audioBase64={message.audioBase64}
              audioPending={message.audioPending}
            />
          ) : null}
        </div>
        {showActions ? (
          <ChatMessageActions
            userQuestion={userQuestion!}
            aiResponse={message.text}
          />
        ) : null}
        {isUser && message.status === "failed" ? (
          <div className="flex items-center justify-end gap-2 text-xs">
            <span className="text-[var(--color-brand-error)]">{CS.noResponseLabel}</span>
            <button
              type="button"
              onClick={onRetry}
              className="font-medium text-[var(--color-brand-ios)]"
            >
              {CS.retryLabel}
            </button>
          </div>
        ) : null}
      </div>
      {isUser ? (
        <span className={CHAT_LAYOUT.userAvatar} aria-hidden>
          {userInitials}
        </span>
      ) : null}
    </div>
  );
}
