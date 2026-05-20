"use client";

import Image from "next/image";
import { SettingsLegalBlock } from "@/components/settings/SettingsLegalBlock";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { LEGAL_LAST_UPDATED } from "@/lib/constants/legal";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import type { LegalBlock } from "@/types/settings-legal";
import { cn } from "@/lib/utils";

type SettingsLegalViewProps = {
  title: string;
  blocks: readonly LegalBlock[];
  onBack: () => void;
};

export function SettingsLegalView({ title, blocks, onBack }: SettingsLegalViewProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className={SETTINGS_UI.legalHero}>
        <button
          type="button"
          onClick={onBack}
          className="mb-2 flex size-10 items-center justify-center"
          aria-label="Back"
        >
          <Image
            src={SETTINGS_PAGE_ASSETS.backOnDark}
            alt=""
            width={24}
            height={24}
            unoptimized
            className="size-6"
          />
        </button>
        <h1 className={SETTINGS_UI.legalHeroTitle}>{title}</h1>
        <p className={SETTINGS_UI.legalHeroDate}>
          Last updated: {LEGAL_LAST_UPDATED}
        </p>
      </div>
      <div className={cn(SETTINGS_UI.legalBody, "flex-1 overflow-y-auto pb-10")}>
        {blocks.map((block, index) => (
          <SettingsLegalBlock key={`${block.type}-${index}`} block={block} index={index} />
        ))}
      </div>
    </div>
  );
}
