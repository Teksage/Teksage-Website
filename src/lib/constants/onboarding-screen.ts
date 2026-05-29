import { ONBOARDING_ASSETS } from "@/lib/constants/assets";

export const ONBOARDING_SCREEN = {
  skip: "Skip Intro",
  languageTitle: "Select Your Preferred Language",
  languageSubtitle: "Choose your language to get started",
} as const;

export const ONBOARDING_SLIDES = [
  {
    id: "personalized",
    title: "AI-Powered\nAstrology Voice Chat",
    description:
      "Instant Vedic astrology insights - just talk and listen to your AI Jyotish.",
    image: ONBOARDING_ASSETS.slide1,
  },
  {
    id: "consultation",
    title: "Personalized Daily\n& Life Predictions",
    description:
      "Discover accurate insights about your future with daily and life predictions.",
    image: ONBOARDING_ASSETS.slide2,
  },
  {
    id: "ai-chat",
    title: "Marriage Compatibility\n& Free Astrology Reports",
    description:
      "Check your compatibility and access free astrology reports for better decisions.",
    image: ONBOARDING_ASSETS.slide3,
  },
] as const;
