"use client";

import { useI18nConstants } from "@/hooks/useT";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import { CHAT_LAYOUT, CHAT_SCREEN } from "@/lib/constants/chat-screen";
import { cn } from "@/lib/utils";
import type { ChatComposerProps } from "@/types/ui/chat";

export function ChatComposer({
  value,
  onChange,
  onSend,
  disabled,
  placeholder,
  onMicPress,
  isRecording = false,
  isTranscribing = false,
  micDisabled = false,
  preferenceBar,
  embedded = false,
}: ChatComposerProps) {
  const CS = useI18nConstants(CHAT_SCREEN);
  const canSend = Boolean(value.trim()) && !disabled && !isTranscribing;
  const micBusy = disabled || micDisabled || isTranscribing;

  return (
    <div
      className={cn(
        CHAT_LAYOUT.composerShell,
        "mt-auto shrink-0 px-5 pt-3",
        embedded
          ? "pb-2 lg:pb-2"
          : "pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]"
      )}
    >
      <form
        className="flex items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (canSend) onSend();
        }}
      >
        <div
          className={cn(
            "flex min-h-12 flex-1 items-center rounded-full border border-black/10 bg-white pl-5 pr-1.5"
          )}
        >
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder={placeholder}
            rows={1}
            className={cn(
              "max-h-28 min-h-[2.75rem] flex-1 resize-none border-0 bg-transparent py-2.5",
              "text-base leading-snug text-black outline-none",
              "placeholder:text-black/40 disabled:opacity-60"
            )}
            aria-label={placeholder}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (canSend) onSend();
              }
            }}
          />
          <button
            type="submit"
            disabled={!canSend}
            className={cn(
              "mb-1.5 flex size-10 shrink-0 items-center justify-center rounded-full",
              "bg-[var(--color-brand-primary)] disabled:bg-black/20"
            )}
            aria-label={CS.sendAria}
          >
            <img src={CHAT_ASSETS.send} alt="" className="size-5 brightness-0 invert" />
          </button>
        </div>
        <button
          type="button"
          disabled={micBusy}
          onClick={onMicPress}
          className={cn(
            "mb-0.5 flex size-12 shrink-0 items-center justify-center rounded-full border-[1.5px]",
            "border-[var(--color-brand-primary)] disabled:opacity-50",
            isRecording
              ? "bg-[color-mix(in_srgb,var(--color-brand-primary)_20%,white)]"
              : "bg-transparent"
          )}
          aria-label={CS.composerPlaceholder}
          aria-pressed={isRecording}
        >
          <img
            src={CHAT_ASSETS.mic}
            alt=""
            className={cn("size-6", isRecording && "animate-pulse")}
          />
        </button>
      </form>
      {preferenceBar}
    </div>
  );
}
