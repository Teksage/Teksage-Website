"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ONBOARDING_ASSETS,
  ONBOARDING_SCREEN,
  ONBOARDING_SLIDES,
  ROUTES,
} from "@/lib/constants";
import { markOnboardingSeen } from "@/lib/onboarding-storage";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { APP_LANGUAGE_OPTIONS } from "@/lib/constants/settings-language";
import { cn } from "@/lib/utils";
import type { AppLanguageCode } from "@/types/settings";

export function OnboardingPageContent() {
  const { applyLanguageSelection } = useAppLanguage();
  const [index, setIndex] = useState(0);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [languageBusy, setLanguageBusy] = useState(false);
  const slide = ONBOARDING_SLIDES[index];
  const isFirst = index === 0;
  const isLast = index === ONBOARDING_SLIDES.length - 1;

  function openLanguageDialog() {
    markOnboardingSeen();
    setShowLanguageDialog(true);
  }

  async function finish(code: AppLanguageCode) {
    if (languageBusy) return;
    setLanguageBusy(true);
    try {
      await applyLanguageSelection(code, {
        redirectTo: ROUTES.home,
        replace: true,
      });
    } finally {
      setLanguageBusy(false);
    }
  }

  function previousSlide() {
    if (isFirst) return;
    setIndex((current) => Math.max(current - 1, 0));
  }

  function nextSlide() {
    if (isLast) {
      openLanguageDialog();
      return;
    }
    setIndex((current) => Math.min(current + 1, ONBOARDING_SLIDES.length - 1));
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-brand-primary)]">
      <section className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-8 pt-3 md:max-w-6xl md:px-10 md:py-8">
        <div className="flex flex-1 flex-col justify-center">
          <div className="relative flex flex-col items-center md:grid md:grid-cols-2 md:items-center md:gap-x-14 md:gap-y-8">
            <div className={cn("relative w-full md:order-2", index === 1 ? "pt-6 md:pt-0" : "pt-0")}>
              <div className="relative mx-auto h-[360px] w-full max-w-[350px] overflow-hidden md:h-[min(68vh,620px)] md:max-w-[520px]">
                <Image
                  src={slide.image}
                  alt=""
                  width={360}
                  height={380}
                  priority
                  className={cn(
                    "mx-auto h-full w-full object-contain object-top",
                    index === 0 && "md:scale-[1.18]",
                    index === 1 && "scale-[1.04] md:scale-[1.22] md:-translate-y-2",
                    index === 2 && "scale-[0.97] md:scale-[1.16]"
                  )}
                />
                {index === 1 ? (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--color-brand-primary)] md:h-28" />
                ) : null}
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center justify-center px-2 text-center text-white md:order-1 md:mt-0 md:items-start md:self-center md:px-0 md:text-left">
              <h2 className="whitespace-pre-line text-[2rem] font-bold leading-[1.1] md:text-[3rem]">
                {slide.title}
              </h2>
              <p className="mt-4 max-w-[330px] text-base font-medium leading-6 md:max-w-[480px] md:text-xl md:leading-8">
                {slide.description}
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-3 flex items-center justify-between md:mx-auto md:mt-8 md:w-full md:max-w-[520px]">
          <button
            type="button"
            onClick={previousSlide}
            className={cn(
              "flex h-12 w-[86px] items-center justify-center rounded-[20px]",
              isFirst ? "bg-white/20" : "bg-white"
            )}
          >
            <Image src={ONBOARDING_ASSETS.arrowBack} alt="" width={22} height={18} className="h-[18px] w-[22px]" />
          </button>

          <div className="flex items-center gap-2">
            {ONBOARDING_SLIDES.map((item, dotIndex) => (
              <span
                key={item.id}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all",
                  dotIndex === index ? "bg-white" : "bg-white/40"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            className="flex h-12 w-[86px] items-center justify-center rounded-[20px] bg-white"
          >
            <Image src={ONBOARDING_ASSETS.arrowForward} alt="" width={22} height={18} className="h-[18px] w-[22px]" />
          </button>
        </div>

        <button
          type="button"
          onClick={openLanguageDialog}
          className="relative z-10 mt-6 text-center text-lg font-medium text-white"
        >
          {ONBOARDING_SCREEN.skip}
        </button>
      </section>

      <Image
        src={ONBOARDING_ASSETS.iosBottomBackground}
        alt=""
        width={1000}
        height={500}
        priority
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 hidden w-full md:block md:opacity-35"
      />
      {showLanguageDialog ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/55 px-6 md:px-8">
          <div className="w-full max-w-[20rem] rounded-[30px] bg-[#EFF3EA] p-5 md:max-w-2xl md:rounded-[34px] md:p-8">
            <h3 className="text-[1.5rem] font-bold leading-[1.08] text-black md:text-[2.1rem]">
              {ONBOARDING_SCREEN.languageTitle}
            </h3>
            <p className="mt-2.5 text-[0.98rem] leading-tight text-black/45 md:mt-3 md:text-[1.08rem]">
              {ONBOARDING_SCREEN.languageSubtitle}
            </p>
            <div className="mt-3.5 space-y-2.5 md:mt-5 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
              {APP_LANGUAGE_OPTIONS.map((option) => (
                <button
                  key={option.code}
                  type="button"
                  disabled={languageBusy}
                  onClick={() => void finish(option.code)}
                  className="flex h-12 w-full items-center rounded-2xl bg-white px-4.5 text-left text-[0.98rem] font-medium text-black transition-colors hover:bg-white/90 disabled:opacity-60 md:h-14 md:px-5 md:text-[1rem]"
                >
                  {option.nativeLabel} ({option.label})
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
