import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";

export function ChatTypingIndicator() {
  return (
    <div className="relative flex items-start justify-start">
      <img
        src={CHAT_ASSETS.botLogo}
        alt=""
        className={CHAT_LAYOUT.botAvatar}
      />
      <div className={CHAT_LAYOUT.botMessageCard}>
        <span className="flex gap-1 py-0.5">
          <span className="size-2 animate-bounce rounded-full bg-black/35 [animation-delay:0ms]" />
          <span className="size-2 animate-bounce rounded-full bg-black/35 [animation-delay:150ms]" />
          <span className="size-2 animate-bounce rounded-full bg-black/35 [animation-delay:300ms]" />
        </span>
      </div>
    </div>
  );
}
