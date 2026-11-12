"use client";

import { useEffect, useState } from "react";
import {
  clearAstroConnectLeadResult,
  loadAstroConnectLeadResult,
  saveAstroConnectLeadResult,
} from "@/lib/astroconnect-lead-storage";
import { DEFAULT_COUNTRY_CODE_NUMERIC } from "@/lib/constants/default-region";
import { digitsOnly } from "@/lib/phone-utils";
import { lookupAstroConnectLead } from "@/lib/services/astroconnect-leads";
import { useAuthStore } from "@/store/auth.store";

/** True when this browser / logged-in phone already notified for the event. */
export function useAstroConnectLeadStatus(eventId: number | string) {
  const user = useAuthStore((s) => s.user);
  const [notified, setNotified] = useState(() => Boolean(loadAstroConnectLeadResult(eventId)));

  useEffect(() => {
    setNotified(Boolean(loadAstroConnectLeadResult(eventId)));

    const mobile = digitsOnly(user?.mobile);
    const dial = digitsOnly(user?.countryCode) || DEFAULT_COUNTRY_CODE_NUMERIC;
    if (!mobile) return;

    let cancelled = false;
    void lookupAstroConnectLead({
      country_code: dial,
      mobile_number: mobile,
      source_marathon_id: Number(eventId),
    })
      .then((row) => {
        if (cancelled) return;
        if (!row) {
          clearAstroConnectLeadResult(eventId);
          setNotified(false);
          return;
        }
        saveAstroConnectLeadResult(eventId, row);
        setNotified(true);
      })
      .catch(() => {
        /* keep storage / default */
      });

    return () => {
      cancelled = true;
    };
  }, [eventId, user?.countryCode, user?.mobile]);

  return notified;
}
