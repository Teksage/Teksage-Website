"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { WelcomeFeatureRow } from "@/components/welcome/WelcomeFeatureRow";
import { useI18nConstants } from "@/hooks/useT";
import { ROUTES, WELCOME_ASSETS, WELCOME_SCREEN } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function WelcomePageContent() {
  const router = useRouter();
  const W = useI18nConstants(WELCOME_SCREEN);
  const features = [W.featureChat, W.featureYearly, W.featurePanchang];

  return (
    <main className="min-h-dvh bg-[var(--color-brand-primary)]">
      <div className="relative overflow-hidden pb-8">
        <div className="relative rounded-b-[50%_12%] bg-white pb-16 pt-12 text-center">
          <h1 className="whitespace-pre-line text-[1.75rem] font-bold leading-tight text-[var(--color-brand-primary)]">
            {W.title}
          </h1>
          <div className="relative mx-auto mt-8 flex size-[68px] items-center justify-center rounded-[18px] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
            <Image
              src={WELCOME_ASSETS.logo}
              alt=""
              width={40}
              height={40}
              unoptimized
              className="size-10"
            />
          </div>
        </div>

        <div className="relative z-10 -mt-10 px-5">
          <Image
            src={WELCOME_ASSETS.shadow}
            alt=""
            width={360}
            height={120}
            unoptimized
            className="mx-auto w-full max-w-md"
          />
          <p className="mt-2 whitespace-pre-line text-center text-lg font-semibold leading-snug text-white">
            {W.subtitle}
          </p>
          <p className="text-center text-sm font-medium text-white/90">{W.perMonth}</p>

          <div className="mt-8 rounded-[20px] bg-white/10 px-4 py-5">
            <p className="text-center text-lg font-bold text-white">{W.unlockTitle}</p>
            <ul className="mt-4 space-y-4">
              {features.map((label) => (
                <WelcomeFeatureRow key={label} label={label} />
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => router.push(ROUTES.settingsSubscriptions)}
            className={cn(
              "mt-8 flex w-full items-center justify-center rounded-full bg-white py-3",
              "text-lg font-semibold text-[var(--color-brand-primary)]"
            )}
          >
            {W.upgradePlan}
          </button>
          <button
            type="button"
            onClick={() => router.replace(ROUTES.home)}
            className="mt-4 w-full py-2 text-center text-lg font-semibold text-white"
          >
            {W.skip}
          </button>
        </div>
      </div>
    </main>
  );
}
