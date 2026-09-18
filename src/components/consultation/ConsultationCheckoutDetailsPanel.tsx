"use client";

import Image from "next/image";
import { useI18nConstants, useT } from "@/hooks/useT";
import { cn } from "@/lib/utils";
import {
  CONSULTATION_CHECKOUT_FOCUS_CATEGORIES,
  CONSULTATION_CHECKOUT_LAYOUT,
  CONSULTATION_CHECKOUT_SCREEN,
} from "@/lib/constants/consultation-checkout";
import { ROUTES } from "@/lib/constants";
import { consultationInitialsFromDisplayName } from "@/lib/consultation-display";
import {
  formatConsultationBookingDate,
  formatConsultationBookingTimeRange,
  formatProfileDateOfBirth,
  formatProfileTimeOfBirth,
} from "@/lib/consultation-booking-format";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import type { ConsultationCheckoutDetailsPanelProps } from "@/types/ui/consultation";

function formatNameCopy(template: string, name: string): string {
  return template.replace("{name}", name);
}

export function ConsultationCheckoutDetailsPanel({
  booking,
  profile,
  astrologerPicture,
  langLabel,
  focusTopics,
  question,
  birthLabels,
  onToggleFocus,
  onQuestionChange,
  onChangeAstrologer,
  onReschedule,
}: ConsultationCheckoutDetailsPanelProps) {
  const CC = useI18nConstants(CONSULTATION_CHECKOUT_SCREEN);
  const { locale, t } = useT();
  const dateLocale = bcp47FromAppLocale(locale);
  const L = CONSULTATION_CHECKOUT_LAYOUT;
  const astroSubtitle = [
    CC.videoCallLabel,
    langLabel,
    CC.sessionMinutesLabel,
  ]
    .filter(Boolean)
    .join(" · ");

  const birthCells = [
    {
      label: birthLabels.dob,
      value: formatProfileDateOfBirth(profile?.dateOfBirth, dateLocale),
    },
    {
      label: birthLabels.tob,
      value: formatProfileTimeOfBirth(profile?.timeOfBirth, dateLocale),
    },
    { label: birthLabels.pob, value: profile?.placeOfBirth?.trim() || "—" },
    { label: birthLabels.rasi, value: profile?.rashi?.trim() || "—" },
    {
      label: birthLabels.nakshatram,
      value: profile?.nakshatra?.trim() || "—",
    },
    { label: CC.callLanguageLabel, value: langLabel || "—" },
  ];

  return (
    <div className={L.leftCol}>
      <div className={L.sessionCard}>
        <div className={L.sessionHeader}>
          <div className={L.astroRow}>
            <div className={L.astroAvatar}>
              {astrologerPicture ? (
                <Image
                  src={astrologerPicture}
                  alt={booking.astrologerName}
                  width={48}
                  height={48}
                  unoptimized
                  className={L.astroAvatarImg}
                />
              ) : (
                <span className={L.astroAvatarInitials}>
                  {consultationInitialsFromDisplayName(booking.astrologerName)}
                </span>
              )}
            </div>
            <div className={L.astroMeta}>
              <p className={L.astroName}>{booking.astrologerName}</p>
              <p className={L.astroSub}>{astroSubtitle}</p>
            </div>
            <button type="button" onClick={onChangeAstrologer} className={L.textLink}>
              {CC.changeAstrologer}
            </button>
          </div>
        </div>

        <div className={L.sessionBody}>
          <div className={L.whenRow}>
            <div className={L.whenBlock}>
              <p className={L.whenLabel}>{CC.whenLabel}</p>
              <p className={L.whenValue}>
                {formatConsultationBookingDate(
                  booking.slotStart,
                  dateLocale
                )}{" "}
                ·{" "}
                {formatConsultationBookingTimeRange(
                  booking.slotStart,
                  booking.slotEnd,
                  dateLocale
                )}
              </p>
            </div>
            <button type="button" onClick={onReschedule} className={L.outlineBtn}>
              {CC.reschedule}
            </button>
          </div>
        </div>
      </div>

      <div className={cn(L.card, L.cardBody)}>
        <div className={L.birthHeader}>
          <h2 className={L.birthTitle}>{CC.birthDetailsTitle}</h2>
          <a href={ROUTES.profile} className={L.textLink}>
            {CC.editProfile}
          </a>
        </div>
        <div className={L.birthGrid}>
          {birthCells.map(({ label, value }) => (
            <div key={label} className={L.birthCell}>
              <p className={L.birthCellLabel}>{label}</p>
              <p className={L.birthCellValue}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={cn(L.card, L.cardBody)}>
        <h2 className={L.focusTitle}>
          {formatNameCopy(CC.focusTitle, booking.astrologerName.split(/\s+/)[0] ?? "them")}
        </h2>
        <p className={L.focusHint}>{CC.focusHint}</p>
        <div className={L.focusChips}>
          {CONSULTATION_CHECKOUT_FOCUS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onToggleFocus(cat)}
              className={cn(
                L.focusChip,
                focusTopics.includes(cat) ? L.focusChipActive : L.focusChipDefault
              )}
            >
              {t(cat)}
            </button>
          ))}
        </div>
        <textarea
          rows={3}
          value={question}
          onChange={(e) => onQuestionChange(e.target.value)}
          placeholder={CC.questionPlaceholder}
          className={L.focusTextarea}
        />
      </div>
    </div>
  );
}
