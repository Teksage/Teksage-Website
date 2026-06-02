"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { AuthGatedLink } from "@/components/common/AuthGatedLink";
import { cn } from "@/lib/utils";
import {
  DASHBOARD_ASSETS,
  HOME_DASHBOARD,
  HOME_DASHBOARD_UI,
  HOME_LAYOUT,
  ROUTES,
} from "@/lib/constants";
import type { ConsultationBannerProps } from "@/types";

/**
 * Consultation banner — `homeBannerDeco.png` on the **left** behind the portrait
 * (design ref image 2); solid `homeBanner` + border like Flutter `homePage.dart` Stack.
 */
export function ConsultationBanner({
  isAstrologer = false,
  hideCta = false,
  className,
}: ConsultationBannerProps) {
  const HD = useI18nConstants(HOME_DASHBOARD);
  const buttonLabel = isAstrologer ? HD.myProfile : HD.bookNow;
  const buttonLineCount = buttonLabel.split("\n").length;
  const buttonCharCount = buttonLabel.replace(/\n/g, "").trim().length;
  const useTallCta =
    buttonLineCount >= 2 ||
    buttonCharCount > HOME_DASHBOARD_UI.consultBannerCtaTallCharThreshold;
  const titleLines = isAstrologer
    ? HD.astrologerShort
    : HD.astrologerConsultationLines;
  const consultHref = isAstrologer ? ROUTES.astrologer : ROUTES.consultation;

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
          HOME_DASHBOARD_UI.consultBannerRow,
          HOME_LAYOUT.homeBannerStripMinH
        )}
      >
        <div className={HOME_DASHBOARD_UI.consultBannerPortraitWrap}>
          <Image
            src={DASHBOARD_ASSETS.consultationAstrologer}
            alt=""
            width={120}
            height={160}
            unoptimized
            className="h-auto max-h-[5.25rem] w-auto max-w-[5.5rem] object-contain object-bottom sm:max-h-[5.5rem] sm:max-w-[6rem]"
          />
        </div>

        <p className={HOME_DASHBOARD_UI.consultBannerTitle}>{titleLines}</p>

        {hideCta ? null : (
          <AuthGatedLink
            href={consultHref}
            returnPath={consultHref}
            redirectHomeOnClose
            inline
            className={cn(
              HOME_DASHBOARD_UI.consultBannerCta,
              useTallCta && HOME_DASHBOARD_UI.consultBannerCtaTall
            )}
          >
            {buttonLabel}
          </AuthGatedLink>
        )}
      </div>
    </div>
  );
}
