import type { LegalBlock, SettingsLegalTocItem } from "@/types/settings-legal";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function legalSectionId(label: string, index: number): string {
  return `legal-${index}-${slugify(label) || "section"}`;
}

export function legalTocItems(
  blocks: readonly LegalBlock[]
): SettingsLegalTocItem[] {
  const items: SettingsLegalTocItem[] = [];
  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (block.type === "heading") {
      items.push({
        id: legalSectionId(block.text, index),
        label: block.text,
        level: 1,
      });
    } else if (block.type === "subsection") {
      items.push({
        id: legalSectionId(block.title, index),
        label: block.title,
        level: 2,
      });
    }
  }
  return items;
}
