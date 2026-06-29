"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import {
  ONBOARDING_SLIDES,
  ONBOARDING_SCREEN,
} from "@/lib/constants/welcome-onboarding";

const SLIDE_ICONS = ["🗣️", "📅", "💍"];

/** Mirrors Flutter `OnboardingPage` — 3-step swipeable slides with skip / next. */
export function OnboardingPageContent() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const total = ONBOARDING_SLIDES.length;

  function finish() {
    router.push(ROUTES.home);
  }

  function next() {
    if (current < total - 1) {
      setCurrent((c) => c + 1);
    } else {
      finish();
    }
  }

  function skip() {
    finish();
  }

  const slide = ONBOARDING_SLIDES[current];
  const isLast = current === total - 1;

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-brand-primary)]">
      {/* Skip */}
      <div className="flex justify-end px-6 pt-10">
        <button
          onClick={skip}
          className="text-sm font-semibold text-white opacity-80 hover:opacity-100"
        >
          {ONBOARDING_SCREEN.skipLabel}
        </button>
      </div>

      {/* Slide content */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 pb-6 text-center text-white">
        <span className="text-6xl leading-none">{SLIDE_ICONS[current]}</span>
        <h2 className="text-2xl font-extrabold leading-tight tracking-tight whitespace-pre-line">
          {slide.title}
        </h2>
        <p className="max-w-xs text-sm leading-relaxed opacity-90">{slide.description}</p>
      </div>

      {/* Dot indicator */}
      <div className="flex justify-center gap-2 pb-4">
        {ONBOARDING_SLIDES.map((_, i) => (
          <span
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-2 w-2 cursor-pointer rounded-full transition-all",
              i === current ? "w-5 bg-white" : "bg-white/40"
            )}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="px-6 pb-10">
        <Button
          size="lg"
          onClick={next}
          className="w-full rounded-full bg-white font-bold text-[var(--color-brand-primary)] hover:bg-gray-100"
        >
          {isLast ? ONBOARDING_SCREEN.getStartedLabel : ONBOARDING_SCREEN.nextLabel}
        </Button>
      </div>
    </div>
  );
}
