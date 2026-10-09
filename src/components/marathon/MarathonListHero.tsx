"use client";

import { useI18nConstants } from "@/hooks/useT";
import { MARATHON_ASSETS } from "@/lib/constants/assets";
import { MARATHON_COPY, MARATHON_PAGE } from "@/lib/constants/marathon";

export function MarathonListHero() {
  const copy = useI18nConstants(MARATHON_COPY);
  const ui = MARATHON_PAGE;

  return (
    <section className={ui.hero}>
      <img src={MARATHON_ASSETS.heroArt} alt="" className={ui.heroArt} />
      <div className={ui.heroCopy}>
        <p className={ui.heroBadge}>
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" aria-hidden>
            <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 3.5V7M16 3.5V7M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          {copy.nextSession}
        </p>
        <h1 className={ui.heroTitle}>{copy.title}</h1>
        <p className={ui.heroSub}>{copy.subtitle}</p>
        <p className={ui.heroTags}>
          <span className="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
              <path d="M12 3l7 3v6c0 4.5-2.8 7.4-7 9-4.2-1.6-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" />
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {copy.guidance}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
              <path d="M12 2l1.6 6.2L20 10l-6.4 1.8L12 18l-1.6-6.2L4 10l6.4-1.8L12 2z" />
            </svg>
            {copy.tomorrows}
          </span>
        </p>
      </div>
    </section>
  );
}
