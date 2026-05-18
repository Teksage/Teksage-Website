"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DesktopNavItem } from "@/components/common/DesktopNavItem";
import {
  HOME_DASHBOARD_PREDICTION_LINKS,
  HOME_DASHBOARD_PREDICTIONS_SUBMENU_INDENT,
  HOME_DASHBOARD_SIDEBAR,
  HOME_DASHBOARD_SIDEBAR_ASSETS,
} from "@/lib/constants/home-dashboard-sidebar";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

function PredictionsChevron({ open }: { open: boolean }) {
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

export function DesktopNavPredictionsMenu() {
  const pathname = usePathname();
  const predictionsActive = pathname.startsWith(ROUTES.predictions);
  const [open, setOpen] = useState(predictionsActive);

  return (
    <div className="flex flex-col">
      <DesktopNavItem
        iconSrc={HOME_DASHBOARD_SIDEBAR_ASSETS.predictions}
        label={HOME_DASHBOARD_SIDEBAR.predictions}
        active={predictionsActive}
        trailing={<PredictionsChevron open={open} />}
        onClick={() => setOpen((value) => !value)}
        ariaExpanded={open}
      />

      {open ? (
        <ul className={cn("mt-0.5 space-y-0.5 pb-1 pr-1", HOME_DASHBOARD_PREDICTIONS_SUBMENU_INDENT)}>
          {HOME_DASHBOARD_PREDICTION_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg py-2 text-sm font-medium transition-colors",
                    active
                      ? "font-semibold text-black"
                      : "text-black/80 hover:text-black"
                  )}
                >
                  <span className="size-1.5 shrink-0 rounded-[1px] bg-[var(--color-brand-primary)]" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
