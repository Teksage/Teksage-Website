"use client";

import { useI18nConstants } from "@/hooks/useT";
import { CHAT_LAYOUT, CHAT_SCREEN } from "@/lib/constants/chat-screen";

/** Compact chat title for home dashboard embed. */
export function ChatEmbedHeader() {
  const CS = useI18nConstants(CHAT_SCREEN);
  return (
    <header className={CHAT_LAYOUT.headerBlock}>
      <div className={CHAT_LAYOUT.embedHeaderBlock}>
        <h2 className={CHAT_LAYOUT.embedHeaderTitle}>{CS.title}</h2>
      </div>
    </header>
  );
}
