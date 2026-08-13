import { DASHBOARD_ASSETS, SETTINGS_ASSETS } from "@/lib/constants/assets";
import { ROUTES } from "@/lib/constants/routes";
import { TYPO } from "@/lib/constants/typography";

/** Desktop header profile dropdown — layout + link defs. */
export const PROFILE_QUICK_MENU_UI = {
  trigger: `flex size-9 items-center justify-center rounded-full bg-[var(--color-brand-primary)] ${TYPO.sizeSm} ${TYPO.weightBold} text-white shadow-[0_2px_8px_rgb(16_177_0_/_0.28)] transition-opacity hover:opacity-90`,
  panel:
    "absolute right-0 top-full z-50 mt-2 w-[16.5rem] overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.14)]",
  header:
    "flex items-center gap-3 border-b border-black/[0.06] bg-[var(--color-home-screen-mint)]/40 px-3.5 py-3",
  headerAvatar: `flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)] ${TYPO.sizeSm} ${TYPO.weightBold} text-white`,
  headerText: "min-w-0 flex-1",
  headerName: `${TYPO.sizeSm} ${TYPO.weightBold} truncate text-[var(--color-brand-black)]`,
  headerHint: `${TYPO.sizeXs} truncate text-black/45`,
  list: "flex flex-col gap-0.5 p-2",
  item: `group flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left transition-colors hover:bg-[var(--color-home-screen-mint)]/55`,
  itemIconWrap:
    "flex size-8 shrink-0 items-center justify-center rounded-full bg-black/[0.04] transition-colors group-hover:bg-white",
  itemIcon: "size-4 object-contain opacity-80",
  itemLabel: `${TYPO.sizeSm} ${TYPO.weightMedium} flex-1 text-black/75 group-hover:text-[var(--color-brand-black)]`,
  divider: "my-1 border-t border-black/[0.06]",
  settingsItem: `group flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left transition-colors hover:bg-black/[0.03]`,
  settingsLabel: `${TYPO.sizeSm} ${TYPO.weightSemibold} flex-1 text-[var(--color-brand-primary)]`,
} as const;

export const PROFILE_QUICK_MENU_LINKS = [
  {
    href: ROUTES.profile,
    labelKey: "profileMenuProfile" as const,
    icon: SETTINGS_ASSETS.profile,
  },
  {
    href: ROUTES.whatsappUpdates,
    labelKey: "profileMenuWhatsApp" as const,
    icon: SETTINGS_ASSETS.whatsapp,
  },
  {
    href: `${ROUTES.settings}/support`,
    labelKey: "profileMenuSupport" as const,
    icon: SETTINGS_ASSETS.support,
  },
  {
    href: `${ROUTES.settings}/language`,
    labelKey: "profileMenuLanguage" as const,
    icon: SETTINGS_ASSETS.language,
  },
] as const;

export const PROFILE_QUICK_MENU_SETTINGS = {
  href: ROUTES.settings,
  labelKey: "profileMenuAllSettings" as const,
  icon: DASHBOARD_ASSETS.navSettingsOff,
} as const;
