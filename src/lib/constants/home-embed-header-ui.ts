import { TYPO } from "@/lib/constants/typography";

/** Home desktop — two-column header aligned to sidebar + chat panes. */
export const HOME_EMBED_HEADER_UI = {
  desktopTopHeader: "hidden w-full shrink-0 items-stretch bg-white lg:flex",
  /** Same width as `DesktopMainNav` — sits above the sidebar only. */
  brandColumn:
    "flex items-center gap-2 border-b border-r border-neutral-200/90 px-4 py-3",
  brandWordmark: `${TYPO.bodySemibold} truncate capitalize text-[color:var(--color-brand-panchang)]`,
  /** Fills remaining width — sits above the chat pane only. */
  timingColumn: "min-w-0 flex-1 border-b border-neutral-200/90",
  logoPx: 36,
} as const;
