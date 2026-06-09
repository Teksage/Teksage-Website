import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type {
  WhatsAppConsentRequestPayload,
  WhatsAppConsentRequestResult,
  WhatsAppConsentRevokeResult,
  WhatsAppConsentState,
} from "@/types/whatsapp-updates";

type ConsentStatusDto = {
  granted: boolean;
  phone_masked?: string | null;
  consent_sent_at?: string | null;
  granted_at?: string | null;
  revoked_at?: string | null;
  can_resend?: boolean;
  resend_available_at?: string | null;
};

type ConsentRequestDto = {
  granted: boolean;
  message_id?: string | null;
  consent_sent_at?: string | null;
};

type ConsentRequestBodyDto = {
  use_profile_phone: boolean;
  country_code?: string;
  mobile_number?: string;
};

function mapStatus(dto: ConsentStatusDto): WhatsAppConsentState {
  return {
    granted: Boolean(dto.granted),
    phoneMasked: dto.phone_masked ?? null,
    consentSentAt: dto.consent_sent_at ?? null,
    grantedAt: dto.granted_at ?? null,
    revokedAt: dto.revoked_at ?? null,
    canResend: dto.can_resend !== false,
    resendAvailableAt: dto.resend_available_at ?? null,
  };
}

function mapRequestBody(payload?: WhatsAppConsentRequestPayload): ConsentRequestBodyDto {
  if (!payload || payload.useProfilePhone) {
    return { use_profile_phone: true };
  }
  return {
    use_profile_phone: false,
    country_code: payload.countryCode?.replace(/\D/g, ""),
    mobile_number: payload.mobileNumber?.replace(/\D/g, ""),
  };
}

export async function fetchWhatsAppConsentStatus(): Promise<WhatsAppConsentState> {
  const { data } = await http.get<ConsentStatusDto>(API_ENDPOINTS.whatsappConsentStatus);
  return mapStatus(data);
}

export async function requestWhatsAppConsent(
  payload?: WhatsAppConsentRequestPayload
): Promise<WhatsAppConsentRequestResult> {
  const { data } = await http.post<ConsentRequestDto>(
    API_ENDPOINTS.whatsappConsentRequest,
    mapRequestBody(payload)
  );
  return {
    granted: Boolean(data.granted),
    messageId: data.message_id ?? null,
    consentSentAt: data.consent_sent_at ?? null,
  };
}

type ConsentRevokeDto = {
  granted: boolean;
  revoked_at?: string | null;
};

export async function revokeWhatsAppConsent(): Promise<WhatsAppConsentRevokeResult> {
  const { data } = await http.post<ConsentRevokeDto>(API_ENDPOINTS.whatsappConsentRevoke);
  return {
    granted: Boolean(data.granted),
    revokedAt: data.revoked_at ?? null,
  };
}
