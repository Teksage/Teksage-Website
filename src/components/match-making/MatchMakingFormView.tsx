"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { MatchMakingPartnerSection } from "@/components/match-making/MatchMakingPartnerSection";
import { MATCH_MAKING_ASSETS } from "@/lib/constants/prediction-assets";
import { MATCH_MAKING_SCREEN } from "@/lib/constants/match-making-screen";
import { PAGE_SHELL, ROUTES } from "@/lib/constants";
import { buildLoginRedirectPath } from "@/lib/login-redirect";
import { cn } from "@/lib/utils";
import {
  fetchNakshatraList,
  fetchRashiList,
  submitCompatibility,
} from "@/lib/services/match-making";
import { useAuthStore } from "@/store/auth.store";
import type { RashiOption } from "@/types/match-making";

export function MatchMakingFormView() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [rashi, setRashi] = useState<RashiOption[]>([]);
  const [boyNaks, setBoyNaks] = useState<{ id: number; name: string }[]>([]);
  const [girlNaks, setGirlNaks] = useState<{ id: number; name: string }[]>([]);
  const [boyName, setBoyName] = useState("");
  const [girlName, setGirlName] = useState("");
  const [boyRashi, setBoyRashi] = useState("");
  const [girlRashi, setGirlRashi] = useState("");
  const [boyNak, setBoyNak] = useState("");
  const [girlNak, setGirlNak] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetchRashiList().then(setRashi).catch(() => setRashi([]));
  }, []);

  useEffect(() => {
    const opt = rashi.find((x) => x.name === boyRashi);
    if (!opt) {
      setBoyNaks([]);
      return;
    }
    fetchNakshatraList(opt.id).then(setBoyNaks).catch(() => setBoyNaks([]));
  }, [boyRashi, rashi]);

  useEffect(() => {
    const opt = rashi.find((x) => x.name === girlRashi);
    if (!opt) {
      setGirlNaks([]);
      return;
    }
    fetchNakshatraList(opt.id).then(setGirlNaks).catch(() => setGirlNaks([]));
  }, [girlRashi, rashi]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const res = await submitCompatibility({
        boy_name: boyName.trim(),
        girl_name: girlName.trim(),
        boy_rashi: boyRashi,
        boy_nakshatra: boyNak,
        girl_rashi: girlRashi,
        girl_nakshatra: girlNak,
      });
      if (!res) {
        setErr(MATCH_MAKING_SCREEN.loadErrorTitle);
        return;
      }
      router.push(ROUTES.matchmakingDetails);
      router.refresh();
    } catch {
      setErr(MATCH_MAKING_SCREEN.loadErrorTitle);
    } finally {
      setBusy(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root, "bg-[var(--color-brand-bg)]")}>
        <div className="mx-auto max-w-lg px-5 py-10 text-center">
          <p className="font-semibold">{MATCH_MAKING_SCREEN.loginTitle}</p>
          <Link
            href={buildLoginRedirectPath(ROUTES.matchmaking)}
            className={cn(buttonVariants(), "mt-6 inline-flex rounded-full")}
          >
            {MATCH_MAKING_SCREEN.loginCta}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        PAGE_SHELL.column,
        PAGE_SHELL.root,
        "min-h-dvh bg-[linear-gradient(180deg,var(--color-match-top)_0%,var(--color-match-bottom)_100%)]"
      )}
    >
      <header className="relative px-5 pb-2 pt-10 text-center text-white">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-3 top-8 p-2"
          aria-label="Go back"
        >
          <img src={MATCH_MAKING_ASSETS.appBarBack} alt="" className="h-5 w-5 brightness-0 invert" />
        </button>
        <h1 className="text-xl font-bold">{MATCH_MAKING_SCREEN.pageTitle}</h1>
        <p className="mt-2 text-sm font-medium">{MATCH_MAKING_SCREEN.subtitle}</p>
      </header>

      <form onSubmit={(e) => void onSubmit(e)} className="flex flex-col gap-4 px-5 pb-12 pt-6">
        {err ? (
          <p className="text-center text-sm font-semibold text-white">{err}</p>
        ) : null}
        <MatchMakingPartnerSection
          variant="boy"
          name={boyName}
          onNameChange={setBoyName}
          rashi={boyRashi}
          onRashiChange={(v) => {
            setBoyRashi(v);
            setBoyNak("");
          }}
          nakshatra={boyNak}
          onNakshatraChange={setBoyNak}
          rashiList={rashi}
          nakshatraList={boyNaks}
        />
        <MatchMakingPartnerSection
          variant="girl"
          name={girlName}
          onNameChange={setGirlName}
          rashi={girlRashi}
          onRashiChange={(v) => {
            setGirlRashi(v);
            setGirlNak("");
          }}
          nakshatra={girlNak}
          onNakshatraChange={setGirlNak}
          rashiList={rashi}
          nakshatraList={girlNaks}
        />
        <button
          type="submit"
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-[1.25rem] bg-white py-3 text-lg font-semibold text-[var(--color-match-button-text)] disabled:opacity-70"
        >
          {busy ? MATCH_MAKING_SCREEN.submitting : MATCH_MAKING_SCREEN.calculateCta}
          <Image src={MATCH_MAKING_ASSETS.ring} alt="" width={22} height={22} unoptimized />
        </button>
        <Link
          href={ROUTES.matchmakingDetails}
          className="text-center text-sm font-semibold text-white underline-offset-2 hover:underline"
        >
          {MATCH_MAKING_SCREEN.viewSavedMatch}
        </Link>
      </form>
    </div>
  );
}
