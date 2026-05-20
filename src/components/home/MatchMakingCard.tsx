"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DASHBOARD_ASSETS, HOME_DASHBOARD, HOME_LAYOUT, ROUTES } from "@/lib/constants";
import type { MatchMakingCardProps } from "@/types";

export function MatchMakingCard({
  isLoggedIn,
  hasExistingMatch = false,
  className,
}: MatchMakingCardProps) {
  const HD = useI18nConstants(HOME_DASHBOARD);
  const href = isLoggedIn
    ? hasExistingMatch
      ? ROUTES.matchmakingDetails
      : ROUTES.matchmaking
    : ROUTES.login;

  return (
    <Link href={href} className={cn("group block flex-1", className)}>
      <div
        className={cn(
          "relative flex flex-col overflow-hidden bg-white",
          HOME_LAYOUT.featureCardHeight,
          HOME_LAYOUT.homeCardRadius,
          "shadow-[0_4px_20px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.05]"
        )}
      >
        <div className="relative z-10 flex shrink-0 justify-center px-2 pt-5">
          <p className="whitespace-pre-line text-center text-base font-bold leading-tight text-[var(--color-brand-marriage)]">
            {HD.marriageMatchMakingLines}
          </p>
        </div>

        <div className="relative mt-auto flex flex-1 items-end justify-center pb-1 pt-2">
          <Image
            src={DASHBOARD_ASSETS.marriageHero}
            alt=""
            width={158}
            height={94}
            unoptimized
            className="max-h-[5.25rem] w-[108%] max-w-none object-contain object-bottom"
          />
        </div>
      </div>
    </Link>
  );
}
