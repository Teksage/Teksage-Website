export type WhatsAppConsentState = {
  granted: boolean;
  phoneMasked: string | null;
  consentSentAt: string | null;
  grantedAt: string | null;
  revokedAt: string | null;
  canResend: boolean;
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

export type { WhatsAppUpdatesPageContentProps } from "@/types/ui/whatsapp-updates";
