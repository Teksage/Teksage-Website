import { HOME_LAYOUT } from "@/lib/constants/home-layout";
import { SETTINGS_SHELL_GRADIENT_CLASS } from "@/lib/constants/settings-screen";

/**
 * Page shells — height follows content; `(main)/layout.tsx` reserves floating nav clearance.
 * Avoid `min-h-dvh` + `flex-1` on page roots (creates empty stretch below content).
 */
export const PAGE_SHELL = {
  column: "flex flex-col",
  root: "relative min-h-dvh",
  homeRoot: "relative flex min-h-dvh flex-col",
  detailRoot: "relative flex flex-col",
  contentLayer: "relative z-10",
  contentBottomPad: "pb-4",
  loadingCenter: "flex items-center justify-center py-24",
} as const;

/** Fixed viewport fills — tab backgrounds under floating bottom nav (`extendBody`). */
export const MAIN_TAB_VIEWPORT_BACKDROP = {
  base: `pointer-events-none fixed inset-0 z-0 ${HOME_LAYOUT.desktopBackdropInset}`,
  overflowHidden: `pointer-events-none fixed inset-0 z-0 overflow-hidden ${HOME_LAYOUT.desktopBackdropInset}`,
  home: "bg-[var(--color-home-screen-mint)]",
  brandGray: "bg-[var(--color-brand-bg)]",
  horoscopeMint: "bg-[var(--color-brand-horoscope-bg)]",
  horoscopeSplit: "horoscope-split-shell-bg",
  settings: SETTINGS_SHELL_GRADIENT_CLASS,
  profile: "bg-background",
} as const;
