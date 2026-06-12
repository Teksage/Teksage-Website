import { TYPO } from "@/lib/constants/typography";

export const VOICE_ANSWER_PLAYER_COPY = {
  playAria: "Play voice answer",
  pauseAria: "Pause voice answer",
  seekAria: "Seek voice answer",
} as const;

export const VOICE_ANSWER_PLAYER_UI = {
  shell:
    "w-full min-w-0 rounded-2xl bg-neutral-100 px-3 py-2.5 ring-1 ring-black/5 sm:rounded-full lg:px-4 lg:py-2.5",
  row: "flex min-w-0 items-center gap-2.5 lg:gap-3",
  playBtn:
    "flex size-8 shrink-0 items-center justify-center rounded-full text-[var(--color-brand-black)] hover:bg-black/5 lg:size-9",
  progressWrap: "min-w-0 flex-1 overflow-hidden",
  progressTrack: "h-1.5 cursor-pointer overflow-hidden rounded-full bg-black/15",
  progressFill: "h-full rounded-full bg-[var(--color-brand-black)] transition-[width]",
  timeRow: `mt-1.5 flex items-center justify-between gap-2 ${TYPO.size2xs} tabular-nums text-black/55 lg:${TYPO.sizeXs}`,
  timeLabel: "shrink-0 min-w-[2.75rem] text-right first:text-left",
  skeleton: "h-11 w-full min-w-0 animate-pulse rounded-2xl bg-black/10 sm:rounded-full lg:h-11",
} as const;
