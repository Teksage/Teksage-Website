"use client";

import { useI18nConstants } from "@/hooks/useT";
import { CHAT_SCREEN } from "@/lib/constants/chat-screen";

/** Empty-state copy — Flutter `chat.dart` `showInitialBanner`. */
export function ChatIntroText({ visible }: { visible: boolean }) {
  const CS = useI18nConstants(CHAT_SCREEN);
  if (!visible) return null;
  return (
    <p className="px-8 py-6 text-center text-base font-medium leading-relaxed text-black/50">
      {CS.introPrompt}
    </p>
  );
}
