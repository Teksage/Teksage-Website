"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { SettingsRowProps, SettingsRowVariant } from "@/types";

export type { SettingsRowVariant };

function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 text-neutral-400"
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
  const inner = (
    <div
      className={cn(
        "flex min-h-[52px] items-center justify-between gap-3 rounded-lg px-5",
        variant === "logout"
          ? "bg-[color-mix(in_srgb,var(--color-brand-error)_6%,transparent)]"
          : "bg-[color-mix(in_srgb,var(--color-brand-black)_3%,transparent)]",
        className
      )}
    >
      <span className="flex min-w-0 items-center gap-3">
        <Image
          src={iconSrc}
          alt=""
          width={24}
          height={24}
          unoptimized
          className="size-6 shrink-0"
        />
        <span
          className={cn(
            "truncate text-base font-medium",
            variant === "logout"
              ? "text-[var(--color-brand-error)]"
              : "text-[var(--color-brand-black)]"
          )}
        >
          {label}
        </span>
      </span>
      {variant === "default" && <ChevronRight />}
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
