"use client";

import { useI18nConstants } from "@/hooks/useT";
import { MARATHON_COPY } from "@/lib/constants/marathon";
import { MARATHON_EMPTY_ICON_PATH, MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";
import type { MarathonListEmptyProps } from "@/types/marathon";

export function MarathonListEmpty({ upcoming }: MarathonListEmptyProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const ui = MARATHON_FLOW_UI;
  return (
    <div className={ui.emptyCard}>
      <span className={ui.emptyIcon} aria-hidden>
        <svg viewBox="0 0 24 24" className={ui.emptyGlyph} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d={MARATHON_EMPTY_ICON_PATH} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h2 className={ui.emptyTitle}>{upcoming ? copy.empty : copy.emptyPast}</h2>
      <p className={ui.emptyHint}>{upcoming ? copy.emptyUpcomingHint : copy.emptyPastHint}</p>
    </div>
  );
}
