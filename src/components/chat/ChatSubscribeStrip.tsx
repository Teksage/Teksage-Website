"use client";

import { useI18nConstants } from "@/hooks/useT";
import { CHAT_LAYOUT, CHAT_SCREEN } from "@/lib/constants/chat-screen";
import { cn } from "@/lib/utils";

type ChatSubscribeStripProps = {
  message: string;
  onPlansClick: () => void;
  className?: string;
};

/** Flutter chat composer replacement when free limit or expired plan is hit. */
export function ChatSubscribeStrip({ message, onPlansClick, className }: ChatSubscribeStripProps) {
  const CS = useI18nConstants(CHAT_SCREEN);

  return (
    <div
      className={cn(
        "relative z-10 shrink-0 px-5 py-4 text-center",
        CHAT_LAYOUT.composerShell,
        className
      )}
    >
      <p className="text-base font-semibold leading-snug text-[var(--color-brand-error)]">
        {message}
      </p>
      <button
        type="button"
        onClick={onPlansClick}
        className="mt-3 rounded-full bg-[var(--color-brand-primary)] px-8 py-2.5 text-base font-semibold text-white"
      >
        {CS.plansCta}
      </button>
    </div>
  );
}
