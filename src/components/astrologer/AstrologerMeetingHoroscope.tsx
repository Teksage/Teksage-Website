"use client";

import { ASTRO_PORTAL_UI } from "@/lib/constants/astrologer-portal";
import { MEETING_HOROSCOPE_UI } from "@/lib/constants/meeting-horoscope-ui";
import {
  horoscopeTextFields,
  splitDasaBuktiPeriods,
} from "@/lib/astrologer-horoscope-display";
import { MeetingHoroscopeExpandableSection } from "@/components/astrologer/MeetingHoroscopeExpandableSection";
import type { AstrologerMeetingHoroscopeProps } from "@/types/astrologer-portal";

function isDasaBuktiKey(key: string): boolean {
  return key.includes("dasa_bukti") || key.includes("dasa bukti");
}

/** Customer birth summary for consultation — charts are on Full Horoscope below. */
export function AstrologerMeetingHoroscope({
  horoscope,
}: AstrologerMeetingHoroscopeProps) {
  const fields = horoscopeTextFields(horoscope);
  if (fields.length === 0) return null;

  const facts = fields.filter((f) => f.kind === "fact");
  const narratives = fields.filter((f) => f.kind === "narrative");
  const U = MEETING_HOROSCOPE_UI;
  const copy = ASTRO_PORTAL_UI.detail;

  return (
    <section className={U.root}>
      <header className={U.header}>
        <p className={U.headerEyebrow}>{copy.horoscopeEyebrow}</p>
        <h2 className={U.headerTitle}>{copy.horoscope}</h2>
      </header>

      {facts.length > 0 ? (
        <div className={U.factsGrid}>
          {facts.map(({ key, label, value }) => (
            <div key={key} className={U.factCard}>
              <p className={U.factLabel}>{label}</p>
              <p className={U.factValue}>{value}</p>
            </div>
          ))}
        </div>
      ) : null}

      {narratives.length > 0 ? (
        <div className={U.sections}>
          {narratives.map(({ key, label, value }) => (
            <MeetingHoroscopeExpandableSection
              key={key}
              fieldKey={key}
              label={label}
              value={value}
              periods={
                isDasaBuktiKey(key) ? splitDasaBuktiPeriods(value) : null
              }
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
