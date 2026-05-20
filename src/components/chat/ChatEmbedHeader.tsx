"use client";

import { useI18nConstants } from "@/hooks/useT";
import { CHAT_LAYOUT, CHAT_SCREEN } from "@/lib/constants/chat-screen";

/** Compact chat title for home dashboard embed. */
export function ChatEmbedHeader() {
  const CS = useI18nConstants(CHAT_SCREEN);
  return (
    <header className={CHAT_LAYOUT.headerBlock}>
      <div className="px-4 py-3 text-center">
        <h2 className="text-base font-bold text-white">{CS.title}</h2>
        <p className="mt-1 text-xs font-semibold text-white/90">{CS.subtitleTag}</p>
      </div>
    </header>
  );
}
