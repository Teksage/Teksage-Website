/**
 * Welcome page and Onboarding slideshow copy.
 * Mirrors Flutter `PlatformTextConfig.onboardingData` and `WelcomePage`.
 */

export const WELCOME_SCREEN = {
  heading: "Welcome to\nTeksage!",
  tagline: "Your AI-powered Vedic astrology companion",
  getStartedCta: "Get Started",
  learnMoreCta: "Learn More",
  featureAi: "AI Jyotish Chat",
  featureAiDesc: "Ask anything — speak naturally and get instant Vedic insights.",
  featurePredictions: "Daily & Life Predictions",
  featurePredictionsDesc: "Personalised horoscope readings for every day of your journey.",
  featureCompatibility: "Marriage Compatibility",
  featureCompatibilityDesc:
    "Free Kundli matching and astrology reports for better decisions.",
} as const;

export type OnboardingSlide = {
  title: string;
  description: string;
};

export const ONBOARDING_SLIDES: readonly OnboardingSlide[] = [
  {
    title: "AI-Powered\nAstrology Voice Chat",
    description:
      "Instant Vedic astrology insights — just talk and listen to your AI Jyotish.",
  },
  {
    title: "Personalized Daily\n& Life Predictions",
    description:
      "Discover accurate insights about your future with daily and life predictions.",
  },
  {
    title: "Marriage Compatibility\n& Free Astrology Reports",
    description:
      "Check your compatibility and access free astrology reports for better decisions.",
  },
] as const;

export const ONBOARDING_SCREEN = {
  skipLabel: "Skip",
  nextLabel: "Next",
  getStartedLabel: "Get Started",
  slideCounterLabel: (current: number, total: number) => `${current + 1} / ${total}`,
} as const;
