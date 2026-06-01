"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DesktopNavItem } from "@/components/common/DesktopNavItem";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import {
  HOME_DASHBOARD_OTHER_PREDICTION_LINKS,
  HOME_DASHBOARD_PREDICTIONS_SUBMENU_INDENT,
  HOME_DASHBOARD_SIDEBAR,
  HOME_DASHBOARD_SIDEBAR_ASSETS,
} from "@/lib/constants/home-dashboard-sidebar";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

function OtherPredictionsChevron({ open }: { open: boolean }) {
  return (
    <Image
      src={HOME_DASHBOARD_SIDEBAR_ASSETS.predictionsChevron}
      alt=""
      width={16}
      height={16}
      unoptimized
      aria-hidden
      className={cn(
        "size-4 shrink-0 transition-transform duration-200",
        open ? "rotate-0" : "-rotate-90"
      )}
    />
  );
}

const OTHER_PREDICTION_ROUTES = [
  ROUTES.predictionsYearly,
  ROUTES.predictionsLife,
  ROUTES.horoscope,
] as const;

export function DesktopNavOtherPredictionsMenu() {
  const HDS = useI18nConstants(HOME_DASHBOARD_SIDEBAR);
  const otherLinks = useI18nConstants(HOME_DASHBOARD_OTHER_PREDICTION_LINKS);
  const pathname = usePathname();
  const { guardNavigation } = useAuthNavigation();
  const submenuActive = OTHER_PREDICTION_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const [open, setOpen] = useState(submenuActive);

  return (
    <div className="flex flex-col">
      <DesktopNavItem
        iconSrc={HOME_DASHBOARD_SIDEBAR_ASSETS.otherPredictions}
        label={HDS.otherPredictions}
        active={submenuActive}
        trailing={<OtherPredictionsChevron open={open} />}
        onClick={() => setOpen((value) => !value)}
        ariaExpanded={open}
      />

      {open ? (
        <ul
          className={cn(
            "mt-0.5 space-y-0.5 pb-1 pr-1",
            HOME_DASHBOARD_PREDICTIONS_SUBMENU_INDENT
          )}
        >
          {otherLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() =>
                    guardNavigation(item.href, { redirectHomeOnClose: true })
                  }
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg py-2 text-left text-sm font-medium transition-colors",
                    active
                      ? "font-semibold text-black"
                      : "text-black/80 hover:text-black"
                  )}
                >
                  <span className="size-1.5 shrink-0 rounded-[1px] bg-[var(--color-brand-primary)]" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
