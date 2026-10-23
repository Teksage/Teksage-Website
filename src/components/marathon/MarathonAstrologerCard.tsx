"use client";

import { marathonDateParts, marathonTimeRange } from "@/lib/marathon-display";
import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";
import { cn } from "@/lib/utils";
import type { MarathonAstrologerCardProps } from "@/types/marathon";

/** Astrologer event / booking card — mirrors the user-flow `MarathonEventFact` card. */
export function MarathonAstrologerCard({
  startsAt,
  endsAt,
  locale,
  timeZone,
  category,
  status,
  active,
  title,
  lines = [],
  summary,
  onOpen,
  children,
}: MarathonAstrologerCardProps) {
  const ui = MARATHON_FLOW_UI;
  const when = marathonDateParts(startsAt, timeZone, locale);
  const end = endsAt ? marathonDateParts(endsAt, timeZone, locale) : null;
  const dotClass = active ? ui.dotMark : ui.dotOff;
  const textClass = active ? ui.dotText : ui.dotMuted;

  return (
    <article className={cn(ui.card, onOpen && "cursor-pointer")} onClick={onOpen}>
      <div className={ui.dotRow}>
        {category ? (
          <p className={ui.categoryBadge}>
            <span className={dotClass} aria-hidden />
            <span className={cn(textClass, "truncate")}>{category}</span>
          </p>
        ) : null}
        <div className={cn(ui.dot, "ml-auto")}>
          <span className={dotClass} aria-hidden />
          <span className={textClass}>{status}</span>
        </div>
      </div>
      <h2 className={ui.factTitle}>{title}</h2>
      {lines.map((line) => (
        <p key={line} className={ui.cardLine}>{line}</p>
      ))}
      <div className={ui.dateRow}>
        <div className={ui.dateTile}>
          <span className={ui.dateDay}>{when.day}</span>
          <span className={ui.dateMonth}>{when.month.toUpperCase()}</span>
        </div>
        <div className={ui.dateCopy}>
          <p className={ui.weekday}>{when.weekday}</p>
          <p className={ui.hours}>{end ? marathonTimeRange(when.time, end.time) : when.time}</p>
        </div>
        {summary ? <p className={ui.slots}>{summary}</p> : null}
      </div>
      {children ? (
        <div
          className={ui.actions}
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      ) : null}
    </article>
  );
}
