"use client";

import Image from "next/image";
import { ConsultationAstrologersPanel } from "@/components/consultation/ConsultationAstrologersPanel";
import { ConsultationHubTabs } from "@/components/consultation/ConsultationHubTabs";
import { ConsultationMeetingsPanel } from "@/components/consultation/ConsultationMeetingsPanel";
import { useConsultationHome } from "@/hooks/useConsultationHome";
import { useConsultationHubTab } from "@/hooks/useConsultationHubTab";
import { useI18nConstants } from "@/hooks/useT";
import {
  CONSULTATION_HOME_ASSETS,
  CONSULTATION_HOME_LAYOUT,
  CONSULTATION_HOME_SCREEN,
} from "@/lib/constants/consultation-home";
import { CONSULTATION_HUB_TAB_MEETING } from "@/lib/constants/consultation-routes";

export function ConsultationHomeView() {
  const CH = useI18nConstants(CONSULTATION_HOME_SCREEN);
  const { tab, setTab } = useConsultationHubTab();
  const { upcomingMeetings } = useConsultationHome();
  const meetingCount = upcomingMeetings.length;

  return (
    <div className={CONSULTATION_HOME_LAYOUT.page}>
      <header className={CONSULTATION_HOME_LAYOUT.pageHeader}>
        <div className={CONSULTATION_HOME_LAYOUT.pageHeaderInner}>
          <div className={CONSULTATION_HOME_LAYOUT.headerIconWrap}>
            <div className={CONSULTATION_HOME_LAYOUT.headerIcon}>
              <Image
                src={CONSULTATION_HOME_ASSETS.headerIcon}
                alt=""
                width={24}
                height={24}
                unoptimized
                className={CONSULTATION_HOME_LAYOUT.headerIconImage}
              />
            </div>
            <span className={CONSULTATION_HOME_LAYOUT.headerOnlineDot} aria-hidden />
          </div>
          <div className={CONSULTATION_HOME_LAYOUT.headerText}>
            <h1 className={CONSULTATION_HOME_LAYOUT.pageTitle}>{CH.pageTitle}</h1>
            <p className={CONSULTATION_HOME_LAYOUT.pageSubtitle}>
              {CH.pageSubtitle}
            </p>
          </div>
        </div>
      </header>

      <div className={CONSULTATION_HOME_LAYOUT.desktopPanel}>
        <div className={CONSULTATION_HOME_LAYOUT.contentBody}>
          <ConsultationHubTabs
            activeTab={tab}
            onChange={setTab}
            meetingCount={meetingCount}
          />

          <div className="flex-1">
            {tab === CONSULTATION_HUB_TAB_MEETING ? (
              <ConsultationMeetingsPanel />
            ) : (
              <ConsultationAstrologersPanel />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
