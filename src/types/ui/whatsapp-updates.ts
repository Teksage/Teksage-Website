import type {
  WhatsAppConsentPhoneMode,
  WhatsAppConsentRequestPayload,
  WhatsAppConsentState,
} from "@/types/whatsapp-updates";

export type WhatsAppUpdatesPageContentProps = {
  className?: string;
};

export type WhatsAppUpdatesPhoneChoiceProps = {
  mode: WhatsAppConsentPhoneMode;
  profileMasked: string;
  countryCode: string;
  mobile: string;
  onModeChange: (mode: WhatsAppConsentPhoneMode) => void;
  onCountryCodeChange: (value: string) => void;
  onMobileChange: (value: string) => void;
  validationError: string | null;
  /** Ask Astrologer flow — card-style options inside gray panel. */
  variant?: "default" | "flow";
};

export type WhatsAppUpdatesCtaProps = {
  disabled: boolean;
  loading: boolean;
  onEnable: () => void;
  className?: string;
  showStopNote?: boolean;
  hintText?: string;
  ctaLabel?: string;
  /** Ask Astrologer flow — pay button style, no trailing chevron. */
  variant?: "default" | "flow";
};

export type WhatsAppUpdatesSendSectionProps = {
  disabled: boolean;
  loading: boolean;
  profileCountryCode: string;
  profileMobile: string;
  onSend: (payload: WhatsAppConsentRequestPayload) => void;
  hintText?: string;
  showStopNote?: boolean;
  ctaLabel?: string;
};

export type WhatsAppUpdatesPendingCardProps = {
  consent: WhatsAppConsentState;
  sending: boolean;
  startingOver: boolean;
  onResend: (payload: WhatsAppConsentRequestPayload) => void;
  onChangeNumber: () => void;
  onStartOver: () => void;
  profileCountryCode: string;
  profileMobile: string;
  showPhoneChoice: boolean;
};
