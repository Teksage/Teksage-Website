"use client";

import { useMemo } from "react";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";

/** Shorthand for `useAppLanguage().t` plus `languageVersion` for fetch deps. */
export function useT() {
  const { t, locale, version: languageVersion } = useAppLanguage();
  return { t, locale, languageVersion };
}

function translateDeep<T>(value: T, t: (key: string) => string): T {
  if (typeof value === "string") {
    return t(value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => translateDeep(item, t)) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = translateDeep(v, t);
    }
    return out as T;
  }
  return value;
}

/** Translate nested screen copy objects (strings + nested records + string arrays). */
export function useI18nConstants<T>(source: T): T {
  const { t } = useT();
  return useMemo(() => translateDeep(source, t), [source, t]);
}
