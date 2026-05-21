"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { AuthGatedLink } from "@/components/common/AuthGatedLink";
import { cn } from "@/lib/utils";
import { DASHBOARD_ASSETS, HOME_DASHBOARD, HOME_LAYOUT, ROUTES } from "@/lib/constants";
import type { ConsultationBannerProps } from "@/types";

/**
 * Consultation banner — `homeBannerDeco.png` on the **left** behind the portrait
 * (design ref image 2); solid `homeBanner` + border like Flutter `homePage.dart` Stack.
 */
export function ConsultationBanner({
  isAstrologer = false,
  className,
}: ConsultationBannerProps) {
  const HD = useI18nConstants(HOME_DASHBOARD);
  const buttonLabel = isAstrologer ? HD.myProfile : HD.bookNow;
  const titleLines = isAstrologer
    ? HD.astrologerShort
    : HD.astrologerConsultationLines;
  const consultHref = isAstrologer
    ? ROUTES.consultationAstrologer
    : ROUTES.consultation;

  return (
    <div
      className={cn(
        "relative isolate w-full min-w-0 overflow-hidden",
        HOME_LAYOUT.homeBannerStripMinH,
        HOME_LAYOUT.homeCardRadius,
        "border-2 border-[var(--color-brand-banner-border)]",
        "bg-[var(--color-brand-banner)] shadow-md",
        className
      )}
    >
      <Image
        src={DASHBOARD_ASSETS.bannerDeco}
        alt=""
        width={800}
        height={400}
        sizes="100vw"
        unoptimized
        className={cn(
          "pointer-events-none absolute inset-0 z-0 h-full w-full",
          "object-contain object-left",
          "opacity-[0.55] sm:opacity-[0.62]"
        )}
      />

      <div
        className={cn(
          "relative z-10 flex w-full items-center justify-between gap-2 px-2 py-2 sm:gap-3 sm:px-3 sm:py-2.5",
          HOME_LAYOUT.homeBannerStripMinH
        )}
      >
        <div
          className={cn(
            "relative z-[1] flex w-[4.75rem] shrink-0 justify-center self-end sm:w-[5.25rem]",
            "pt-2.5 pb-0.5 sm:pt-3 sm:pb-1"
          )}
        >
          <Image
            src={DASHBOARD_ASSETS.consultationAstrologer}
            alt=""
            width={120}
            height={160}
            unoptimized
            className="h-auto max-h-[5.25rem] w-auto max-w-full object-contain object-bottom sm:max-h-[5.5rem] lg:max-h-[6rem]"
          />
        </div>

        <p
          className={cn(
            "min-w-0 flex-1 whitespace-pre-line text-center text-[0.8125rem] font-bold leading-snug sm:text-[0.95rem] lg:text-base",
            "text-[var(--color-brand-consultation-heading)]"
          )}
        >
          {titleLines}
        </p>

        <AuthGatedLink
          href={consultHref}
          returnPath={consultHref}
          redirectHomeOnClose
          className={cn(
            "flex w-[4.75rem] shrink-0 items-center justify-center rounded-full bg-white px-2 py-2 text-center sm:w-[5rem] sm:px-2.5 sm:py-2.5",
            "text-[10px] font-semibold leading-tight text-[var(--color-brand-banner-dark)] sm:text-[11px]",
            "whitespace-pre-line shadow-sm transition-opacity hover:opacity-90"
          )}
        >
          {buttonLabel}
        </AuthGatedLink>
      </div>
    </div>
  );
}
