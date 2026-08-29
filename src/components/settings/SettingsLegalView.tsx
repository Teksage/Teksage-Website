"use client";

import { SettingsLegalBlock } from "@/components/settings/SettingsLegalBlock";
import { LEGAL_LAST_UPDATED } from "@/lib/constants/legal";
import {
  SETTINGS_LEGAL_COPY,
  SETTINGS_LEGAL_UI as L,
} from "@/lib/constants/settings-legal-ui";
import { groupLegalBlocks } from "@/lib/group-legal-blocks";
import type { SettingsLegalViewProps } from "@/types";

export function SettingsLegalView({ title, blocks }: SettingsLegalViewProps) {
  const sections = groupLegalBlocks(blocks);

  return (
    <div className={L.column}>
      <article className={L.card}>
        <p className={L.meta}>
          {title} · {SETTINGS_LEGAL_COPY.lastUpdatedPrefix} {LEGAL_LAST_UPDATED}
        </p>
      </article>

      {sections.map((section, sectionIndex) => (
        <article key={`${section.heading ?? "intro"}-${sectionIndex}`} className={L.card}>
          {section.heading ? (
            <h2 className={L.heading}>{section.heading}</h2>
          ) : null}
          <div className={L.stack}>
            {section.items.map((block, index) => (
              <SettingsLegalBlock
                key={`${block.type}-${index}`}
                block={block}
                index={index}
              />
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
