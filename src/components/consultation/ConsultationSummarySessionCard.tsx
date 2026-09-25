"use client";

import Image from "next/image";
import { consultationInitialsFromDisplayName } from "@/lib/consultation-display";
import { CONSULTATION_SUMMARY_LAYOUT as L } from "@/lib/constants/consultation-summary";
import type { ConsultationSummarySessionCardProps } from "@/types/ui/consultation-summary";

export function ConsultationSummarySessionCard({
  name,
  picture,
  isCompleted,
  eventLink,
  statusCompletedLabel,
  statusUpcomingLabel,
  meetingLinkLabel,
  meetingLinkPendingLabel,
}: ConsultationSummarySessionCardProps) {
  const initials = consultationInitialsFromDisplayName(name);

  return (
    <section className={L.sessionCard}>
      <div className={L.sessionInner}>
        <div className={L.astroAvatar}>
          {picture?.trim() ? (
            <Image
              src={picture}
              alt=""
              width={48}
              height={48}
              unoptimized
              className={L.astroAvatarImg}
            />
          ) : (
            <span className={L.astroAvatarInitials}>{initials}</span>
          )}
        </div>
        <div className={L.astroMeta}>
          <p className={L.astroName}>{name}</p>
          <span
            className={`${L.statusPill} ${
              isCompleted ? L.statusCompleted : L.statusUpcoming
            }`}
          >
            {isCompleted ? statusCompletedLabel : statusUpcomingLabel}
          </span>
        </div>
        {eventLink ? (
          <a
            href={eventLink}
            target="_blank"
            rel="noopener noreferrer"
            className={L.meetingBtn}
          >
            {meetingLinkLabel}
          </a>
        ) : (
          <p className={L.meetingPending}>{meetingLinkPendingLabel}</p>
        )}
      </div>
    </section>
  );
}
