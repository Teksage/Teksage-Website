"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { FaqAccordionItem } from "@/components/settings/FaqAccordionItem";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { ROUTES } from "@/lib/constants/routes";
import { SETTINGS_FAQ_COPY } from "@/lib/constants/settings-faq";
import { SETTINGS_LAYOUT } from "@/lib/constants/settings-screen";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import { fetchFaqs } from "@/lib/services/settings-faq";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types/settings";

export function SettingsFaqView() {
  const SF = useI18nConstants(SETTINGS_FAQ_COPY);
  const { version: languageVersion } = useAppLanguage();
  const [items, setItems] = useState<FaqItem[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetchFaqs()
      .then((rows) => {
        if (!cancelled) setItems(rows);
      })
      .catch(() => {
        if (!cancelled) setError(SF.loadFailed);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [languageVersion, SF.loadFailed]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <div>
      <div className={SETTINGS_LAYOUT.contentCard}>
        <div className={SETTINGS_LAYOUT.contentCardPad}>
          <div className={SETTINGS_UI.faqSearch}>
            <input
              type="text"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={SF.searchPlaceholder}
              className={SETTINGS_UI.faqSearchInput}
            />
            <Image
              src={SETTINGS_PAGE_ASSETS.search}
              alt=""
              width={20}
              height={20}
              unoptimized
              className={SETTINGS_UI.faqSearchIcon}
            />
          </div>
          <div className="mt-4">
            {loading ? (
              <p className="py-6 text-center text-sm text-black/45">Loading…</p>
            ) : null}
            {error ? (
              <p className="py-6 text-center text-sm text-[var(--color-brand-error)]">
                {error}
              </p>
            ) : null}
            {!loading && !error && filtered.length === 0 ? (
              <p className="py-6 text-center text-sm font-medium text-black/50">
                {SF.empty}
              </p>
            ) : null}
            {filtered.map((item) => (
              <FaqAccordionItem
                key={item.faqId}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </div>
      <footer className={cn(SETTINGS_UI.faqFooter, SETTINGS_LAYOUT.contentCard, "mt-4")}>
        <div className={cn(SETTINGS_LAYOUT.contentCardPad, SETTINGS_UI.faqFooterInner)}>
          <p className="text-base font-medium text-[var(--color-brand-black)]">
            {SF.stillHaveQuestions}
          </p>
          <Link
            href={`${ROUTES.settings}/support`}
            className={SETTINGS_UI.faqContactBtn}
          >
            {SF.contactSupport}
          </Link>
        </div>
      </footer>
    </div>
  );
}
