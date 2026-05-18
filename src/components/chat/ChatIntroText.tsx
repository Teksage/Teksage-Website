import { CHAT_SCREEN } from "@/lib/constants/chat-screen";

/** Empty-state copy — Flutter `chat.dart` `showInitialBanner`. */
export function ChatIntroText({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <p className="px-8 py-6 text-center text-base font-medium leading-relaxed text-black/50">
      {CHAT_SCREEN.introPrompt}
    </p>
  );
}
