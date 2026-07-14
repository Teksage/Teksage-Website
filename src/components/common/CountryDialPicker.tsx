"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useCountries } from "@/hooks/useCountries";
import {
  COUNTRY_DIAL_PICKER,
  COUNTRY_DIAL_PICKER_UI,
} from "@/lib/constants/country-dial-picker";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { DEFAULT_COUNTRY_CALLING_CODE } from "@/lib/constants/default-region";
import { digitsOnly } from "@/lib/phone-utils";
import { cn } from "@/lib/utils";
import type { CountryDialInfo, CountryDialPickerProps } from "@/types/country";

export function CountryDialPicker({
  valueDial,
  onSelect,
  disabled,
  className,
  ariaLabel,
}: CountryDialPickerProps) {
  const { countries, isLoading, error } = useCountries();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const dialDisplay = valueDial.startsWith("+")
    ? valueDial
    : `+${digitsOnly(valueDial) || digitsOnly(DEFAULT_COUNTRY_CALLING_CODE)}`;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial_code.toLowerCase().includes(q) ||
        digitsOnly(c.dial_code).includes(digitsOnly(q))
    );
  }, [countries, query]);

  function handleSelect(country: CountryDialInfo) {
    onSelect(country);
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        aria-label={ariaLabel ?? COUNTRY_DIAL_PICKER.triggerAria}
        onClick={() => !disabled && setOpen(true)}
        className={cn(COUNTRY_DIAL_PICKER_UI.trigger, className)}
      >
        <span>{dialDisplay}</span>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
          className={COUNTRY_DIAL_PICKER_UI.triggerChevron}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open ? (
        <div
          className={COUNTRY_DIAL_PICKER_UI.overlay}
          role="dialog"
          aria-modal
          aria-labelledby="country-dial-picker-title"
          onClick={() => setOpen(false)}
        >
          <div
            className={COUNTRY_DIAL_PICKER_UI.card}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={COUNTRY_DIAL_PICKER_UI.header}>
              <h2
                id="country-dial-picker-title"
                className={COUNTRY_DIAL_PICKER_UI.title}
              >
                {COUNTRY_DIAL_PICKER.title}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={COUNTRY_DIAL_PICKER_UI.closeBtn}
                aria-label={COUNTRY_DIAL_PICKER.closeAria}
              >
                <Image
                  src={SETTINGS_PAGE_ASSETS.dialogClose}
                  alt=""
                  width={20}
                  height={20}
                  unoptimized
                  className="size-5"
                />
              </button>
            </div>
            <div className={COUNTRY_DIAL_PICKER_UI.searchWrap}>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={COUNTRY_DIAL_PICKER.searchPlaceholder}
                className={COUNTRY_DIAL_PICKER_UI.searchInput}
                autoFocus
              />
            </div>
            <div className={COUNTRY_DIAL_PICKER_UI.list}>
              {isLoading ? (
                <p className={COUNTRY_DIAL_PICKER_UI.empty}>
                  {COUNTRY_DIAL_PICKER.loading}
                </p>
              ) : error ? (
                <p className={COUNTRY_DIAL_PICKER_UI.empty}>
                  {COUNTRY_DIAL_PICKER.loadError}
                </p>
              ) : filtered.length === 0 ? (
                <p className={COUNTRY_DIAL_PICKER_UI.empty}>
                  {COUNTRY_DIAL_PICKER.emptyResults}
                </p>
              ) : (
                filtered.map((country) => (
                  <button
                    key={`${country.country_code}-${country.dial_code}`}
                    type="button"
                    className={COUNTRY_DIAL_PICKER_UI.row}
                    onClick={() => handleSelect(country)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={country.flag}
                      alt=""
                      className={COUNTRY_DIAL_PICKER_UI.flag}
                      width={24}
                      height={24}
                    />
                    <span className={COUNTRY_DIAL_PICKER_UI.rowLabel}>
                      {country.name}
                    </span>
                    <span className={COUNTRY_DIAL_PICKER_UI.dial}>
                      {country.dial_code}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
