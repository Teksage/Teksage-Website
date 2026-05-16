/**
 * Prediction screens — Flutter `imageConstant.dart` paths under `public/flutter-assets/`.
 */

const flutterSvg = (file: string) => `/flutter-assets/svg/${file}` as const;
const flutterImage = (file: string) => `/flutter-assets/images/${file}` as const;

export const WEEKLY_PREDICTION_ASSETS = {
  background: flutterImage("weeklyBg.png"),
  back: flutterSvg("backButton.svg"),
  toolTip: flutterSvg("toolTip.svg"),
  balaDivider: flutterSvg("divider_daily.svg"),
} as const;

export const YEARLY_PREDICTION_ASSETS = {
  landingDeco: flutterSvg("yearlyLandingDeco.svg"),
  decoLogo: flutterSvg("yearlyDecoIcon.svg"),
  appBarBack: flutterSvg("appBarBackButton.svg"),
  toolTip: flutterSvg("toolTip.svg"),
  cardDeco: flutterImage("yearlyConDeco.png"),
  dashedLine: flutterSvg("longDash.svg"),
  remedyDecoLine: flutterSvg("remedyDeco.svg"),
  planets: {
    jupiter: flutterSvg("jupiter.svg"),
    saturn: flutterSvg("saturn.svg"),
    rahu: flutterSvg("rahu.svg"),
    ketu: flutterSvg("ketu.svg"),
    currentDasa: flutterSvg("current.svg"),
  },
  overview: {
    career: flutterSvg("career.svg"),
    finance: flutterSvg("wealth.svg"),
    health: flutterSvg("health.svg"),
    relationship: flutterSvg("relationship.svg"),
  },
  remedies: {
    chanting: flutterSvg("chanting.svg"),
    puja: flutterSvg("puja.svg"),
    charity: flutterSvg("charity.svg"),
  },
} as const;

export const LIFE_PREDICTION_ASSETS = {
  landingDeco: flutterSvg("lifeLandingDeco.svg"),
  decoLogo: flutterSvg("lifeDecoIcon.svg"),
  appBarBack: flutterSvg("appBarBackButton.svg"),
  toolTip: flutterSvg("toolTip.svg"),
  general: flutterSvg("lifeGeneral.svg"),
  career: flutterSvg("lifeCareer.svg"),
  relationship: flutterSvg("LifeReleation.svg"),
  wealth: flutterSvg("lifeWealth.svg"),
  health: flutterSvg("lifeHealth.svg"),
  current: flutterSvg("lifeCurrent.svg"),
} as const;

export const MATCH_MAKING_ASSETS = {
  boy: flutterSvg("boy.svg"),
  girl: flutterSvg("girl.svg"),
  ring: flutterSvg("ring.svg"),
  appBarBack: flutterSvg("appBarBackButton.svg"),
  background: flutterImage("matchMakingBG.png"),
  matchTopDeco: flutterSvg("matchTopDeco.svg"),
  bigRing: flutterSvg("bigRing.svg"),
  present: flutterSvg("present.svg"),
  absent: flutterSvg("absent.svg"),
  fabButton: flutterSvg("FabButton.svg"),
  regenerate: flutterSvg("regenerate.svg"),
  expert: flutterSvg("person.svg"),
} as const;
