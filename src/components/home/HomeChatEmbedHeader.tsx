"use client";

import { useI18nConstants } from "@/hooks/useT";
import { HOME_PANCHANG_TIMING_UI } from "@/lib/constants/home-panchang-timing-ui";
import { CHAT_LAYOUT, CHAT_SCREEN } from "@/lib/constants/chat-screen";
import { cn } from "@/lib/utils";

/** Home embed — AI chat title block (brand + timings live in `HomeDesktopTopHeader`). */
export function HomeChatEmbedHeader() {
  const CS = useI18nConstants(CHAT_SCREEN);

  return (
    <header className={cn(CHAT_LAYOUT.headerBlock, "relative z-30 shrink-0")}>
      <div className={HOME_PANCHANG_TIMING_UI.embedTitleBlock}>
        <h2 className={HOME_PANCHANG_TIMING_UI.embedTitle}>{CS.title}</h2>
        <p className={HOME_PANCHANG_TIMING_UI.embedSubtitle}>{CS.subtitleTag}</p>
      </div>
    </header>
  );
}
