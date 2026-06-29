"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { ConsultationFindAstrologersCard } from "@/components/consultation/ConsultationFindAstrologersCard";
import { ConsultationMeetingCard } from "@/components/consultation/ConsultationMeetingCard";
import { ConsultationMeetingsTabs } from "@/components/consultation/ConsultationMeetingsTabs";
import { useConsultationHome } from "@/hooks/useConsultationHome";
import { useI18nConstants } from "@/hooks/useT";
import {
  CONSULTATION_HOME_LAYOUT,
  CONSULTATION_HOME_SCREEN,
} from "@/lib/constants/consultation-home";
import { CONSULTATION_SCREEN, ROUTES } from "@/lib/constants";
import { writeConsultationSummary } from "@/lib/consultation-session";
import type { ConsultationUserEvent } from "@/types/consultation";

function toSummary(event: ConsultationUserEvent) {
  const astrologerName = [event.astrologerFirstName, event.astrologerLastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  return {
    eventId: event.id,
    eventLink: event.eventLink,
    startDatetime: event.startDatetime,
    endDatetime: event.endDatetime,
    categories: event.categories,
    languages: event.languages,
    consultationFee: event.consultationFee,
    currency: event.currency,
    astrologerName,
    astrologerPicture: event.astrologerPicture,
  };
}

export function ConsultationHomeView() {
  const CH = useI18nConstants(CONSULTATION_HOME_SCREEN);
  const C = useI18nConstants(CONSULTATION_SCREEN);
  const router = useRouter();
  const { loading, error, upcomingMeetings, completedMeetings, completedCount } =
    useConsultationHome();
  const [isUpcoming, setIsUpcoming] = useState(true);

  const meetings = isUpcoming ? upcomingMeetings : completedMeetings;

  function handleViewDetails(event: ConsultationUserEvent) {
    writeConsultationSummary(toSummary(event));
    router.push(ROUTES.consultationSummary);
  }

  return (
    <div className={CONSULTATION_HOME_LAYOUT.page}>
      <div className={CONSULTATION_HOME_LAYOUT.header}>
        <AppHeader
          title={CH.appBarTitle}
          showBack
          onBackClick={() => router.push(ROUTES.home)}
          className={CONSULTATION_HOME_LAYOUT.appHeader}
        />
        <ConsultationFindAstrologersCard />
      </div>

      <ConsultationMeetingsTabs
        isUpcoming={isUpcoming}
        completedCount={completedCount}
        onChange={setIsUpcoming}
      />

      <div className={CONSULTATION_HOME_LAYOUT.body}>
        {error ? (
          <p className={CONSULTATION_HOME_LAYOUT.empty}>{C.loadError}</p>
        ) : meetings.length === 0 && !loading ? (
          <p className={CONSULTATION_HOME_LAYOUT.empty}>
            {isUpcoming ? CH.emptyUpcoming : CH.emptyCompleted}
          </p>
        ) : (
          <ul>
            {meetings.map((event) => (
              <li key={event.id}>
                <ConsultationMeetingCard
                  event={event}
                  isUpcoming={isUpcoming}
                  meetingWithLabel={CH.meetingWith}
                  viewDetailsLabel={CH.viewDetails}
                  meetingLinkLabel={CH.meetingLink}
                  queriesAnsweredLabel={CH.queriesAnsweredBanner}
                  onViewDetails={handleViewDetails}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <LoadingOverlay open={loading} />
    </div>
  );
}
