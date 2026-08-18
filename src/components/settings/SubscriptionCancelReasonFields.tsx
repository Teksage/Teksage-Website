"use client";

import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import type { SubscriptionCancelReasonFieldsProps } from "@/types";

export function SubscriptionCancelReasonFields({
  label,
  reasons,
  otherLabel,
  selected,
  otherText,
  otherPlaceholder,
  error,
  onSelect,
  onOtherTextChange,
}: SubscriptionCancelReasonFieldsProps) {
  const showOther = selected === otherLabel;

  return (
    <div className={SETTINGS_UI.cancelReasonList} role="radiogroup" aria-label={label}>
      <p className="text-sm font-semibold text-[var(--color-brand-black)]">
        {label}
      </p>
      {reasons.map((reason) => (
        <label key={reason} className={SETTINGS_UI.cancelReasonItem}>
          <input
            type="radio"
            name="cancel-reason"
            checked={selected === reason}
            onChange={() => onSelect(reason)}
            className={SETTINGS_UI.cancelReasonCheckbox}
          />
          <span>{reason}</span>
        </label>
      ))}
      <label className={SETTINGS_UI.cancelReasonItem}>
        <input
          type="radio"
          name="cancel-reason"
          checked={showOther}
          onChange={() => onSelect(otherLabel)}
          className={SETTINGS_UI.cancelReasonCheckbox}
        />
        <span>{otherLabel}</span>
      </label>
      {showOther ? (
        <textarea
          value={otherText}
          onChange={(event) => onOtherTextChange(event.target.value)}
          rows={3}
          maxLength={500}
          placeholder={otherPlaceholder}
          className={SETTINGS_UI.cancelReasonOtherInput}
        />
      ) : null}
      {error ? <p className={SETTINGS_UI.cancelReasonError}>{error}</p> : null}
    </div>
  );
}
