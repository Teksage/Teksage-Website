"use client";

import { Input } from "@/components/ui/input";
import { useI18nConstants } from "@/hooks/useT";
import {
  LOGIN_MOBILE_COUNTRY_DIAL_OPTIONS,
  LOGIN_MOBILE_DIGITS_REGEX,
  MOBILE_INPUT_MAX_DIGITS,
} from "@/lib/constants";
import {
  WHATSAPP_UPDATES_SCREEN,
  WHATSAPP_UPDATES_UI,
} from "@/lib/constants/whatsapp-updates";
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
  const dialValue =
    LOGIN_MOBILE_COUNTRY_DIAL_OPTIONS.find(
      (o) => o.dial.replace("+", "") === countryCode.replace(/\D/g, "")
    )?.dial ?? `+${countryCode.replace(/\D/g, "") || "91"}`;

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
                <select
                  value={dialValue}
                  onChange={(e) => onCountryCodeChange(e.target.value.replace("+", ""))}
                  className="w-full border-none bg-transparent text-sm font-bold outline-none"
                  aria-label={WU.phoneChoiceDifferentLabel}
                >
                  {LOGIN_MOBILE_COUNTRY_DIAL_OPTIONS.map((o) => (
                    <option key={o.dial} value={o.dial}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                type="tel"
                value={mobile}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, MOBILE_INPUT_MAX_DIGITS);
                  onMobileChange(digits);
                }}
                maxLength={MOBILE_INPUT_MAX_DIGITS}
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
      {mode === "different" && mobile && !LOGIN_MOBILE_DIGITS_REGEX.test(mobile) ? (
        <p className="text-sm text-[var(--color-brand-error)]">{WU.phoneChoiceInvalidMobile}</p>
      ) : null}
    </div>
  );
}
