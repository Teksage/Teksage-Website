import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { cn } from "@/lib/utils";

export function ChatTypingIndicator() {
  return (
    <div className="flex items-start gap-2 px-1">
      <img src={CHAT_ASSETS.botLogo} alt="" className="size-8 shrink-0" />
      <div
        className={cn(
          "rounded-2xl px-4 py-3",
          CHAT_LAYOUT.botMessageBubble
        )}
      >
        <span className="flex gap-1">
          <span className="size-2 animate-bounce rounded-full bg-[var(--color-brand-primary)]/55 [animation-delay:0ms]" />
          <span className="size-2 animate-bounce rounded-full bg-[var(--color-brand-primary)]/55 [animation-delay:150ms]" />
          <span className="size-2 animate-bounce rounded-full bg-[var(--color-brand-primary)]/55 [animation-delay:300ms]" />
        </span>
      </div>
    </div>
  );
}
