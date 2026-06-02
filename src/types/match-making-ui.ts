import type { MatchMakingExisting } from "@/types/match-making";

export type MatchMakingDetailsLayoutProps = {
  data: MatchMakingExisting;
  onBackClick: () => void;
  onRegenerate: () => void;
  onExpertConnect: () => void;
};

export type MatchMakingPartnerColumnProps = {
  variant: "boy" | "girl";
  name: string;
  rasi: string;
  nakshatra: string;
};
