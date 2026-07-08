"use client";

import { useI18nConstants, useT } from "@/hooks/useT";
import { Button } from "@/components/ui/button";
import { ProfileLocationField } from "@/components/settings/ProfileLocationField";
import { MUHURTHA_EVENT_TYPES } from "@/types/muhurtha";
import { MUHURTHA_LAYOUT, MUHURTHA_SCREEN } from "@/lib/constants";
import { toIsoDate } from "@/lib/panchang-calendar";
import type { MuhurthaFormViewProps } from "@/types";

export function MuhurthaFormView({
  event,
  startDate,
  location,
  locationFull,
  locationError,
  busy,
  error,
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
    <div className={L.formRoot}>
      <div className="space-y-1 text-center">
        <h2 className="text-lg font-bold text-[var(--color-brand-black)]">{M.formTitle}</h2>
        <p className="text-sm text-[var(--color-brand-black)]/70">{M.formSubtitle}</p>
      </div>

      <form
        className={L.formCard}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <label className="block">
          <span className={L.fieldLabel}>{M.eventLabel}</span>
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
        />

        {error ? (
          <p className="text-sm font-medium text-[var(--color-brand-error)]">{error}</p>
        ) : null}

        <Button type="submit" className={L.submitCta} disabled={busy}>
          {M.findCta}
        </Button>
      </form>
    </div>
  );
}
