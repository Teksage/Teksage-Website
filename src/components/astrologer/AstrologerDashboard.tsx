"use client";

import Image from "next/image";
import Link from "next/link";
import { ConsultationBanner } from "@/components/home/ConsultationBanner";
import { ASTRO_PORTAL_UI, ASTRO_PORTAL_COLORS } from "@/lib/constants/astrologer-portal";
import { ASTROLOGER_ASSETS } from "@/lib/constants/assets";
import { HOME_LAYOUT } from "@/lib/constants";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

interface DashCardProps {
  title: string;
  subtitle: string;
  href: string;
  iconSrc: string;
}

function DashCard({ title, subtitle, href, iconSrc }: DashCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-1 flex-col overflow-hidden rounded-[20px] border border-black/[0.06] transition-shadow hover:shadow-md active:scale-[0.98]"
      style={{ backgroundColor: ASTRO_PORTAL_COLORS.cardBg }}
    >
      <div className="flex flex-col items-center px-3 pb-3 pt-5 text-center">
        <p className="text-base font-bold leading-none text-gray-900">{title}</p>
        <p className="mt-2 text-xs font-semibold leading-snug text-gray-900/40">
          {subtitle}
        </p>
      </div>
      <div className="relative mt-auto flex min-h-[80px] items-end justify-center pb-1">
        <div
          className="absolute inset-x-0 bottom-0 h-10 rounded-b-[20px]"
          style={{
            backgroundColor: ASTRO_PORTAL_COLORS.cardStrip,
            clipPath: "path('M 0 20 Q 50% -20 100% 20 L 100% 100 L 0 100 Z')",
          }}
        />
        <div className="relative z-10 mb-1">
          <Image
            src={iconSrc}
            alt=""
            width={64}
            height={64}
            unoptimized
            className="h-14 w-14 object-contain"
          />
        </div>
      </div>
    </Link>
  );
}

/** Astrologer portal — Flutter `AstrologerHomePage` cards; banner matches home `ConsultationBanner`. */
export function AstrologerDashboard() {
  return (
    <div
      className={cn(
        "mx-auto w-full pb-10",
        HOME_LAYOUT.maxWidth,
        HOME_LAYOUT.gutterX,
        HOME_LAYOUT.mainTopPad,
        HOME_LAYOUT.sectionStack
      )}
    >
      <ConsultationBanner isAstrologer hideCta />

      <div className="flex items-center">
        <Image
          src={ASTROLOGER_ASSETS.dashLine}
          alt=""
          width={80}
          height={8}
          className="flex-1 opacity-40"
          unoptimized
        />
        <p className="mx-3 text-sm font-medium leading-none text-gray-900/50">
          {ASTRO_PORTAL_UI.loginBadge}
        </p>
        <Image
          src={ASTROLOGER_ASSETS.dashLine}
          alt=""
          width={80}
          height={8}
          className="flex-1 opacity-40"
          unoptimized
        />
      </div>

      <div className="flex gap-4">
        <DashCard
          title={ASTRO_PORTAL_UI.card.meetings.title}
          subtitle={ASTRO_PORTAL_UI.card.meetings.subtitle}
          href={ROUTES.astrologerMeetings}
          iconSrc={ASTROLOGER_ASSETS.meetingIcon}
        />
        <DashCard
          title={ASTRO_PORTAL_UI.card.availability.title}
          subtitle={ASTRO_PORTAL_UI.card.availability.subtitle}
          href={ROUTES.astrologerAvailability}
          iconSrc={ASTROLOGER_ASSETS.calendarIcon}
        />
      </div>
    </div>
  );
}
