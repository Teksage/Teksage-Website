/**
 * Public static paths — mirrored Flutter `assets/` under `public/flutter-assets/` (images/, svg/).
 * Fonts are not bundled here: the site uses Urbanist via `next/font/google` in `app/layout.tsx`.
 * Do not hardcode paths in components; import from here.
 */

const flutterSvg = (file: string) => `/flutter-assets/svg/${file}` as const;
const flutterImage = (file: string) => `/flutter-assets/images/${file}` as const;

/** Astrologer portal — `Screens/Astrologer/*` + `Components/Astrologer/*`. */
export const ASTROLOGER_ASSETS = {
  dashLine: flutterSvg("astroHomeDashLine.svg"),
  meetingIcon: flutterSvg("astroMeeting.svg"),
  calendarIcon: flutterSvg("astroCalender.svg"),
  calendarArrow: flutterSvg("astroCalenderArrow.svg"),
  calendarLine: flutterSvg("astroCalenderLine.svg"),
  dashedLine: flutterSvg("astroDashedLine.svg"),
} as const;

export const PUBLIC_ASSETS = {
  /** Flutter `dashLogin.svg` — login prompt dialog illustration */
  dashLogin: flutterSvg("dashLogin.svg"),
  /** Flutter `loginLogo.svg` */
  loginLogo: flutterSvg("loginLogo_ios.svg"),
  /** Flutter `logo_ios.svg` */
  appLogo: flutterSvg("logo_ios.svg"),
} as const;

/** Flutter intro onboarding assets (`intro/welcomePage.dart`, `intro/onboardingPage.dart`). */
/** Flutter `welcomePage.dart` (`welcomeLogo`, `welcomeCheckBox`, `welcomeBoxShadow`). */
export const WELCOME_ASSETS = {
  logo: flutterSvg("welcomeLogo.svg"),
  check: flutterSvg("welcomeCheckBox.svg"),
  shadow: flutterSvg("welcomeBoxShadow.svg"),
} as const;

export const ONBOARDING_ASSETS = {
  slide1: flutterImage("onBoard1.png"),
  slide2: flutterImage("onBoard2.png"),
  slide3: flutterImage("onBoard3.png"),
  iosBottomBackground: flutterImage("iosOnboardBg.png"),
  arrowBack: flutterSvg("backIcon.svg"),
  arrowForward: flutterSvg("forwardIcon.svg"),
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
  chatBackground: flutterImage("chatBG.png"),
  chatBotLogo: flutterSvg("botLogo.svg"),
  chatSend: flutterSvg("send.svg"),
  chatMic: flutterSvg("mic.svg"),
  chatStyleIcon: flutterSvg("chatStyle.svg"),
  chatAvatarIcon: flutterSvg("chatAvatar.svg"),
  /** Flutter `panchangBG` — non‑premium Panchang tab hero (`emptyPanchangPage.dart`). */
  panchangHero: flutterImage("panchangBG.png"),
  notification: flutterSvg("notification.svg"),
  navHomeOn: flutterSvg("selectHome.svg"),
  navHomeOff: flutterSvg("unSelectHome.svg"),
  navPanchangOn: flutterSvg("selectPanchang.svg"),
  navPanchangOff: flutterSvg("unSelectPanchang.svg"),
  navHoroscopeOn: flutterSvg("selectHoroscope.svg"),
  navHoroscopeOff: flutterSvg("unSelectHoroscope.svg"),
  navSettingsOn: flutterSvg("selectSetting.svg"),
  navSettingsOff: flutterSvg("unSelectSetting.svg"),
  /** Desktop dashboard sidebar — outline icons (design ref). */
  sidebarCalendar: flutterSvg("sidebar-calendar.svg"),
  sidebarFolder: flutterSvg("sidebar-folder.svg"),
  sidebarMarriage: flutterSvg("sidebar-marriage.svg"),
  sidebarNotification: flutterSvg("sidebar-notification.svg"),
  sidebarProfile: flutterSvg("sidebar-profile.svg"),
  sidebarChevronDown: flutterSvg("sidebar-chevron-down.svg"),
  sidebarPremiumCrown: flutterSvg("subscription.svg"),
} as const;

/** Daily prediction — `dailyPrediction.dart`, `predictionContainer.dart`, `imageConstant.dart`. */
export const DAILY_PREDICTION_ASSETS = {
  /** Green hero + arc ellipses (`predictionTopBg.svg`). */
  topBg: flutterSvg("predictionTopBg.svg"),
  appBarBack: flutterSvg("appBarBackButton.svg"),
  toolTip: flutterSvg("toolTip.svg"),
  career: flutterSvg("career.svg"),
  relationship: flutterSvg("relationship.svg"),
  wealth: flutterSvg("wealth.svg"),
  health: flutterSvg("health.svg"),
  /** Bala column separator (`divider_daily.svg`). */
  balaDivider: flutterSvg("divider_daily.svg"),
} as const;

/** Premium Personalized Panchang — `panchangPage.dart` + `imageConstant.dart`. */
export const PANCHANG_ASSETS = {
  /**
   * Full-screen background — **`public/flutter-assets/images/panchangBG.png`**
   * (Flutter `panchangBG`). Reuses `DASHBOARD_ASSETS.panchangHero` so the path stays single-source.
   */
  personalizedBackground: DASHBOARD_ASSETS.panchangHero,
  timeRibbon: flutterSvg("panchangTimeContainer.svg"),
  sunrise: flutterSvg("sunrise.svg"),
  sunset: flutterSvg("sunset.svg"),
  timeDivider: flutterSvg("dashLine.svg"),
  balaPositive: flutterImage("panchangUp.png"),
  balaNegative: flutterImage("panchangDown.png"),
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

/** Settings sub-pages — Flutter `imageConstant.dart` (FAQ, subscription, nav). */
export const SETTINGS_PAGE_ASSETS = {
  /** Black arrow on white settings sub-pages (Flutter `backButton.svg`). */
  back: flutterSvg("backButton.svg"),
  /** White arrow on dark / colored headers (Flutter `appBarBackButton.svg`). */
  backOnDark: flutterSvg("appBarBackButton.svg"),
  search: flutterSvg("search.svg"),
  dropDownArrow: flutterSvg("dropDownArrow.svg"),
  faqExpand: flutterSvg("add_faq.svg"),
  faqCollapse: flutterSvg("cross_faq.svg"),
  subscriptionBg: flutterImage("subscriptionBG.png"),
  subscriptionPro: flutterSvg("subscriptionProIcon.svg"),
  planSelected: flutterSvg("subSelect.svg"),
  planCheck: flutterSvg("selectCheckBox.svg"),
  dialogClose: flutterSvg("close.svg"),
} as const;

export type SettingsAssetKey = keyof typeof SETTINGS_ASSETS;
