"use client";

import { useEffect, useRef, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { DesktopNavItem } from "@/components/common/DesktopNavItem";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import {
  HOME_DASHBOARD_OTHER_PREDICTION_LINKS,
  HOME_DASHBOARD_PREDICTIONS_SUBMENU_INDENT,
  HOME_DASHBOARD_SIDEBAR,
  HOME_DASHBOARD_SIDEBAR_ASSETS,
} from "@/lib/constants/home-dashboard-sidebar";
import { DESKTOP_SIDEBAR_UI } from "@/lib/constants/desktop-sidebar-ui";
import { YEARLY_2027_PROMO } from "@/lib/constants/yearly-2027-promo";
import { YEARLY_2027_PROMO_UI } from "@/lib/constants/yearly-2027-promo-ui";
import { ROUTES } from "@/lib/constants/routes";
import { useDesktopSidebarStore } from "@/store/desktop-sidebar.store";
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

/** Other Predictions — inline submenu expanded, flyout when sidebar is collapsed. */
export function DesktopNavOtherPredictionsMenu() {
  const HDS = useI18nConstants(HOME_DASHBOARD_SIDEBAR);
  const otherLinks = useI18nConstants(HOME_DASHBOARD_OTHER_PREDICTION_LINKS);
  const promo = useI18nConstants(YEARLY_2027_PROMO);
  const pathname = usePathname();
  const { guardNavigation } = useAuthNavigation();
  const collapsed = useDesktopSidebarStore((s) => s.collapsed);
  const submenuActive = OTHER_PREDICTION_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const [open, setOpen] = useState(true);
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!collapsed) setFlyoutOpen(false);
  }, [collapsed]);

  useEffect(() => {
    if (!flyoutOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setFlyoutOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFlyoutOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [flyoutOpen]);

  function go(href: string) {
    setFlyoutOpen(false);
    guardNavigation(href, { redirectHomeOnClose: true });
  }

  return (
    <div
      ref={wrapRef}
      className={collapsed ? DESKTOP_SIDEBAR_UI.flyoutWrap : "flex flex-col items-stretch"}
    >
      <DesktopNavItem
        collapsed={collapsed}
        showTooltip={!flyoutOpen}
        iconSrc={HOME_DASHBOARD_SIDEBAR_ASSETS.otherPredictions}
        label={HDS.otherPredictions}
        active={submenuActive}
        trailing={
          collapsed ? null : (
            <span className="ml-auto flex shrink-0 items-center gap-1.5">
              <span className={YEARLY_2027_PROMO_UI.sidebarNew}>{promo.newBadge}</span>
              <OtherPredictionsChevron open={open} />
            </span>
          )
        }
        onClick={() => {
          if (collapsed) {
            setFlyoutOpen((value) => !value);
            return;
          }
          setOpen((value) => !value);
        }}
        ariaExpanded={collapsed ? flyoutOpen : open}
      />

      {collapsed && flyoutOpen ? (
        <ul className={DESKTOP_SIDEBAR_UI.flyoutPanel} role="menu">
          {otherLinks.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const isYearly = item.href === ROUTES.predictionsYearly;
            return (
              <li key={item.href} role="none">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => go(item.href)}
                  className={
                    active
                      ? DESKTOP_SIDEBAR_UI.flyoutItemActive
                      : DESKTOP_SIDEBAR_UI.flyoutItem
                  }
                >
                  <span className={DESKTOP_SIDEBAR_UI.submenuDot} />
                  <span className="min-w-0 flex-1 text-left">{item.label}</span>
                  {isYearly ? (
                    <span className={YEARLY_2027_PROMO_UI.sidebarNew}>
                      {promo.newBadge}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {!collapsed && open ? (
        <ul
          className={cn(
            "mt-0.5 space-y-0.5 pb-1 pr-1",
            HOME_DASHBOARD_PREDICTIONS_SUBMENU_INDENT
          )}
        >
          {otherLinks.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const isYearly = item.href === ROUTES.predictionsYearly;
            return (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={() => go(item.href)}
                  className={cn(
                    active
                      ? DESKTOP_SIDEBAR_UI.submenuItemActive
                      : DESKTOP_SIDEBAR_UI.submenuItem,
                    "px-2"
                  )}
                >
                  <span className={DESKTOP_SIDEBAR_UI.submenuDot} />
                  <span className="min-w-0 flex-1 text-left">{item.label}</span>
                  {isYearly ? (
                    <span className={YEARLY_2027_PROMO_UI.sidebarNew}>
                      {promo.newBadge}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
