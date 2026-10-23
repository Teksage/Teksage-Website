import type { AskAstrologerPreviousQa } from "@/types/ask-astrologer";

export type AskRequestPreviousQaSectionProps = {
  items: AskAstrologerPreviousQa[];
  count: number;
  currentAstrologerName?: string | null;
  customerName?: string | null;
};
