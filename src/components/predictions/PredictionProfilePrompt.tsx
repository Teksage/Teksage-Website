"use client";

import Link from "next/link";
import { useI18nConstants } from "@/hooks/useT";
import { EmptyState } from "@/components/common/EmptyState";
import { buttonVariants } from "@/components/ui/button";
import { HOROSCOPE_SCREEN } from "@/lib/constants/horoscope-screen";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

/** Flutter `ProfilePage(isProfileUpdated: false)` gate for prediction routes. */
export function PredictionProfilePrompt({ className }: { className?: string }) {
  const H = useI18nConstants(HOROSCOPE_SCREEN);

  return (
    <EmptyState
      className={className}
      title={H.profileIncompleteTitle}
      description={H.profileIncompleteDescription}
      action={
        <Link href={ROUTES.profile} className={cn(buttonVariants(), "rounded-full")}>
          {H.profileCta}
        </Link>
      }
    />
  );
}
