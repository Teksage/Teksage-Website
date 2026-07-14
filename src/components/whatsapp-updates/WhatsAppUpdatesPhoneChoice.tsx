"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { CountryDialPicker } from "@/components/common/CountryDialPicker";
import { useI18nConstants } from "@/hooks/useT";
import {
  DEFAULT_COUNTRY_CODE_NUMERIC,
} from "@/lib/constants";
import {
  WHATSAPP_UPDATES_SCREEN,
  WHATSAPP_UPDATES_UI,
} from "@/lib/constants/whatsapp-updates";
import { fetchCountries, findCountryByDial } from "@/lib/services/countries";
import {
  isValidNationalMobile,
  nationalMobileMaxLength,
} from "@/lib/mobile-validation";
import { cn } from "@/lib/utils";
import type { WhatsAppUpdatesPhoneChoiceProps } from "@/types/whatsapp-updates";

export function WhatsAppUpdatesPhoneChoice({
  mode,
  profileMasked,
  countryCode,
  mobile,
  onModeChange,
  onCountryCodeChange,
  onMobileChange,
  validationError,
  variant = "default",
}: WhatsAppUpdatesPhoneChoiceProps) {
  const WU = useI18nConstants(WHATSAPP_UPDATES_SCREEN);
  const [mobileLength, setMobileLength] = useState(10);
  const cc =
    countryCode.replace(/\D/g, "") || DEFAULT_COUNTRY_CODE_NUMERIC;
  const dialValue = `+${cc}`;
  const maxDigits = nationalMobileMaxLength(mobileLength);

  useEffect(() => {
    void fetchCountries().then(() => {
      const matched = findCountryByDial(cc);
      if (matched?.mobile_number_length) {
        setMobileLength(matched.mobile_number_length);
      }
    });
  }, [cc]);

  function renderRadio(checked: boolean) {
    return (
      <span
        aria-hidden
        className={cn(
          WHATSAPP_UPDATES_UI.phoneChoiceRadioIndicator,
          checked && WHATSAPP_UPDATES_UI.phoneChoiceRadioIndicatorSelected
        )}
      />
    );
  }

  return (
    <div className={cn("space-y-3 text-left", variant === "default" && "mt-4")}>
      <label
        className={cn(
          variant === "flow"
            ? WHATSAPP_UPDATES_UI.phoneChoiceRowFlow
            : WHATSAPP_UPDATES_UI.phoneChoiceRow,
          variant === "flow" && mode === "profile" && WHATSAPP_UPDATES_UI.phoneChoiceRowFlowSelected,
          "cursor-pointer"
        )}
      >
        <input
          type="radio"
          name="whatsapp-phone-mode"
          checked={mode === "profile"}
          onChange={() => onModeChange("profile")}
          className={WHATSAPP_UPDATES_UI.phoneChoiceRadioInput}
        />
        {renderRadio(mode === "profile")}
        <span>
          <span className={WHATSAPP_UPDATES_UI.phoneChoiceLabel}>
            {WU.phoneChoiceProfileLabel}
          </span>
          <p className={WHATSAPP_UPDATES_UI.phoneChoiceHint}>{profileMasked}</p>
        </span>
      </label>

      <label
        className={cn(
          variant === "flow"
            ? WHATSAPP_UPDATES_UI.phoneChoiceRowFlow
            : WHATSAPP_UPDATES_UI.phoneChoiceRow,
          variant === "flow" && mode === "different" && WHATSAPP_UPDATES_UI.phoneChoiceRowFlowSelected,
          "cursor-pointer"
        )}
      >
        <input
          type="radio"
          name="whatsapp-phone-mode"
          checked={mode === "different"}
          onChange={() => onModeChange("different")}
          className={WHATSAPP_UPDATES_UI.phoneChoiceRadioInput}
        />
        {renderRadio(mode === "different")}
        <span className="w-full">
          <span className={WHATSAPP_UPDATES_UI.phoneChoiceLabel}>
            {WU.phoneChoiceDifferentLabel}
          </span>
          {mode === "different" ? (
            <div className={WHATSAPP_UPDATES_UI.phoneInputWrap}>
              <div className={WHATSAPP_UPDATES_UI.phoneDialSelect}>
                <CountryDialPicker
                  valueDial={dialValue}
                  ariaLabel={WU.phoneChoiceDifferentLabel}
                  onSelect={(country) => {
                    onCountryCodeChange(
                      country.dial_code.replace(/\D/g, "") ||
                        DEFAULT_COUNTRY_CODE_NUMERIC
                    );
                    setMobileLength(country.mobile_number_length);
                    onMobileChange("");
                  }}
                />
              </div>
              <Input
                type="tel"
                value={mobile}
                onChange={(e) => {
                  const digits = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, maxDigits);
                  onMobileChange(digits);
                }}
                maxLength={maxDigits}
                inputMode="numeric"
                className={cn(
                  WHATSAPP_UPDATES_UI.phoneMobileInput,
                  validationError &&
                    "border-[var(--color-brand-error)] focus-visible:border-[var(--color-brand-error)]"
                )}
              />
            </div>
          ) : null}
        </span>
      </label>

      {validationError ? (
        <p className="text-sm text-[var(--color-brand-error)]">{validationError}</p>
      ) : null}
      {mode === "different" &&
      mobile &&
      !isValidNationalMobile(mobile, mobileLength) ? (
        <p className="text-sm text-[var(--color-brand-error)]">
          {WU.phoneChoiceInvalidMobile}
        </p>
      ) : null}
    </div>
  );
}
