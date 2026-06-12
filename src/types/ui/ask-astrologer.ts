import type { ReactNode } from "react";
import type { AskAstrologerPricing } from "@/types/ask-astrologer";
import type { WhatsAppUpdatesPhoneChoiceProps } from "@/types/whatsapp-updates";

export interface AskAstrologerShellProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  onBack?: () => void;
  showBack?: boolean;
  /** Center content like consultation checkout / booking details. */
  centered?: boolean;
}

export interface AskAstrologerCheckoutFeesProps {
  pricing: AskAstrologerPricing;
  currency: string;
  baseAmount: number;
  total: number;
  isINR: boolean;
}

export interface AskAstrologerLanguagesContentProps {
  primary: string;
  secondary: string;
  firstError: string | null;
  secondError: string | null;
  onPrimaryChange: (value: string) => void;
  onSecondaryChange: (value: string) => void;
}

export interface AskAstrologerCheckoutContentProps {
  userQuestion: string;
  preferredLanguages: string[];
  pricing: AskAstrologerPricing;
  currency: string;
  baseAmount: number;
  total: number;
  isINR: boolean;
}

export interface AskAstrologerWhatsAppConsentContentProps {
  verified: boolean;
  phoneChoiceProps: WhatsAppUpdatesPhoneChoiceProps;
}