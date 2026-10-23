"use client";

import Image from "next/image";
import { format } from "date-fns";
import { ConsultationAnswersReadyCallout } from "@/components/consultation/ConsultationAnswersReadyCallout";
import { cn } from "@/lib/utils";
import {
  CONSULTATION_HOME_ASSETS,
  CONSULTATION_HOME_LAYOUT,
  CONSULTATION_HOME_MEETING_DATE_FORMAT,
} from "@/lib/constants/consultation-home";
import { parseApiDateTime, isValidDate } from "@/lib/api-datetime";
import type { ConsultationMeetingCardProps } from "@/types/ui/consultation-home";

function formatMeetingDate(iso: string): string {
  const d = parseApiDateTime(iso);
  if (!isValidDate(d)) return iso;
  return format(d, CONSULTATION_HOME_MEETING_DATE_FORMAT);
}

function astrologerName(event: ConsultationMeetingCardProps["event"]): string {
  return [event.astrologerFirstName, event.astrologerLastName]
    .filter(Boolean)
    .join(" ")
    .trim();
}

export function ConsultationMeetingCard({
  event,
  isUpcoming,
  meetingWithLabel,
  viewDetailsLabel,
  meetingLinkLabel,
  queriesAnsweredLabel,
  onViewDetails,
}: ConsultationMeetingCardProps) {
  void queriesAnsweredLabel;
  const name = astrologerName(event);
  const meetingLabel = meetingWithLabel.replace("{name}", name || "—");

  return (
    <article
      className={cn(
        CONSULTATION_HOME_LAYOUT.meetingCard,
        !isUpcoming && CONSULTATION_HOME_LAYOUT.meetingCardCompleted
      )}
    >
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className={CONSULTATION_HOME_LAYOUT.meetingRow}>
          <div className={CONSULTATION_HOME_LAYOUT.meetingAvatar}>
            {event.astrologerPicture ? (
              <Image
                src={event.astrologerPicture}
                alt=""
                width={44}
                height={44}
                unoptimized
                className="size-full object-cover"
              />
            ) : (
              <Image
                src={CONSULTATION_HOME_ASSETS.dummyAvatar}
                alt=""
                width={28}
                height={28}
                unoptimized
                className="m-auto object-contain opacity-70"
              />
            )}
          </div>
          <div className={CONSULTATION_HOME_LAYOUT.meetingMeta}>
            <p className={CONSULTATION_HOME_LAYOUT.meetingName}>{meetingLabel}</p>
            <p className={CONSULTATION_HOME_LAYOUT.meetingDate}>
              {formatMeetingDate(event.startDatetime)}
            </p>
          </div>
        </div>

        <div className={CONSULTATION_HOME_LAYOUT.meetingActions}>
          <button
            type="button"
            className={CONSULTATION_HOME_LAYOUT.actionBtn}
            onClick={() => onViewDetails(event)}
          >
            {viewDetailsLabel}
          </button>
          {event.eventLink ? (
            <a
              href={event.eventLink}
              target="_blank"
              rel="noopener noreferrer"
              className={CONSULTATION_HOME_LAYOUT.actionBtnPrimary}
            >
              {meetingLinkLabel}
            </a>
          ) : null}
        </div>
      </div>

      {!isUpcoming && event.queriesAnswered ? (
        <ConsultationAnswersReadyCallout />
      ) : null}
    </article>
  );
}
