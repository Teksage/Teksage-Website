"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { AuthGatedLink } from "@/components/common/AuthGatedLink";
import { CHAT_SCREEN } from "@/lib/constants/chat-screen";
import {
  DASHBOARD_ASSETS,
  HOME_DASHBOARD,
  HOME_DASHBOARD_UI,
  HOME_LAYOUT,
  ROUTES,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Flutter `ChatBanner(fromChat: true)` — full-bleed strip under green app bar. */
export function ChatConsultBanner() {
  const CS = useI18nConstants(CHAT_SCREEN);
  const HD = useI18nConstants(HOME_DASHBOARD);
  const bookNowLabel = HD.bookNow;
  const bookNowLineCount = bookNowLabel.split("\n").length;
  const bookNowCharCount = bookNowLabel.replace(/\n/g, "").trim().length;
  const useTallCta =
    bookNowLineCount >= 2 ||
    bookNowCharCount > HOME_DASHBOARD_UI.consultBannerCtaTallCharThreshold;

  return (
    <div
      className={cn(
        "relative isolate w-full min-w-0 overflow-hidden",
        HOME_LAYOUT.homeBannerStripMinH,
        "border-y-2 border-[var(--color-brand-banner-border)]",
        "bg-[var(--color-brand-banner)]"
      )}
    >
      <Image
        src={DASHBOARD_ASSETS.bannerDeco}
        alt=""
        width={800}
        height={400}
        sizes="100vw"
        unoptimized
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-contain object-left opacity-[0.55]"
      />
      <div
        className={cn(
          "relative z-10 flex w-full items-center justify-evenly gap-2 px-3 py-2",
          HOME_LAYOUT.homeBannerStripMinH
        )}
      >
        <div className="relative flex shrink-0 self-end pt-2 pl-2">
          <Image
            src={DASHBOARD_ASSETS.consultationAstrologer}
            alt=""
            width={88}
            height={112}
            unoptimized
            className="h-auto max-h-[4.75rem] w-auto max-w-[4.5rem] object-contain object-bottom"
          />
        </div>
        <p className="min-w-0 flex-1 text-center text-sm font-bold leading-snug text-[var(--color-brand-consultation-heading)] sm:text-base">
          {CS.consultBannerTitle}
        </p>
        <AuthGatedLink
          href={ROUTES.consultation}
          returnPath={ROUTES.consultation}
          redirectHomeOnClose
          className={cn(
            HOME_DASHBOARD_UI.consultBannerCta,
            useTallCta && HOME_DASHBOARD_UI.consultBannerCtaTall
          )}
        >
          {bookNowLabel}
        </AuthGatedLink>
      </div>
    </div>
  );
}
