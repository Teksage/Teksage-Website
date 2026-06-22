import type { MatchMakingExisting } from "@/types/match-making";

export type MatchMakingDetailsLayoutProps = {
  data: MatchMakingExisting;
  onBackClick: () => void;
  onRegenerate: () => void;
  onExpertConnect: () => void;
  onDownloadPdf?: () => void;
  pdfBusy?: boolean;
};

export type MatchMakingPartnerColumnProps = {
  variant: "boy" | "girl";
  name: string;
  rasi: string;
  nakshatra: string;
};
