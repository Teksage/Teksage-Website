import { CHAT_ASSETS } from "@/lib/constants/chat-assets";

export function ChatTypingIndicator() {
  return (
    <div className="flex items-start gap-2 px-1">
      <img src={CHAT_ASSETS.botLogo} alt="" className="size-8 shrink-0" />
      <div className="rounded-2xl bg-[var(--color-chat-bot-bubble)] px-4 py-3">
        <span className="flex gap-1">
          <span className="size-2 animate-bounce rounded-full bg-white/80 [animation-delay:0ms]" />
          <span className="size-2 animate-bounce rounded-full bg-white/80 [animation-delay:150ms]" />
          <span className="size-2 animate-bounce rounded-full bg-white/80 [animation-delay:300ms]" />
        </span>
      </div>
    </div>
  );
}
