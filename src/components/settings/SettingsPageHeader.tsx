"use client";

import { SETTINGS_LAYOUT as L } from "@/lib/constants/settings-layout";
import { cn } from "@/lib/utils";
import type { SettingsPageHeaderProps } from "@/types";

function BackChevron() {
  return (
    <svg
      className={L.subpageBackIcon}
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

export function SettingsPageHeader({
  title,
  subtitle,
  backLabel,
  onBack,
  action,
  className,
}: SettingsPageHeaderProps) {
  return (
    <header className={cn(L.subpageHeader, className)}>
      <button type="button" onClick={onBack} className={L.subpageBack}>
        <BackChevron />
        <span>{backLabel}</span>
      </button>

      <div className={L.subpageIntro}>
        <div className={L.subpageText}>
          <h1 className={L.subpageTitle}>{title}</h1>
          {subtitle ? <p className={L.subpageSubtitle}>{subtitle}</p> : null}
        </div>
        {action ? <div className={L.subpageAction}>{action}</div> : null}
      </div>
    </header>
  );
}
