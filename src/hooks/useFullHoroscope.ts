"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import {
  fetchDivisionalCharts,
  fetchHoroscopeDasa,
  fetchHoroscopeAshtaVarga,
  fetchHoroscopeSpecialLagna,
  fetchHoroscopeShadbala,
  fetchHoroscopeBhavaPosition,
  fetchHoroscopePlanetaryPosition,
} from "@/lib/services/full-horoscope";
import type {
  DivisionalChart,
  DasaPayload,
  AshtaVargaPayload,
  SpecialLagnaPayload,
  ShadbalaPayload,
  BhavaPositionPayload,
  PlanetaryPositionPayload,
  FullHoroscopeSection,
} from "@/types";

export interface FullHoroscopeState {
  charts: FullHoroscopeSection<DivisionalChart[]>;
  dasa: FullHoroscopeSection<DasaPayload>;
  ashtaVarga: FullHoroscopeSection<AshtaVargaPayload>;
  specialLagna: FullHoroscopeSection<SpecialLagnaPayload>;
  shadbala: FullHoroscopeSection<ShadbalaPayload>;
  bhavaPosition: FullHoroscopeSection<BhavaPositionPayload>;
  planetaryPosition: FullHoroscopeSection<PlanetaryPositionPayload>;
  isAnyLoading: boolean;
}

function makeSection<T>(): FullHoroscopeSection<T> {
  return { data: null, isLoading: false, error: null };
}

function errorMsg(err: unknown): string {
  if (err instanceof Error) return err.message;
  return "Failed to load";
}

export function useFullHoroscope() {
  const { isAuthenticated } = useAuthStore();

  const [charts, setCharts] = useState<FullHoroscopeSection<DivisionalChart[]>>(makeSection);
  const [dasa, setDasa] = useState<FullHoroscopeSection<DasaPayload>>(makeSection);
  const [ashtaVarga, setAshtaVarga] = useState<FullHoroscopeSection<AshtaVargaPayload>>(makeSection);
  const [specialLagna, setSpecialLagna] = useState<FullHoroscopeSection<SpecialLagnaPayload>>(makeSection);
  const [shadbala, setShadbala] = useState<FullHoroscopeSection<ShadbalaPayload>>(makeSection);
  const [bhavaPosition, setBhavaPosition] = useState<FullHoroscopeSection<BhavaPositionPayload>>(makeSection);
  const [planetaryPosition, setPlanetaryPosition] = useState<FullHoroscopeSection<PlanetaryPositionPayload>>(makeSection);

  const load = useCallback(() => {
    if (!isAuthenticated) return;

    const loading = { data: null, isLoading: true, error: null };
    setCharts(loading);
    setDasa(loading);
    setAshtaVarga(loading);
    setSpecialLagna(loading);
    setShadbala(loading);
    setBhavaPosition(loading);
    setPlanetaryPosition(loading);

    Promise.allSettled([
      fetchDivisionalCharts(),
      fetchHoroscopeDasa(),
      fetchHoroscopeAshtaVarga(),
      fetchHoroscopeSpecialLagna(),
      fetchHoroscopeShadbala(),
      fetchHoroscopeBhavaPosition(),
      fetchHoroscopePlanetaryPosition(),
    ]).then(([r0, r1, r2, r3, r4, r5, r6]) => {
      setCharts({ data: r0.status === "fulfilled" ? r0.value : null, isLoading: false, error: r0.status === "rejected" ? errorMsg(r0.reason) : null });
      setDasa({ data: r1.status === "fulfilled" ? r1.value : null, isLoading: false, error: r1.status === "rejected" ? errorMsg(r1.reason) : null });
      setAshtaVarga({ data: r2.status === "fulfilled" ? r2.value : null, isLoading: false, error: r2.status === "rejected" ? errorMsg(r2.reason) : null });
      setSpecialLagna({ data: r3.status === "fulfilled" ? r3.value : null, isLoading: false, error: r3.status === "rejected" ? errorMsg(r3.reason) : null });
      setShadbala({ data: r4.status === "fulfilled" ? r4.value : null, isLoading: false, error: r4.status === "rejected" ? errorMsg(r4.reason) : null });
      setBhavaPosition({ data: r5.status === "fulfilled" ? r5.value : null, isLoading: false, error: r5.status === "rejected" ? errorMsg(r5.reason) : null });
      setPlanetaryPosition({ data: r6.status === "fulfilled" ? r6.value : null, isLoading: false, error: r6.status === "rejected" ? errorMsg(r6.reason) : null });
    });
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    queueMicrotask(load);
  }, [isAuthenticated, load]);

  const isAnyLoading =
    charts.isLoading || dasa.isLoading || ashtaVarga.isLoading ||
    specialLagna.isLoading || shadbala.isLoading || bhavaPosition.isLoading ||
    planetaryPosition.isLoading;

  return {
    isAuthenticated,
    charts,
    dasa,
    ashtaVarga,
    specialLagna,
    shadbala,
    bhavaPosition,
    planetaryPosition,
    isAnyLoading,
  };
}
