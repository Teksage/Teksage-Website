"use client";

import { CHAT_PREFERENCE_ASSETS } from "@/lib/constants/chat-preferences";
import { cn } from "@/lib/utils";
import type { ChatStyleOptionCardProps } from "@/types/ui/chat";

export function ChatStyleOptionCard({
  label,
  hint,
  selected,
  onSelect,
}: ChatStyleOptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full rounded-xl border px-4 py-5 text-left transition-colors",
        selected
          ? "border-[var(--color-brand-primary)]"
          : "border-black/12"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "text-lg font-semibold",
            selected ? "text-[var(--color-brand-primary)]" : "text-black"
          )}
        >
          {label}
        </span>
        {selected ? (
          <img src={CHAT_PREFERENCE_ASSETS.selectCheck} alt="" className="size-5 shrink-0" />
        ) : null}
      </div>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-black/60">{hint}</p>
    </button>
  );
}
