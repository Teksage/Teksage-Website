"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CountryDialPicker } from "@/components/common/CountryDialPicker";
import { MarathonFlowHeader } from "@/components/marathon/MarathonFlowHeader";
import { MarathonLeadSuccess } from "@/components/marathon/MarathonLeadSuccess";
import { useI18nConstants, useT } from "@/hooks/useT";
import {
  clearAstroConnectLeadResult,
  loadAstroConnectLeadResult,
  saveAstroConnectLeadResult,
} from "@/lib/astroconnect-lead-storage";
import {
  ASTROCONNECT_LEAD_CATEGORIES,
  ASTROCONNECT_LEAD_COPY,
  ASTROCONNECT_LEAD_UI,
  buildAstroConnectConsentWhatsAppUrl,
  defaultAstroConnectLeadCategories,
} from "@/lib/constants/astroconnect-leads";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { DEFAULT_COUNTRY_CODE_NUMERIC } from "@/lib/constants/default-region";
import { ROUTES } from "@/lib/constants/routes";
import { digitsOnly } from "@/lib/phone-utils";
import { marathonDisplayName } from "@/lib/marathon-display";
import {
  lookupAstroConnectLead,
  submitAstroConnectLead,
} from "@/lib/services/astroconnect-leads";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import type { AstroConnectLeadResponse } from "@/types/astroconnect-lead";
import type { MarathonLeadCaptureProps } from "@/types/ui/astroconnect-lead";

export function MarathonLeadCapture({ event, className }: MarathonLeadCaptureProps) {
  const copy = useI18nConstants(ASTROCONNECT_LEAD_COPY);
  const ui = ASTROCONNECT_LEAD_UI;
  const { t } = useT();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dial, setDial] = useState<string>(DEFAULT_COUNTRY_CODE_NUMERIC);
  const [selectedCategories, setSelectedCategories] = useState(() =>
    defaultAstroConnectLeadCategories(event.categories)
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AstroConnectLeadResponse | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function restore() {
      const cached = loadAstroConnectLeadResult(event.id);
      if (cached && !cancelled) setResult(cached);

      const profileMobile = digitsOnly(user?.mobile);
      const profileDial =
        digitsOnly(user?.countryCode) || DEFAULT_COUNTRY_CODE_NUMERIC;
      if (user?.name?.trim()) setName(user.name.trim());
      if (profileMobile) {
        setPhone(profileMobile);
        setDial(profileDial);
      }

      if (profileMobile) {
        try {
          const row = await lookupAstroConnectLead({
            country_code: profileDial,
            mobile_number: profileMobile,
            source_marathon_id: Number(event.id),
          });
          if (cancelled) return;
          if (row) {
            setResult(row);
            saveAstroConnectLeadResult(event.id, row);
          } else {
            clearAstroConnectLeadResult(event.id);
            setResult(null);
          }
        } catch {
          /* guest / network — keep cached or form */
        }
      }

      if (!cancelled) setHydrated(true);
    }

    void restore();
    return () => {
      cancelled = true;
    };
  }, [event.id, user?.countryCode, user?.mobile, user?.name]);

  function toggleCategory(item: string) {
    setSelectedCategories((prev) =>
      prev.includes(item) ? prev.filter((name) => name !== item) : [...prev, item]
    );
  }

  async function checkExistingPhone() {
    const digits = digitsOnly(phone);
    if (digits.length < 7 || result) return;
    try {
      const row = await lookupAstroConnectLead({
        country_code: dial || DEFAULT_COUNTRY_CODE_NUMERIC,
        mobile_number: digits,
        source_marathon_id: Number(event.id),
      });
      if (row) {
        setResult(row);
        saveAstroConnectLeadResult(event.id, row);
      }
    } catch {
      /* keep editing */
    }
  }

  async function onSubmit() {
    setError("");
    if (!name.trim()) {
      setError(copy.errorName);
      return;
    }
    const digits = phone.replace(/\D/g, "");
    const dialDigits = (dial || "").replace(/\D/g, "");
    const expectedLen = dialDigits === "91" ? 10 : null;
    if (digits.length < 7 || (expectedLen != null && digits.length !== expectedLen)) {
      setError(copy.errorPhone);
      return;
    }
    if (selectedCategories.length === 0) {
      setError(copy.errorCategory);
      return;
    }
    setBusy(true);
    try {
      const row = await submitAstroConnectLead({
        name: name.trim(),
        country_code: dial || DEFAULT_COUNTRY_CODE_NUMERIC,
        mobile_number: digits,
        categories: selectedCategories,
        source_marathon_id: Number(event.id),
        platform: "web",
      });
      setResult(row);
      saveAstroConnectLeadResult(event.id, row);
      const url =
        row.whatsapp_click_url ||
        buildAstroConnectConsentWhatsAppUrl({
          name: name.trim(),
          categories: selectedCategories,
        });
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      setError(copy.errorGeneric);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={cn(ui.page, className)}>
      <div className={CHAT_LAYOUT.messageListGlow} aria-hidden />
      <div className={ui.pageInner}>
        <MarathonFlowHeader
          title={marathonDisplayName(event.name)}
          step={1}
          labels={[]}
          onBack={() => router.push(ROUTES.expertHours)}
        />
        <div className={ui.stage}>
          <div className={ui.card}>
            {!hydrated ? null : result ? (
              <MarathonLeadSuccess result={result} />
            ) : (
              <>
                <p className={ui.title}>{copy.title}</p>
                <p className={ui.sub}>{copy.subtitle}</p>
                <div className={cn(ui.field, ui.fieldGap)}>
                  <label className={ui.label}>{copy.nameLabel}</label>
                  <input
                    className={ui.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={copy.namePlaceholder}
                    autoComplete="name"
                  />
                </div>
                <div className={cn(ui.field, ui.fieldGap)}>
                  <label className={ui.label}>{copy.phoneLabel}</label>
                  <div className={ui.phoneRow}>
                    <div className={ui.dial}>
                      <CountryDialPicker
                        valueDial={`+${dial}`}
                        ariaLabel={copy.countryCodeAria}
                        onSelect={(country) =>
                          setDial(
                            country.dial_code.replace(/\D/g, "") ||
                              DEFAULT_COUNTRY_CODE_NUMERIC
                          )
                        }
                      />
                    </div>
                    <input
                      className={ui.phoneInput}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={() => void checkExistingPhone()}
                      placeholder={copy.phonePlaceholder}
                      inputMode="tel"
                      autoComplete="tel-national"
                    />
                  </div>
                </div>
                <div className={cn(ui.field, ui.fieldGap)}>
                  <label className={ui.label}>{copy.categoryLabel}</label>
                  <div className={ui.chips}>
                    {ASTROCONNECT_LEAD_CATEGORIES.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={
                          selectedCategories.includes(item) ? ui.chipOn : ui.chipOff
                        }
                        onClick={() => toggleCategory(item)}
                      >
                        {t(item)}
                      </button>
                    ))}
                  </div>
                </div>
                {error ? <p className={ui.error}>{error}</p> : null}
                <button
                  type="button"
                  className={ui.submit}
                  disabled={busy}
                  onClick={onSubmit}
                >
                  {busy ? copy.submitting : copy.submit}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
