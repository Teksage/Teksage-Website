"use client";

import Image from "next/image";
import Link from "next/link";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import { cn } from "@/lib/utils";
import type { SettingsRowProps, SettingsRowVariant } from "@/types";

export type { SettingsRowVariant };

function ChevronRight() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={SETTINGS_UI.rowChevron}
      aria-hidden
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SettingsRow({
  label,
  iconSrc,
  variant = "default",
  href,
  onClick,
  className,
}: SettingsRowProps) {
  const isLogout = variant === "logout";
  const inner = (
    <div
      className={cn(
        SETTINGS_UI.rowShell,
        isLogout ? SETTINGS_UI.rowLogout : SETTINGS_UI.rowDefault,
        className
      )}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span
          className={
            isLogout ? SETTINGS_UI.rowIconWrapLogout : SETTINGS_UI.rowIconWrap
          }
        >
          <Image
            src={iconSrc}
            alt=""
            width={20}
            height={20}
            unoptimized
            className={SETTINGS_UI.rowIcon}
          />
        </span>
        <span
          className={isLogout ? SETTINGS_UI.rowLabelLogout : SETTINGS_UI.rowLabel}
        >
          {label}
        </span>
      </span>
      {!isLogout ? <ChevronRight /> : null}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-full">
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="block w-full text-left">
      {inner}
    </button>
  );
}
