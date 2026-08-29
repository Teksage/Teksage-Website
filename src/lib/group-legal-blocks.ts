import type { LegalBlock, LegalSectionGroup } from "@/types/settings-legal";

/** Split policy copy into heading-led sections for stacked reading cards. */
export function groupLegalBlocks(
  blocks: readonly LegalBlock[]
): LegalSectionGroup[] {
  const groups: LegalSectionGroup[] = [];
  let heading: string | null = null;
  let items: LegalBlock[] = [];

  function flush() {
    if (heading || items.length) {
      groups.push({ heading, items });
    }
    heading = null;
    items = [];
  }

  for (const block of blocks) {
    if (block.type === "heading") {
      flush();
      heading = block.text;
    } else {
      items.push(block);
    }
  }
  flush();
  return groups;
}
