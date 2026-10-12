"use client";

import { MarathonRegisterTimer } from "@/components/marathon/MarathonRegisterTimer";
import { useT } from "@/hooks/useT";
import { MARATHON_PORTAL_UI } from "@/lib/constants/marathon";
import { cn } from "@/lib/utils";
import type { MarathonPortalCardProps } from "@/types/marathon";

function dateParts(iso: string, locale: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return { day: "", month: "" };
  return {
    day: date.toLocaleString(locale, { day: "2-digit" }),
    month: date.toLocaleString(locale, { month: "short" }).toUpperCase(),
  };
}

function CalendarMark() {
  return (
    <svg viewBox="0 0 24 24" className={MARATHON_PORTAL_UI.icon} fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3.5v3M16 3.5v3M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ClockMark() {
  return (
    <svg viewBox="0 0 24 24" className={MARATHON_PORTAL_UI.icon} fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v4.5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function MarathonPortalCard({
  startsAt,
  locale,
  title,
  lines,
  categories = [],
  closesAt,
  status,
  onOpen,
  children,
}: MarathonPortalCardProps) {
  const ui = MARATHON_PORTAL_UI;
  const { t } = useT();
  const parts = dateParts(startsAt, locale);

  return (
    <article className={cn(ui.card, onOpen && "cursor-pointer")} onClick={onOpen}>
      <div className={ui.cardBody}>
        <div className={ui.row}>
          <div className={ui.dateTile}>
            <span className={ui.dateDay}>{parts.day}</span>
            <span className={ui.dateMonth}>{parts.month}</span>
          </div>
          <div className={ui.copy}>
            <p className={ui.name}>
              <CalendarMark />
              {title}
            </p>
            {lines.map((line) => (
              <p key={line} className={ui.when}>
                <ClockMark />
                {line}
              </p>
            ))}
            {categories.length > 0 ? (
              <div className={ui.chips}>
                {categories.map((name) => (
                  <span key={name} className={ui.chip}>{t(name)}</span>
                ))}
              </div>
            ) : null}
            {status ? <p className={ui.timer}>{status}</p> : null}
            {!status && closesAt ? <MarathonRegisterTimer closesAt={closesAt} className={ui.timer} /> : null}
          </div>
          {onOpen || !closesAt ? (
            <svg viewBox="0 0 24 24" className={ui.chevron} fill="none" aria-hidden>
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : null}
        </div>
        {children ? (
          <div className={ui.actionRow} onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
            {children}
          </div>
        ) : null}
      </div>
    </article>
  );
}
