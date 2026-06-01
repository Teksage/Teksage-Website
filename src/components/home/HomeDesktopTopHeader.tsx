"use client";

import Image from "next/image";
import { HomePanchangTimingStrip } from "@/components/home/HomePanchangTimingStrip";
import { APP_NAME, PUBLIC_ASSETS } from "@/lib/constants";
import { HOME_EMBED_HEADER_UI } from "@/lib/constants/home-embed-header-ui";
import { HOME_LAYOUT } from "@/lib/constants/home-layout";
import type { HomeDesktopTopHeaderProps } from "@/types/ui/home-embed-header";
import { cn } from "@/lib/utils";

/** Desktop (`lg+`) — brand above sidebar; timings above main content on all main routes. */
export function HomeDesktopTopHeader({ className }: HomeDesktopTopHeaderProps) {
  return (
    <header
      className={cn(HOME_EMBED_HEADER_UI.desktopTopHeader, className)}
      aria-label="Teksage home"
    >
      <div
        className={cn(
          HOME_LAYOUT.desktopAsideWidth,
          HOME_EMBED_HEADER_UI.brandColumn
        )}
      >
        <Image
          src={PUBLIC_ASSETS.appLogo}
          alt=""
          width={HOME_EMBED_HEADER_UI.logoPx}
          height={HOME_EMBED_HEADER_UI.logoPx}
          unoptimized
          className="size-9 shrink-0"
        />
        <span className={HOME_EMBED_HEADER_UI.brandWordmark}>{APP_NAME}</span>
      </div>
      <div className={HOME_EMBED_HEADER_UI.timingColumn}>
        <HomePanchangTimingStrip variant="light" flush />
      </div>
    </header>
  );
}
