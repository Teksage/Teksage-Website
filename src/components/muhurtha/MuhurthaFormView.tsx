"use client";

import { useRef } from "react";
import { useI18nConstants, useT } from "@/hooks/useT";
import { MuhurthaFeatureHero } from "@/components/muhurtha/MuhurthaFeatureHero";
import { ProfileLocationField } from "@/components/settings/ProfileLocationField";
import { MUHURTHA_EVENT_TYPES } from "@/types/muhurtha";
import { MUHURTHA_LAYOUT, MUHURTHA_SCREEN } from "@/lib/constants";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { formatMuhurthaStartDate } from "@/lib/muhurtha-format";
import {
  muhurthaMaxStartIso,
  muhurthaMinStartIso,
} from "@/lib/muhurtha-date-range";
import { cn } from "@/lib/utils";
import type { MuhurthaFormViewProps } from "@/types";

export function MuhurthaFormView({
  event,
  startDate,
  location,
  locationFull,
  locationError,
  dateError,
  onEventChange,
  onStartDateChange,
  onLocationChange,
  onSubmit,
}: MuhurthaFormViewProps) {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const L = MUHURTHA_LAYOUT;
  const { locale, t } = useT();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const minDate = muhurthaMinStartIso();
  const maxDate = muhurthaMaxStartIso();
  const startDateLabel = formatMuhurthaStartDate(
    startDate,
    bcp47FromAppLocale(locale)
  );

  function openStartDatePicker() {
    const input = dateInputRef.current;
    if (!input) return;
    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
        return;
      } catch {
        input.focus();
      }
    }
    input.focus();
    input.click();
  }

  return (
    <>
      <MuhurthaFeatureHero
        title={M.headerTitle}
        subtitle={M.formSubtitle}
      />
      <div className={cn(L.featurePageMain, L.featurePageMainForm)}>
        <div className={L.formRoot}>
          <form
            className={L.formCard}
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <label className="block">
              <span className={L.fieldLabel}>{M.eventLabel}</span>
              <div className={L.selectWrap}>
                <select
                  className={L.select}
                  value={event}
                  onChange={(e) => onEventChange(e.target.value)}
                >
                  {MUHURTHA_EVENT_TYPES.map((opt) => (
                    <option key={opt} value={opt}>
                      {t(opt)}
                    </option>
                  ))}
                </select>
                <svg aria-hidden viewBox="0 0 20 20" className={L.selectChevron}>
                  <path
                    d="M5.5 7.5 10 12l4.5-4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </label>

            <div>
              <span className={L.fieldLabel}>{M.startDateLabel}</span>
              <div className={L.dateField}>
                <button
                  type="button"
                  className={L.dateTrigger}
                  onClick={openStartDatePicker}
                >
                  <span>{startDateLabel}</span>
                  <svg aria-hidden viewBox="0 0 24 24" className={L.dateIcon}>
                    <rect
                      x="3.5"
                      y="5"
                      width="17"
                      height="15"
                      rx="2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M3.5 10h17M8 3.5V7M16 3.5V7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <input
                  ref={dateInputRef}
                  type="date"
                  className={L.dateInputNative}
                  value={startDate}
                  min={minDate}
                  max={maxDate}
                  onChange={(e) => onStartDateChange(e.target.value)}
                  aria-label={M.startDateLabel}
                  aria-invalid={Boolean(dateError)}
                />
              </div>
              <p className="mt-1 text-xs text-[var(--color-brand-black)]/55">
                {M.startDateHint}
              </p>
              {dateError ? (
                <p className="mt-1 text-xs text-[var(--color-brand-error)]">
                  {dateError}
                </p>
              ) : null}
            </div>

            <ProfileLocationField
              label={M.locationLabel}
              required
              value={location}
              fullLocation={locationFull}
              isEditable
              placeholder={M.locationPlaceholder}
              hasError={Boolean(locationError)}
              errorMessage={locationError ?? undefined}
              onChange={onLocationChange}
              inputClassName={L.locationInput}
            />

            <div className={L.submitWrap}>
              <button type="submit" className={L.submitCta}>
                {M.findCta}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
