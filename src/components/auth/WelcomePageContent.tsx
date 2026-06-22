"use client";

import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PUBLIC_ASSETS } from "@/lib/constants/assets";
import { ROUTES } from "@/lib/constants/routes";
import { WELCOME_SCREEN } from "@/lib/constants/welcome-onboarding";

const FEATURE_CARDS: Array<{ title: string; desc: string; icon: string }> = [
  { title: WELCOME_SCREEN.featureAi, desc: WELCOME_SCREEN.featureAiDesc, icon: "✨" },
  {
    title: WELCOME_SCREEN.featurePredictions,
    desc: WELCOME_SCREEN.featurePredictionsDesc,
    icon: "🔮",
  },
  {
    title: WELCOME_SCREEN.featureCompatibility,
    desc: WELCOME_SCREEN.featureCompatibilityDesc,
    icon: "💫",
  },
];

/** Mirrors Flutter `WelcomePage` — brand-primary hero + feature cards. */
export function WelcomePageContent() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center gap-5 bg-[var(--color-brand-primary)] px-6 pb-10 pt-14 text-center text-white">
        <Image
          src={PUBLIC_ASSETS.appLogo}
          alt="Teksage"
          width={64}
          height={64}
          className="rounded-2xl"
          priority
        />
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight whitespace-pre-line">
          {WELCOME_SCREEN.heading}
        </h1>
        <p className="max-w-xs text-sm leading-relaxed opacity-90">
          {WELCOME_SCREEN.tagline}
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs pt-2">
          <Link
            href={ROUTES.home}
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full bg-white text-[var(--color-brand-primary)] font-bold hover:bg-gray-100"
            )}
          >
            {WELCOME_SCREEN.getStartedCta}
          </Link>
          <Link
            href={ROUTES.onboarding}
            className="text-sm font-medium text-white underline underline-offset-2 opacity-80"
          >
            {WELCOME_SCREEN.learnMoreCta}
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="flex flex-1 flex-col gap-4 bg-white px-6 py-8 sm:mx-auto sm:w-full sm:max-w-md">
        {FEATURE_CARDS.map(({ title, desc, icon }) => (
          <div
            key={title}
            className="flex items-start gap-4 rounded-2xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-brand-primary)_5%,white)] px-4 py-4"
          >
            <span className="mt-0.5 text-2xl leading-none">{icon}</span>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold text-[var(--color-brand-black)]">{title}</p>
              <p className="text-xs leading-relaxed text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
