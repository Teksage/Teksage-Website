"use client";

import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { cn } from "@/lib/utils";
import type { ChatStyleOptionCardProps } from "@/types/ui/chat";

export function ChatStyleOptionCard({
  label,
  hint,
  icon,
  selected,
  onSelect,
}: ChatStyleOptionCardProps) {
  const ui = CHAT_LAYOUT;
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(ui.styleCard, selected && ui.styleCardOn)}
    >
      <span className={ui.styleIcon}>
        <img src={icon} alt="" className={ui.styleIconImg} />
      </span>
      <span className={ui.styleCopy}>
        <span className={cn(ui.styleTitle, selected && ui.styleTitleOn)}>{label}</span>
        <span className={cn(ui.styleHint, "block")}>{hint}</span>
      </span>
      {selected ? (
        <span className={ui.styleCheck} aria-hidden>
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none">
            <path d="M5 12.5l4.2 4.2L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      ) : null}
    </button>
  );
}
