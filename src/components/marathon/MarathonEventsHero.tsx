"use client";

import { MARATHON_PORTAL_UI } from "@/lib/constants/marathon";
import type { MarathonEventsHeroProps } from "@/types/marathon";

export function MarathonEventsHero({ title, subtitle, hint }: MarathonEventsHeroProps) {
  const ui = MARATHON_PORTAL_UI;

  return (
    <div className={ui.hero}>
      <div className={ui.heroIntro}>
        <div className={ui.heroIcon} aria-hidden>
          <svg viewBox="0 0 24 24" className="size-6" fill="none">
            <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 3.5v3M16 3.5v3M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
        <div className={ui.heroCopy}>
          <h1 className={ui.heroTitle}>{title}</h1>
          <p className={ui.sectionTitle}>{subtitle}</p>
          {hint ? <p className={ui.hint}>{hint}</p> : null}
        </div>
      </div>
      <svg viewBox="0 0 120 120" className={ui.heroMark} fill="none" aria-hidden>
        <circle cx="60" cy="60" r="46" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="28" stroke="currentColor" strokeWidth="1.5" />
        <path d="M60 14v92M14 60h92M27 27l66 66M93 27L27 93" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  );
}
