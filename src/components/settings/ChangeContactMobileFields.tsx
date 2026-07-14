"use client";

import { Input } from "@/components/ui/input";
import { CountryDialPicker } from "@/components/common/CountryDialPicker";
import {
  DEFAULT_COUNTRY_CALLING_CODE,
  DEFAULT_COUNTRY_CODE_NUMERIC,
  SETTINGS_CHANGE_CONTACT,
} from "@/lib/constants";
import type { ChangeContactMobileFieldsProps } from "@/types/ui/settings";

export function ChangeContactMobileFields({
  dialValue,
  mobile,
  maxDigits,
  onCountrySelect,
  onMobileChange,
}: ChangeContactMobileFieldsProps) {
  return (
    <div className="flex gap-2">
      <div className="flex h-12 w-[5.5rem] shrink-0 items-center justify-center rounded-xl border border-black/15 bg-neutral-100">
        <CountryDialPicker
          valueDial={dialValue || DEFAULT_COUNTRY_CALLING_CODE}
          ariaLabel={SETTINGS_CHANGE_CONTACT.countryCodeLabel}
          onSelect={(country) => {
            onCountrySelect(
              country.dial_code.replace(/\D/g, "") ||
                DEFAULT_COUNTRY_CODE_NUMERIC,
              country.mobile_number_length
            );
          }}
        />
      </div>
      <Input
        type="tel"
        value={mobile}
        placeholder={SETTINGS_CHANGE_CONTACT.newPhoneLabel}
        onChange={(e) =>
          onMobileChange(e.target.value.replace(/\D/g, "").slice(0, maxDigits))
        }
        maxLength={maxDigits}
        className="h-12 rounded-xl border-black/15 bg-neutral-100"
      />
    </div>
  );
}
