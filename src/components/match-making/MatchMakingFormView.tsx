"use client";

import { useI18nConstants } from "@/hooks/useT";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { MatchMakingPartnerSection } from "@/components/match-making/MatchMakingPartnerSection";
import { MATCH_MAKING_ASSETS } from "@/lib/constants/prediction-assets";
import { MATCH_MAKING_SCREEN } from "@/lib/constants/match-making-screen";
import { PAGE_SHELL, ROUTES } from "@/lib/constants";
import { MATCH_MAKING_LAYOUT } from "@/lib/constants/match-making-layout";
import { LoginPromptButton } from "@/components/common/LoginPromptButton";
import { cn } from "@/lib/utils";
import {
  normalizeProfileDateForApi,
  normalizeProfileTimeForApi,
} from "@/lib/profile-birth-normalize";
import { submitCompatibility } from "@/lib/services/match-making";
import { useAuthStore } from "@/store/auth.store";

export function MatchMakingFormView() {
  const MM = useI18nConstants(MATCH_MAKING_SCREEN);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [boyName, setBoyName] = useState("");
  const [girlName, setGirlName] = useState("");
  const [boyDob, setBoyDob] = useState("");
  const [girlDob, setGirlDob] = useState("");
  const [boyTob, setBoyTob] = useState("");
  const [girlTob, setGirlTob] = useState("");
  const [boyPob, setBoyPob] = useState("");
  const [girlPob, setGirlPob] = useState("");
  const [boyPobFull, setBoyPobFull] = useState("");
  const [girlPobFull, setGirlPobFull] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const boyLoc = (boyPobFull || boyPob).trim();
      const girlLoc = (girlPobFull || girlPob).trim();
      const res = await submitCompatibility({
        boy_name: boyName.trim(),
        boy_date_of_birth: normalizeProfileDateForApi(boyDob),
        boy_time_of_birth: normalizeProfileTimeForApi(boyTob),
        boy_birth_location: boyLoc,
        girl_name: girlName.trim(),
        girl_date_of_birth: normalizeProfileDateForApi(girlDob),
        girl_time_of_birth: normalizeProfileTimeForApi(girlTob),
        girl_birth_location: girlLoc,
      });
      if (!res) {
        setErr(MM.loadErrorTitle);
        return;
      }
      router.push(ROUTES.matchmakingDetails);
      router.refresh();
    } catch {
      setErr(MM.loadErrorTitle);
    } finally {
      setBusy(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root, "bg-[var(--color-brand-bg)]")}>
        <div className="mx-auto max-w-lg px-5 py-10 text-center">
          <p className="font-semibold">{MM.loginTitle}</p>
          <LoginPromptButton
            returnPath={ROUTES.matchmaking}
            redirectHomeOnClose
            className={cn(buttonVariants(), "mt-6 inline-flex rounded-full")}
          >
            {MM.loginCta}
          </LoginPromptButton>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root, MATCH_MAKING_LAYOUT.pageRoot)}>
      <header className="w-full shrink-0">
        <div className={MATCH_MAKING_LAYOUT.heroInner}>
          <button
            type="button"
            onClick={() => router.back()}
            className={MATCH_MAKING_LAYOUT.backButton}
            aria-label="Go back"
          >
            <img
              src={MATCH_MAKING_ASSETS.appBarBack}
              alt=""
              className="h-5 w-5 brightness-0 invert"
            />
          </button>
          <div className={MATCH_MAKING_LAYOUT.heroCopy}>
            <h1 className={MATCH_MAKING_LAYOUT.heroTitle}>{MM.pageTitle}</h1>
            <p className={MATCH_MAKING_LAYOUT.heroSubtitle}>{MM.subtitle}</p>
          </div>
        </div>
      </header>

      <form onSubmit={(e) => void onSubmit(e)} className={MATCH_MAKING_LAYOUT.formBody}>
        {err ? (
          <p className="text-center text-sm font-semibold text-white">{err}</p>
        ) : null}
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6">
          <MatchMakingPartnerSection
            variant="boy"
            name={boyName}
            onNameChange={setBoyName}
            dateOfBirth={boyDob}
            onDateOfBirthChange={setBoyDob}
            timeOfBirth={boyTob}
            onTimeOfBirthChange={setBoyTob}
            placeOfBirth={boyPob}
            birthLocationFull={boyPobFull}
            onPlaceOfBirthChange={(city, full) => {
              setBoyPob(city);
              setBoyPobFull(full);
            }}
          />
          <MatchMakingPartnerSection
            variant="girl"
            name={girlName}
            onNameChange={setGirlName}
            dateOfBirth={girlDob}
            onDateOfBirthChange={setGirlDob}
            timeOfBirth={girlTob}
            onTimeOfBirthChange={setGirlTob}
            placeOfBirth={girlPob}
            birthLocationFull={girlPobFull}
            onPlaceOfBirthChange={(city, full) => {
              setGirlPob(city);
              setGirlPobFull(full);
            }}
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-[1.25rem] bg-white py-3 text-lg font-semibold text-[var(--color-match-button-text)] disabled:opacity-70"
        >
          {busy ? MM.submitting : MM.calculateCta}
          <Image src={MATCH_MAKING_ASSETS.ring} alt="" width={22} height={22} unoptimized />
        </button>
        <Link
          href={ROUTES.matchmakingDetails}
          className="text-center text-sm font-semibold text-white underline-offset-2 hover:underline"
        >
          {MM.viewSavedMatch}
        </Link>
      </form>
    </div>
  );
}
