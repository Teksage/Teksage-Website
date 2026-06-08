export type WhatsAppConsentPhoneMode = "profile" | "different";

export type WhatsAppConsentRequestPayload = {
  useProfilePhone: boolean;
  countryCode?: string;
  mobileNumber?: string;
};

export type WhatsAppConsentState = {
  granted: boolean;
  phoneMasked: string | null;
  consentSentAt: string | null;
  grantedAt: string | null;
  revokedAt: string | null;
  canResend: boolean;
  resendAvailableAt: string | null;
};

export type WhatsAppConsentRequestResult = {
  granted: boolean;
  messageId: string | null;
  consentSentAt: string | null;
};

export type WhatsAppConsentRevokeResult = {
  granted: boolean;
  revokedAt: string | null;
};

export type {
  WhatsAppUpdatesCtaProps,
  WhatsAppUpdatesPageContentProps,
  WhatsAppUpdatesPendingCardProps,
  WhatsAppUpdatesPhoneChoiceProps,
  WhatsAppUpdatesSendSectionProps,
} from "@/types/ui/whatsapp-updates";
