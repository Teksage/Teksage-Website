/**
 * Public static paths — mirrored Flutter `assets/` under `public/flutter-assets/` (images/, svg/).
 * Fonts are not bundled here: the site uses Urbanist via `next/font/google` in `app/layout.tsx`.
 * Do not hardcode paths in components; import from here.
 */

const flutterSvg = (file: string) => `/flutter-assets/svg/${file}` as const;
const flutterImage = (file: string) => `/flutter-assets/images/${file}` as const;

export const PUBLIC_ASSETS = {
  /** Flutter `loginLogo.svg` */
  loginLogo: flutterSvg("loginLogo.svg"),
  /** Flutter `logo.svg` */
  appLogo: flutterSvg("logo.svg"),
} as const;

/** Home dashboard — same files as Flutter `imageConstant.dart` home / bottom nav. */
export const DASHBOARD_ASSETS = {
  homeLine: flutterSvg("homeDecLine.svg"),
  weeklyIcon: flutterSvg("weekly.svg"),
  yearlyIcon: flutterSvg("yearly.svg"),
  lifeIcon: flutterSvg("life.svg"),
  marriageHero: flutterSvg("marriage.svg"),
  downArrow: flutterSvg("downArrow.svg"),
  /** Flutter `homeBanDeco` → `assets/images/homeBannerDeco.png` (full-banner stack under row). */
  bannerDeco: flutterImage("homeBannerDeco.png"),
  /** Flutter `test.png` (home consultation avatar in `homePage.dart`). */
  consultationAstrologer: flutterImage("test.png"),
  /** Flutter home `homePage.dart` AI strip — `DecorationImage(bottomBannerBg)`, `BoxFit.cover`. */
  chatStripBackground: flutterImage("bottomBanner.png"),
  /** Flutter `bannerElement.svg` (green squircle + sparkle). */
  chatBannerElement: flutterSvg("bannerElement.svg"),
  /** Flutter `rightArrow.svg` inside white “Chat Now” pill. */
  chatStripArrow: flutterSvg("rightArrow.svg"),
  notification: flutterSvg("notification.svg"),
  navHomeOn: flutterSvg("selectHome.svg"),
  navHomeOff: flutterSvg("unSelectHome.svg"),
  navPanchangOn: flutterSvg("selectPanchang.svg"),
  navPanchangOff: flutterSvg("unSelectPanchang.svg"),
  navHoroscopeOn: flutterSvg("selectHoroscope.svg"),
  navHoroscopeOff: flutterSvg("unSelectHoroscope.svg"),
  navSettingsOn: flutterSvg("selectSetting.svg"),
  navSettingsOff: flutterSvg("unSelectSetting.svg"),
} as const;

/** Settings menu — same SVGs as Flutter `settings_page.dart` / `imageConstant.dart`. */
export const SETTINGS_ASSETS = {
  profile: flutterSvg("profile.svg"),
  pushNotifications: flutterSvg("notifySetting.svg"),
  language: flutterSvg("languageIcon.svg"),
  subscription: flutterSvg("subscription.svg"),
  terms: flutterSvg("terms.svg"),
  privacy: flutterSvg("privacy.svg"),
  support: flutterSvg("support.svg"),
  faq: flutterSvg("faq.svg"),
  rating: flutterSvg("rating.svg"),
  deleteAccount: flutterSvg("deleteAcc.svg"),
  logout: flutterSvg("logout.svg"),
} as const;

export type SettingsAssetKey = keyof typeof SETTINGS_ASSETS;
