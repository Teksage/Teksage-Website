/** Login page layout + legal copy — keep literals out of `page.tsx`. */

export const LOGIN_SCREEN = {
  brandLogoWidthPx: 176,
  legalFootnote:
    "By continuing, you agree to our Terms of Service and Privacy Policy.",
  /** Mobile-first gradient shell (design reference). */
  shellClassName:
    "relative flex flex-col bg-[linear-gradient(180deg,#C2EDC0_0%,#eef8ed_42%,#ffffff_100%)]",
} as const;
