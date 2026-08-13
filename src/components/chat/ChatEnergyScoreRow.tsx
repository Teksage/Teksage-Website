"use client";

import { ChatStarRating } from "@/components/chat/ChatStarRating";
import { useI18nConstants } from "@/hooks/useT";
import {
  CHAT_LANDING_ENERGY_LABELS,
  CHAT_LANDING_LAYOUT,
  CHAT_LANDING_UI,
} from "@/lib/constants/chat-landing-ui";
import type { ChatEnergyScoreRowProps } from "@/types/ui/chat-landing";

const SCORE_KEYS = ["career", "relationship", "wealth", "health"] as const;

export function ChatEnergyScoreRow({ scores }: ChatEnergyScoreRowProps) {
  const copy = useI18nConstants(CHAT_LANDING_UI);
  const labels = useI18nConstants(CHAT_LANDING_ENERGY_LABELS);

  return (
    <section className={CHAT_LANDING_LAYOUT.energySection}>
      <div className={CHAT_LANDING_LAYOUT.energyBar}>
        <span className={CHAT_LANDING_LAYOUT.energyTitle}>
          {copy.energyScoreTitle}
          {copy.metaSeparator}
        </span>
        {SCORE_KEYS.map((key, index) => (
          <span key={key} className={CHAT_LANDING_LAYOUT.energyItem}>
            {index > 0 ? (
              <span className={CHAT_LANDING_LAYOUT.energySeparator}>,</span>
            ) : null}
            <span className={CHAT_LANDING_LAYOUT.energyCategory}>
              {labels[key]}
            </span>
            <ChatStarRating value={scores[key]} />
          </span>
        ))}
      </div>
    </section>
  );
}
