import { TYPO } from "./typography";

/** Voice recording bar — mirrors Flutter `chatField.dart` recording row. */
export const CHAT_VOICE_UI = {
  shell: "mt-auto shrink-0 bg-[var(--color-chat-composer-bg)] px-5 pt-3",
  row: "flex min-h-12 items-center gap-1.5",
  timer: "shrink-0 text-lg font-medium text-black/40 tabular-nums",
  waveformWrap: "flex h-20 min-w-0 flex-1 items-center justify-center",
  waveformBar: "w-1 rounded-full bg-[var(--color-brand-primary)]",
  stopButton:
    "flex shrink-0 items-center justify-center rounded-full border-[1.5px] border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)] px-3.5 py-4",
  deleteButton: "flex size-10 shrink-0 items-center justify-center",
  transcribing: `text-center ${TYPO.bodySemibold} text-[var(--color-brand-primary)]`,
  languagesHint: `text-center ${TYPO.body} text-[var(--color-brand-primary)]`,
  languagesHintWrap: "mt-2.5",
} as const;

export const CHAT_VOICE_WAVEFORM_BAR_COUNT = 48;
