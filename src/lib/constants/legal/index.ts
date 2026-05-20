export { LEGAL_LAST_UPDATED, LEGAL_SUPPORT_EMAIL } from "@/lib/constants/legal/shared";
export { TERMS_LEGAL_BLOCKS } from "@/lib/constants/legal/terms-blocks";
export { PRIVACY_LEGAL_BLOCKS_PART_1 } from "@/lib/constants/legal/privacy-blocks-1";
export { PRIVACY_LEGAL_BLOCKS_PART_2 } from "@/lib/constants/legal/privacy-blocks-2";
import type { LegalBlock } from "@/types/settings-legal";
import { PRIVACY_LEGAL_BLOCKS_PART_1 } from "@/lib/constants/legal/privacy-blocks-1";
import { PRIVACY_LEGAL_BLOCKS_PART_2 } from "@/lib/constants/legal/privacy-blocks-2";

export const PRIVACY_LEGAL_BLOCKS: readonly LegalBlock[] = [
  ...PRIVACY_LEGAL_BLOCKS_PART_1,
  ...PRIVACY_LEGAL_BLOCKS_PART_2,
];
