"use client";

import Image from "next/image";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { cn } from "@/lib/utils";

type SettingsSubpageHeaderProps = {
  title: string;
  onBack: () => void;
  variant?: "white" | "dark";
  className?: string;
};

export function SettingsSubpageHeader({
  title,
  onBack,
  variant = "white",
  className,
}: SettingsSubpageHeaderProps) {
  const isDark = variant === "dark";

  return (
    <header
      className={cn(
        "relative z-20 flex min-h-[52px] items-center justify-center px-4 py-3",
        isDark ? "bg-transparent text-white" : "bg-white/80 text-[var(--color-brand-black)] backdrop-blur-[2px]",
        className
      )}
    >
      <button
        type="button"
        onClick={onBack}
        className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center"
        aria-label="Back"
      >
        <Image
          src={isDark ? SETTINGS_PAGE_ASSETS.backOnDark : SETTINGS_PAGE_ASSETS.back}
          alt=""
          width={24}
          height={24}
          unoptimized
          className="size-6"
        />
      </button>
      <h1 className="text-xl font-bold leading-none">{title}</h1>
    </header>
  );
}

