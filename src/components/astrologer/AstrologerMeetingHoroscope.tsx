"use client";

import { HoroscopeChartFrame } from "@/components/horoscope/HoroscopeChartFrame";
import { ASTRO_PORTAL_UI } from "@/lib/constants/astrologer-portal";
import {
  horoscopeChartHtml,
  horoscopeChartLabel,
  horoscopeTextFields,
} from "@/lib/astrologer-horoscope-display";
import type { AstroHoroscope } from "@/types/astrologer-portal";

interface AstrologerMeetingHoroscopeProps {
  horoscope: AstroHoroscope;
}

/** Customer horoscope on meeting detail — mirrors Flutter `HoroscopeDetailsPage` + `ChartWidget`. */
export function AstrologerMeetingHoroscope({
  horoscope,
}: AstrologerMeetingHoroscopeProps) {
  const textRows = horoscopeTextFields(horoscope);
  const rasiHtml = horoscopeChartHtml(horoscope, "rasi_chart");
  const navamsaHtml = horoscopeChartHtml(horoscope, "navamsa_chart");

  if (textRows.length === 0 && !rasiHtml && !navamsaHtml) return null;

  return (
    <div className="rounded-xl border border-black/[0.04] bg-white p-5">
      <p className="mb-3 text-sm font-semibold text-gray-700">
        {ASTRO_PORTAL_UI.detail.horoscope}
      </p>

      {textRows.length > 0 ? (
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {textRows.map(({ key, label, value }) => (
            <div key={key} className="border-b border-black/[0.06] pb-2">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--color-brand-primary)]">
                {label}
              </p>
              <p className="mt-0.5 text-sm font-medium text-gray-900">{value}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        {rasiHtml ? (
          <HoroscopeChartFrame
            title={horoscopeChartLabel(horoscope, "rasi_chart") ?? "Rasi chart"}
            html={rasiHtml}
          />
        ) : null}
        {navamsaHtml ? (
          <HoroscopeChartFrame
            title={
              horoscopeChartLabel(horoscope, "navamsa_chart") ?? "Navamsa chart"
            }
            html={navamsaHtml}
          />
        ) : null}
      </div>
    </div>
  );
}
