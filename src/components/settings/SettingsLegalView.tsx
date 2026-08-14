"use client";

import { SettingsLegalBlock } from "@/components/settings/SettingsLegalBlock";
import { LEGAL_LAST_UPDATED } from "@/lib/constants/legal";
import { SETTINGS_LAYOUT } from "@/lib/constants/settings-screen";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import type { LegalBlock } from "@/types/settings-legal";

type SettingsLegalViewProps = {
  title: string;
  blocks: readonly LegalBlock[];
};

export function SettingsLegalView({ title, blocks }: SettingsLegalViewProps) {
  return (
    <div className={SETTINGS_LAYOUT.contentCard}>
      <div className={SETTINGS_LAYOUT.contentCardPad}>
        <p className={SETTINGS_UI.legalMeta}>
          {title} · Last updated: {LEGAL_LAST_UPDATED}
        </p>
        <div className={SETTINGS_UI.legalBody}>
          {blocks.map((block, index) => (
            <SettingsLegalBlock
              key={`${block.type}-${index}`}
              block={block}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
