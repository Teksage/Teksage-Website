"use client";

import { useI18nConstants } from "@/hooks/useT";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import { CHAT_SCREEN } from "@/lib/constants/chat-screen";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/chat";

export function ChatMessageBubble({
  message,
  userInitials,
  onRetry,
}: {
  message: ChatMessage;
  userInitials: string;
  onRetry?: () => void;
}) {
  const CS = useI18nConstants(CHAT_SCREEN);
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      {!isUser ? (
        <img src={CHAT_ASSETS.botLogo} alt="" className="mr-2 mt-1 size-8 shrink-0 self-start" />
      ) : null}
      <div className="flex max-w-[min(85%,22rem)] flex-col gap-1">
        <div
          className={cn(
            "rounded-[0.9rem] px-3 py-2.5 text-[0.9375rem] leading-relaxed",
            isUser
              ? "border border-black/10 bg-[var(--color-chat-user-bubble)] text-[var(--color-chat-user-text)]"
              : "bg-[var(--color-chat-bot-bubble)] text-[var(--color-chat-bot-text)]"
          )}
        >
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
        </div>
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
        <span
          className="ml-2 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-chat-user-avatar-bg)] text-xs font-semibold text-[var(--color-chat-user-text)]"
          aria-hidden
        >
          {userInitials}
        </span>
      ) : null}
    </div>
  );
}
