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
  compact = false,
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

  const pill = compact
    ? CHAT_LANDING_LAYOUT.metaPillCompact
    : CHAT_LANDING_LAYOUT.metaPill;
  const label = compact
    ? CHAT_LANDING_LAYOUT.metaLabelCompact
    : CHAT_LANDING_LAYOUT.metaLabel;
  const themeValue = compact
    ? CHAT_LANDING_LAYOUT.metaThemeValueCompact
    : CHAT_LANDING_LAYOUT.metaThemeValue;
  const valueCls = compact
    ? CHAT_LANDING_LAYOUT.metaValueCompact
    : CHAT_LANDING_LAYOUT.metaValue;

  return (
    <div
      className={
        compact ? CHAT_LANDING_LAYOUT.metaRowCompact : CHAT_LANDING_LAYOUT.metaRow
      }
    >
      <span className={pill}>
        <span className={label}>
          {copy.themeLabel}
          {copy.metaSeparator}
        </span>
        <span className={themeValue}>
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
      <span className={pill}>
        <span className={label}>
          {copy.currentDasaLabel}
          {copy.metaSeparator}
        </span>
        <span className={valueCls}>{dasaDisplay}</span>
      </span>
    </div>
  );
}
