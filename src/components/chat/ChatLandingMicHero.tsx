"use client";

import { useI18nConstants } from "@/hooks/useT";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import { CHAT_LANDING_LAYOUT, CHAT_LANDING_UI } from "@/lib/constants/chat-landing-ui";
import type { ChatLandingMicHeroProps } from "@/types/ui/chat-landing";

export function ChatLandingMicHero({
  onSpeak,
  disabled = false,
}: ChatLandingMicHeroProps) {
  const copy = useI18nConstants(CHAT_LANDING_UI);

  return (
    <section className={CHAT_LANDING_LAYOUT.heroSection}>
      <div className={CHAT_LANDING_LAYOUT.heroGlow} aria-hidden />

      <div className={CHAT_LANDING_LAYOUT.voiceReadyBadge}>
        <span className={CHAT_LANDING_LAYOUT.voiceReadyChevron} aria-hidden />
        <span className={CHAT_LANDING_LAYOUT.voiceReadyText}>
          {copy.voiceGuideReady}
        </span>
      </div>

      <button
        type="button"
        className={CHAT_LANDING_LAYOUT.micButton}
        onClick={onSpeak}
        disabled={disabled}
        aria-label={copy.speakAria}
      >
        <img
          src={CHAT_ASSETS.landingMic}
          alt=""
          className={CHAT_LANDING_LAYOUT.micImage}
        />
      </button>

      <p className={CHAT_LANDING_LAYOUT.heroHeadline}>
        {copy.tapToSpeakPrefix}{" "}
        <span className={CHAT_LANDING_LAYOUT.heroHeadlineAccent}>
          {copy.tapToSpeakHighlight}
        </span>
      </p>
    </section>
  );
}
