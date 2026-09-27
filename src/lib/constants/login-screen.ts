/** Login page layout + legal copy — keep literals out of `page.tsx`. */

import { AUTH_SCREEN } from "@/lib/constants/auth-screen";

export const LOGIN_SCREEN = {
  /** Mobile | Email tabs on `/login` — mobile first (Flutter `LoginPageMobile`). */
  showMobileLoginTab: true,
  brandLogoWidthPx: 176,
  heading: "Welcome back",
  subtitle: "Sign in with mobile or email to continue.",
  tabListAria: "Sign in method",
  tabMobile: "Mobile",
  tabEmail: "Email",
  legalFootnote:
    "By continuing, you agree to our Terms of Service and Privacy Policy.",
  shellClassName: AUTH_SCREEN.shellClassName,
} as const;
