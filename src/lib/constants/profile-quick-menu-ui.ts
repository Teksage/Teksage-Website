import { SETTINGS_ASSETS } from "@/lib/constants/assets";
import { ROUTES } from "@/lib/constants/routes";
import { TYPO } from "@/lib/constants/typography";

/** Desktop header profile dropdown — clean professional account panel. */
export const PROFILE_QUICK_MENU_UI = {
  trigger: `flex size-9 items-center justify-center rounded-full bg-[var(--color-brand-primary)] ${TYPO.sizeSm} ${TYPO.weightBold} text-white ring-2 ring-white shadow-[0_2px_8px_rgb(16_177_0_/_0.22)] transition-opacity hover:opacity-95`,
  triggerOpen: "ring-[var(--color-brand-primary)]/30",
  panel:
    "absolute right-0 top-full z-50 mt-2 w-[17rem] overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_12px_36px_rgba(15,23,42,0.12)]",
  header: "flex items-center gap-3 border-b border-black/[0.06] px-4 py-3.5",
  headerAvatar: `flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)] ${TYPO.sizeSm} ${TYPO.weightBold} text-white`,
  headerText: "min-w-0 flex-1",
  headerName: `${TYPO.sizeSm} ${TYPO.weightBold} truncate leading-tight text-[var(--color-brand-black)]`,
  headerHint: `${TYPO.sizeXs} mt-0.5 truncate text-black/40`,
  list: "flex flex-col gap-0.5 px-2 py-2",
  item: "group flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-black/[0.03]",
  itemIconWrap:
    "flex size-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.03]",
  itemIcon: "size-4 object-contain opacity-70",
  itemLabel: `${TYPO.sizeSm} ${TYPO.weightMedium} flex-1 text-black/75 group-hover:text-[var(--color-brand-black)]`,
  footer: "border-t border-black/[0.06] px-4 py-3",
  settingsLink: `${TYPO.sizeSm} ${TYPO.weightSemibold} text-[var(--color-brand-primary)] transition-opacity hover:opacity-80 hover:underline hover:underline-offset-2`,
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
} as const;
