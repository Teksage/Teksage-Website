import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DASHBOARD_ASSETS, HOME_DASHBOARD, HOME_LAYOUT, ROUTES } from "@/lib/constants";
import type { ConsultationBannerProps } from "@/types";

/**
 * Consultation banner — `homeBannerDeco.png` on the **left** behind the portrait
 * (design ref image 2); solid `homeBanner` + border like Flutter `homePage.dart` Stack.
 */
export function ConsultationBanner({
  isLoggedIn,
  isAstrologer = false,
  className,
}: ConsultationBannerProps) {
  const buttonLabel = isAstrologer
    ? HOME_DASHBOARD.myProfile
    : HOME_DASHBOARD.bookNow;
  const titleLines = isAstrologer
    ? HOME_DASHBOARD.astrologerShort
    : HOME_DASHBOARD.astrologerConsultationLines;
  const href = isLoggedIn
    ? isAstrologer
      ? ROUTES.consultationAstrologer
      : ROUTES.consultation
    : ROUTES.login;

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
          "relative z-10 flex w-full items-center justify-evenly gap-1 px-1 py-2 sm:gap-2 sm:px-2 sm:py-2.5",
          HOME_LAYOUT.homeBannerStripMinH,
        )}
      >
        <div
          className={cn(
            "relative z-[1] flex shrink-0 justify-center self-end",
            "pt-2.5 pl-2 pb-0.5 sm:pt-3 sm:pl-3 sm:pb-1"
          )}
        >
          <Image
            src={DASHBOARD_ASSETS.consultationAstrologer}
            alt="Astrologer"
            width={120}
            height={160}
            unoptimized
            className="h-auto max-h-[5.25rem] w-auto max-w-[5.5rem] object-contain object-bottom sm:max-h-[5.5rem] sm:max-w-[6rem] lg:max-h-[6rem] lg:max-w-[6.75rem]"
          />
        </div>

        <p
          className={cn(
            "min-w-0 max-w-[11rem] flex-none whitespace-pre-line text-left text-[0.8125rem] font-bold leading-snug sm:max-w-none sm:flex-1 sm:text-[0.95rem] lg:text-base",
            "text-[var(--color-brand-consultation-heading)]"
          )}
        >
          {titleLines}
        </p>

        <Link
          href={href}
          className={cn(
            "shrink-0 rounded-full bg-white px-4 py-2.5 text-center text-xs font-semibold sm:px-5 sm:py-3",
            "text-[var(--color-brand-banner-dark)] shadow-sm transition-opacity hover:opacity-90"
          )}
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}
