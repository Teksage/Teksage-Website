"use client";

import Image from "next/image";
import { useI18nConstants } from "@/hooks/useT";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import { CHAT_LANDING_LAYOUT, CHAT_LANDING_UI } from "@/lib/constants/chat-landing-ui";
import type { ChatLandingHeaderMetaProps } from "@/types/ui/chat-landing";

export function ChatLandingHeaderMeta({
  theme,
  dasaSummary,
  loading = false,
}: ChatLandingHeaderMetaProps) {
  const copy = useI18nConstants(CHAT_LANDING_UI);
  const themeText = theme?.trim();
  const dasaLabel = dasaSummary?.label?.trim();
  const daysRemaining = dasaSummary?.daysRemaining;

  const themeDisplay = loading && !themeText ? "…" : themeText || "—";
  const dasaDisplay =
    loading && !dasaLabel
      ? "…"
      : dasaLabel
        ? `${dasaLabel}${
            typeof daysRemaining === "number" && daysRemaining > 0
              ? ` ${copy.daysRemaining.replace("{days}", String(daysRemaining))}`
              : ""
          }`
        : "—";

  return (
    <div className={CHAT_LANDING_LAYOUT.metaRow}>
      <span className={CHAT_LANDING_LAYOUT.metaPill}>
        <span className={CHAT_LANDING_LAYOUT.metaLabel}>
          {copy.themeLabel}
          {copy.metaSeparator}
        </span>
        <span className={CHAT_LANDING_LAYOUT.metaThemeValue}>
          {themeText ? (
            <Image
              src={CHAT_ASSETS.themeSparkle}
              alt=""
              width={14}
              height={14}
              className={CHAT_LANDING_LAYOUT.metaThemeIcon}
              unoptimized
            />
          ) : null}
          {themeDisplay}
        </span>
      </span>
      <span className={CHAT_LANDING_LAYOUT.metaPill}>
        <span className={CHAT_LANDING_LAYOUT.metaLabel}>
          {copy.currentDasaLabel}
          {copy.metaSeparator}
        </span>
        <span className={CHAT_LANDING_LAYOUT.metaValue}>{dasaDisplay}</span>
      </span>
    </div>
  );
}
