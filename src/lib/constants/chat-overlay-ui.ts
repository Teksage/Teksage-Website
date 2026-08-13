/** Shared overlay chrome for Concise / avatar pickers (portaled above home chrome). */
export const CHAT_OVERLAY_UI = {
  root: "fixed inset-0 z-[200] flex items-end justify-center sm:items-center",
  backdrop: "absolute inset-0 bg-black/45",
  avatarSheet:
    "relative z-10 mb-0 flex max-h-[min(90dvh,42rem)] w-full max-w-lg flex-col overflow-hidden rounded-t-[2rem] pb-5 pt-3 sm:mb-0 sm:rounded-[2rem]",
  avatarDecoration:
    "pointer-events-none absolute left-0 top-0 w-24 opacity-80",
  avatarHandle: "mx-auto mb-3 h-1.5 w-14 shrink-0 rounded-full bg-white/30",
  avatarBody: "min-h-0 flex-1 overflow-y-auto overscroll-contain pb-2",
  styleMenu:
    "absolute z-10 min-w-[11rem] rounded-md bg-white py-3 shadow-[0_4px_23px_rgba(0,0,0,0.17)]",
  styleMenuItem: "flex w-full items-center gap-2.5 px-5 py-2 text-left",
  styleMenuIcon: "size-[1.125rem] shrink-0",
  styleMenuLabel: "flex-1 text-base font-medium",
  styleMenuLabelActive: "text-[var(--color-brand-primary)]",
  styleMenuLabelIdle: "text-black",
  styleMenuCheck: "size-5 shrink-0",
} as const;
