"use client";

import { useCallback, useEffect, useState } from "react";
import {
  fetchWhatsAppConsentStatus,
  requestWhatsAppConsent,
  revokeWhatsAppConsent,
} from "@/lib/services/whatsapp-consent";
import { WHATSAPP_CONSENT_POLL_MS } from "@/lib/constants/whatsapp-updates";
import type { WhatsAppConsentState } from "@/types/whatsapp-updates";

const EMPTY: WhatsAppConsentState = {
  granted: false,
  phoneMasked: null,
  consentSentAt: null,
  grantedAt: null,
  revokedAt: null,
  canResend: true,
};

export function useWhatsAppConsent() {
  const [consent, setConsent] = useState<WhatsAppConsentState>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [revoking, setRevoking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (options?: { silent?: boolean }) => {
    const silent = options?.silent ?? false;
    if (!silent) {
      setError(null);
      setLoading(true);
    }
    try {
      const next = await fetchWhatsAppConsentStatus();
      setConsent(next);
    } catch (e) {
      if (!silent) {
        setError(e instanceof Error ? e.message : "load_failed");
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    const waiting =
      consent.consentSentAt && !consent.granted && !consent.revokedAt;
    if (!waiting) return;
    const id = window.setInterval(() => {
      void refresh({ silent: true });
    }, WHATSAPP_CONSENT_POLL_MS);
    return () => window.clearInterval(id);
  }, [consent.consentSentAt, consent.granted, consent.revokedAt, refresh]);

  const requestConsent = useCallback(async () => {
    setError(null);
    setSending(true);
    try {
      const res = await requestWhatsAppConsent();
      await refresh();
      return res;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "request_failed";
      setError(msg);
      throw e;
    } finally {
      setSending(false);
    }
  }, [refresh]);

  const revokeConsent = useCallback(async () => {
    setError(null);
    setRevoking(true);
    try {
      const res = await revokeWhatsAppConsent();
      await refresh();
      return res;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "revoke_failed";
      setError(msg);
      throw e;
    } finally {
      setRevoking(false);
    }
  }, [refresh]);

  return {
    consent,
    loading,
    sending,
    revoking,
    error,
    refresh,
    requestConsent,
    revokeConsent,
  };
}
