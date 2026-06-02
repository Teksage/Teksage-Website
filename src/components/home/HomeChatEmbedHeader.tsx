"use client";

import { useI18nConstants } from "@/hooks/useT";
import { CHAT_LAYOUT, CHAT_SCREEN } from "@/lib/constants/chat-screen";
import { cn } from "@/lib/utils";

/** Home embed — AI chat title block (brand + timings live in `HomeDesktopTopHeader`). */
export function HomeChatEmbedHeader() {
  const CS = useI18nConstants(CHAT_SCREEN);

  return (
    <header className={cn(CHAT_LAYOUT.headerBlock, "relative z-30 shrink-0")}>
      <div className={CHAT_LAYOUT.embedHeaderBlock}>
        <h2 className={CHAT_LAYOUT.embedHeaderTitle}>{CS.title}</h2>
      </div>
    </header>
  );
}
