"use client";

import Image from "next/image";
import { format } from "date-fns";
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
  return [event.astrologerFirstName, event.astrologerLastName].filter(Boolean).join(" ").trim();
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
  const name = astrologerName(event);
  const meetingLabel = meetingWithLabel.replace("{name}", name || "—");

  return (
    <article
      className={cn(
        CONSULTATION_HOME_LAYOUT.meetingCard,
        !isUpcoming && CONSULTATION_HOME_LAYOUT.meetingCardCompleted
      )}
    >
      <div className={CONSULTATION_HOME_LAYOUT.meetingRow}>
        <div className={CONSULTATION_HOME_LAYOUT.meetingAvatar}>
          {event.astrologerPicture ? (
            <Image
              src={event.astrologerPicture}
              alt=""
              width={41}
              height={41}
              unoptimized
              className="size-full object-cover"
            />
          ) : (
            <Image
              src={CONSULTATION_HOME_ASSETS.dummyAvatar}
              alt=""
              width={25}
              height={25}
              unoptimized
              className="m-auto object-contain"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className={CONSULTATION_HOME_LAYOUT.meetingName}>{meetingLabel}</p>
          <p className={CONSULTATION_HOME_LAYOUT.meetingDate}>
            {formatMeetingDate(event.startDatetime)}
          </p>
        </div>
      </div>

      {!isUpcoming && event.queriesAnswered ? (
        <p className={CONSULTATION_HOME_LAYOUT.answersBanner}>{queriesAnsweredLabel}</p>
      ) : null}

      {isUpcoming ? (
        <div className={CONSULTATION_HOME_LAYOUT.actionRow}>
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
              className={CONSULTATION_HOME_LAYOUT.actionBtn}
            >
              {meetingLinkLabel}
            </a>
          ) : null}
        </div>
      ) : (
        <div className={CONSULTATION_HOME_LAYOUT.actionRow}>
          <button
            type="button"
            className={CONSULTATION_HOME_LAYOUT.actionBtn}
            onClick={() => onViewDetails(event)}
          >
            {viewDetailsLabel}
          </button>
        </div>
      )}
    </article>
  );
}
