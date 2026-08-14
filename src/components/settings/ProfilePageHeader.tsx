"use client";

import { PROFILE_LAYOUT as L } from "@/lib/constants/profile-details";
import { cn } from "@/lib/utils";
import type { ProfilePageHeaderProps } from "@/types";

function BackChevron() {
  return (
    <svg
      className={L.pageHeaderBackIcon}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProfilePageHeader({
  title,
  subtitle,
  backLabel,
  onBack,
  action,
  className,
}: ProfilePageHeaderProps) {
  return (
    <header className={cn(L.pageHeader, className)}>
      <button type="button" onClick={onBack} className={L.pageHeaderBack}>
        <BackChevron />
        <span>{backLabel}</span>
      </button>

      <div className={L.pageHeaderIntro}>
        <div className={L.pageHeaderText}>
          <h1 className={L.pageTitle}>{title}</h1>
          {subtitle ? <p className={L.pageSubtitle}>{subtitle}</p> : null}
        </div>
        {action ? <div className={L.pageHeaderAction}>{action}</div> : null}
      </div>
    </header>
  );
}
