"use client";

import Link from "next/link";
import { MUHURTHA_LAYOUT, ROUTES } from "@/lib/constants";
import type { MuhurthaFeatureHeroProps } from "@/types";

function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.73 21a2 2 0 0 1-3.46 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M19 12H5M5 12L12 19M5 12L12 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MuhurthaFeatureHero({
  title,
  subtitle,
  showNotification = true,
  showBack = true,
  backHref = ROUTES.home,
}: MuhurthaFeatureHeroProps) {
  const L = MUHURTHA_LAYOUT;

  return (
    <header className={L.heroHeader}>
      <div className={L.heroCopy}>
        <h1 className={L.heroTitle}>{title}</h1>
        {subtitle ? <p className={L.heroSubtitle}>{subtitle}</p> : null}
      </div>
      {showBack ? (
        <Link href={backHref} className={L.heroBackBtn} aria-label="Go back">
          <BackIcon />
        </Link>
      ) : null}
      {showNotification ? (
        <Link href={ROUTES.notifications} className={L.heroNotification} aria-label="Notifications">
          <BellIcon />
        </Link>
      ) : null}
    </header>
  );
}
