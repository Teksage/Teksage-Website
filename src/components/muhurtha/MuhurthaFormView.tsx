"use client";

import { useI18nConstants, useT } from "@/hooks/useT";
import { MuhurthaFeatureHero } from "@/components/muhurtha/MuhurthaFeatureHero";
import { ProfileLocationField } from "@/components/settings/ProfileLocationField";
import { MUHURTHA_EVENT_TYPES } from "@/types/muhurtha";
import { MUHURTHA_LAYOUT, MUHURTHA_SCREEN, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { toIsoDate } from "@/lib/panchang-calendar";
import type { MuhurthaFormViewProps } from "@/types";

export function MuhurthaFormView({
  event,
  startDate,
  location,
  locationFull,
  locationError,
  onEventChange,
  onStartDateChange,
  onLocationChange,
  onSubmit,
}: MuhurthaFormViewProps) {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const L = MUHURTHA_LAYOUT;
  const { t } = useT();
  const minDate = toIsoDate(new Date());

  return (
    <>
      <MuhurthaFeatureHero
        title={M.headerTitle}
        subtitle={M.formSubtitle}
        showBack
        backHref={ROUTES.home}
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

          <label className="block">
            <span className={L.fieldLabel}>{M.startDateLabel}</span>
            <input
              type="date"
              className={L.dateInput}
              value={startDate}
              min={minDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              aria-label={M.startDateLabel}
            />
            <p className="mt-1 text-xs text-[var(--color-brand-black)]/55">{M.startDateHint}</p>
          </label>

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
