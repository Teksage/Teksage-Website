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

export type MatchMakingPartnerSectionProps = {
  variant: "boy" | "girl";
  name: string;
  onNameChange: (v: string) => void;
  dateOfBirth: string;
  onDateOfBirthChange: (v: string) => void;
  timeOfBirth: string;
  onTimeOfBirthChange: (v: string) => void;
  placeOfBirth: string;
  birthLocationFull: string;
  onPlaceOfBirthChange: (city: string, full: string) => void;
};
