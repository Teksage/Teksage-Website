import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DASHBOARD_ASSETS, HOME_DASHBOARD, HOME_LAYOUT } from "@/lib/constants";

interface ChatBannerProps {
  isLoggedIn: boolean;
  className?: string;
}

/**
 * Mirrors Flutter `homePage.dart` AI chat strip: `homeBanner2` + `bottomBanner.png`
 * (`BoxFit.cover`), then `Row` + `spaceEvenly`: title | `bannerElement` | white pill
 * (`Chat Now` + `rightArrow`).
 */
export function ChatBanner({ isLoggedIn, className }: ChatBannerProps) {
  const href = isLoggedIn ? "/chat" : "/login";

  return (
    <Link href={href} className={cn("group block", className)}>
      <div
        className={cn(
          "relative isolate w-full min-w-0 overflow-hidden",
          HOME_LAYOUT.homeBannerStripMinH,
          HOME_LAYOUT.homeCardRadius,
          "bg-[var(--color-brand-banner-dark)] shadow-md"
        )}
      >
        <Image
          src={DASHBOARD_ASSETS.chatStripBackground}
          alt=""
          width={960}
          height={320}
          sizes="100vw"
          unoptimized
          className={cn(
            "pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
          )}
        />

        <div
          className={cn(
            "relative z-10 flex w-full items-center justify-evenly gap-2 px-2 py-2 sm:gap-3 sm:px-3 sm:py-3",
            HOME_LAYOUT.homeBannerStripMinH,
          )}
        >
          <p
            className={cn(
              "min-w-0 shrink whitespace-pre-line text-left text-sm font-bold leading-snug text-white sm:text-base lg:text-lg"
            )}
          >
            {HOME_DASHBOARD.aiVoiceChatTitle}
          </p>

          <Image
            src={DASHBOARD_ASSETS.chatBannerElement}
            alt=""
            width={38}
            height={38}
            unoptimized
            className="pointer-events-none size-[2.125rem] shrink-0 sm:size-[2.375rem]"
            aria-hidden
          />

          <div
            className={cn(
              "flex h-9 shrink-0 items-center justify-evenly gap-1.5 rounded-full bg-white px-3 py-1.5 sm:h-10 sm:min-w-[8.75rem] sm:gap-2 sm:px-4",
              "transition-opacity group-hover:opacity-95"
            )}
          >
            <span className="text-[11px] font-semibold leading-none text-[var(--color-brand-banner-font)] sm:text-xs">
              {HOME_DASHBOARD.chatNow}
            </span>
            <Image
              src={DASHBOARD_ASSETS.chatStripArrow}
              alt=""
              width={14}
              height={14}
              unoptimized
              className="shrink-0"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
