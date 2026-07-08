"use client";

import { useI18nConstants } from "@/hooks/useT";
import Link from "next/link";
import { MUHURTHA_LAYOUT, MUHURTHA_SCREEN, ROUTES } from "@/lib/constants";

export function PanchangMuhurthaCta() {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const L = MUHURTHA_LAYOUT;

  return (
    <div className={L.panchangCtaWrap}>
      <Link href={ROUTES.muhurtha} className={L.panchangCtaLink}>
        <span>
          <span className="block">{M.panchangCta}</span>
          <span className="mt-0.5 block text-xs font-normal text-[var(--color-brand-black)]/60">
            {M.panchangCtaHint}
          </span>
        </span>
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
