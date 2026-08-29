"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DESKTOP_SIDEBAR_AI_CHAT_HREF } from "@/lib/constants/desktop-sidebar-nav";
import { DESKTOP_SIDEBAR_UI } from "@/lib/constants/desktop-sidebar-ui";
import {
  HOME_DASHBOARD_SIDEBAR,
  HOME_DASHBOARD_SIDEBAR_ASSETS,
} from "@/lib/constants/home-dashboard-sidebar";
import { ROUTES } from "@/lib/constants/routes";

export function DesktopNavAiChatCard() {
  const HDS = useI18nConstants(HOME_DASHBOARD_SIDEBAR);
  const pathname = usePathname();
  const active =
    pathname === ROUTES.home ||
    pathname === ROUTES.chat ||
    pathname.startsWith(`${ROUTES.chat}/`);

  return (
    <Link
      href={DESKTOP_SIDEBAR_AI_CHAT_HREF}
      className={active ? DESKTOP_SIDEBAR_UI.aiCard : DESKTOP_SIDEBAR_UI.aiCardIdle}
    >
      <span className={DESKTOP_SIDEBAR_UI.aiIconWrap}>
        <span className={DESKTOP_SIDEBAR_UI.aiIconInner}>
          <Image
            src={HOME_DASHBOARD_SIDEBAR_ASSETS.aiChatIcon}
            alt=""
            width={24}
            height={24}
            unoptimized
            className={DESKTOP_SIDEBAR_UI.aiIcon}
          />
        </span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col leading-snug">
        <span className={DESKTOP_SIDEBAR_UI.aiLine1}>{HDS.aiChatLine1}</span>
        <span className={DESKTOP_SIDEBAR_UI.aiLine2}>{HDS.aiChatLine2}</span>
      </span>
    </Link>
  );
}
