"use client";

import { format } from "date-fns";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { AstrologerMeetingHoroscopeCard } from "@/components/astrologer/AstrologerMeetingHoroscopeCard";
import { AstrologerMeetingQuestionsSection } from "@/components/astrologer/AstrologerMeetingQuestionsSection";
import { hasAstrologerMeetingHoroscope } from "@/lib/astrologer-horoscope-display";
import { ASTRO_PORTAL_UI, ASTRO_PORTAL_COLORS } from "@/lib/constants/astrologer-portal";
import { updateAstrologerEventStatus } from "@/lib/services/astrologer-portal";
import { ROUTES } from "@/lib/constants/routes";
import type { AstrologerMeetingDetailProps } from "@/types";

function LabelRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-1.5 flex gap-2">
      <p className="w-1/3 flex-shrink-0 text-sm font-medium text-gray-900/50">{label}</p>
      <p className="text-sm font-medium text-gray-900/50">: </p>
      <p className="flex-1 text-sm font-medium text-gray-900/50">{value}</p>
    </div>
  );
}

function DashedDivider() {
  return (
    <div className="my-4 border-t border-dashed border-black/30" />
  );
}

export function AstrologerMeetingDetail({
  event,
  initials,
  fullName,
  queryString,
  meetingLinkFallback,
  onRefresh,
}: AstrologerMeetingDetailProps) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(event.status === "completed");
  const [completing, setCompleting] = useState(false);
  const [completeError, setCompleteError] = useState<string | null>(null);

  async function handleMarkComplete() {
    if (completing) return;
    setCompleting(true);
    setCompleteError(null);
    try {
      await updateAstrologerEventStatus(event.id, "completed");
      setIsCompleted(true);
      if (onRefresh) await onRefresh();
    } catch {
      setCompleteError(ASTRO_PORTAL_UI.detail.markCompleteFail);
    } finally {
      setCompleting(false);
    }
  }

  let meetingDate = "";
  let startTime = "";
  let endTime = "";
  try {
    const dt = new Date(event.start_datetime);
    meetingDate = format(dt, "d MMMM, yyyy");
    startTime = format(dt, "h:mm a");
    const endDt = event.consultation_duration
      ? new Date(dt.getTime() + event.consultation_duration * 60_000)
      : new Date(dt.getTime() + 30 * 60_000);
    endTime = format(endDt, "h:mm a");
  } catch {
    meetingDate = event.start_datetime;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: ASTRO_PORTAL_COLORS.brandGreen }}>
      {/* Scrollable body */}
      <div className="mx-auto max-w-2xl space-y-5 px-5 pb-12 pt-4">
        {/* ─── Meeting overview card ─────────────────────────────────────── */}
        <div className="rounded-xl bg-white p-5">
          {/* Customer avatar + name */}
          <div className="flex items-center gap-4">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-[3.26px] bg-white text-lg font-semibold leading-none"
              style={{ borderColor: "#A2C734", color: "#A2C734" }}
            >
              {initials}
            </div>
            <div>
              <p className="text-lg font-semibold leading-none text-gray-800/80">
                {fullName}
              </p>
              <p className="mt-1 text-sm font-medium leading-none text-gray-800/80">
                {ASTRO_PORTAL_UI.detail.booked}{" "}
                {event.consultation_duration ?? 30} {ASTRO_PORTAL_UI.detail.min}
              </p>
            </div>
          </div>

          <DashedDivider />

          {/* Date / time / other rows */}
          <LabelRow label={ASTRO_PORTAL_UI.detail.date} value={meetingDate} />
          <LabelRow
            label={ASTRO_PORTAL_UI.detail.time}
            value={`${startTime} - ${endTime}`}
          />
          {event.category && event.category.length > 0 && (
            <LabelRow
              label={ASTRO_PORTAL_UI.detail.consultingOn}
              value={event.category
                .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
                .join(", ")}
            />
          )}
          {event.languages && event.languages.length > 0 && (
            <LabelRow
              label={ASTRO_PORTAL_UI.detail.language}
              value={event.languages
                .map((l) => l.charAt(0).toUpperCase() + l.slice(1))
                .join(", ")}
            />
          )}
          {event.consultation_fee != null && (
            <LabelRow
              label={ASTRO_PORTAL_UI.detail.feesPaid}
              value={`${event.currency ?? "₹"} ${event.consultation_fee.toFixed(2)}/-`}
            />
          )}

          {/* Meeting Link / action button */}
          <div className="mt-5 space-y-2">
            {isCompleted ? (
              <div
                className="flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-base font-semibold"
                style={{ color: ASTRO_PORTAL_COLORS.brandGreen }}
              >
                <span>{ASTRO_PORTAL_UI.detail.submitted}</span>
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            ) : (
              <>
                {(event.event_link ?? meetingLinkFallback) ? (
                  <a
                    href={event.event_link ?? meetingLinkFallback ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-full py-2.5 text-center text-base font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: ASTRO_PORTAL_COLORS.brandGreen }}
                  >
                    {ASTRO_PORTAL_UI.detail.joinMeeting}
                  </a>
                ) : (
                  <div
                    className="w-full rounded-full border py-2.5 text-center text-base font-semibold"
                    style={{ borderColor: "#87AE0E", color: "#87AE0E" }}
                  >
                    {ASTRO_PORTAL_UI.detail.noLink}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => void handleMarkComplete()}
                  disabled={completing}
                  className="w-full rounded-full border border-white/40 py-2 text-center text-sm font-semibold text-white transition-opacity hover:opacity-80 disabled:opacity-50"
                >
                  {completing
                    ? ASTRO_PORTAL_UI.detail.markCompleting
                    : ASTRO_PORTAL_UI.detail.markComplete}
                </button>
              </>
            )}
            {completeError ? (
              <p className="text-center text-xs font-medium text-red-200">
                {completeError}
              </p>
            ) : null}
          </div>
        </div>

        {event.share_horoscope ? (
          <AstrologerMeetingHoroscopeCard
            eventId={event.id}
            hasHoroscope={hasAstrologerMeetingHoroscope(event.userHoroscope)}
            queryString={queryString}
          />
        ) : null}

        {event.questions.length > 0 ? (
          <AstrologerMeetingQuestionsSection
            questions={event.questions}
            startDatetime={event.start_datetime}
            consultationDuration={event.consultation_duration}
            onQuestionsUpdated={onRefresh ?? (() => undefined)}
          />
        ) : null}

        {event.questions.length === 0 && (
          <p className="text-center text-sm font-medium text-white/70">
            {ASTRO_PORTAL_UI.detail.noQuestions}
          </p>
        )}

        {/* Back to meetings */}
        <button
          type="button"
          onClick={() => router.push(ROUTES.astrologerMeetings)}
          className="mt-4 w-full rounded-full border border-white/40 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-80"
        >
          {ASTRO_PORTAL_UI.detail.backToMeetings}
        </button>
      </div>
    </div>
  );
}
