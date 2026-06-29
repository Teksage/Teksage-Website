"use client";

import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { ConsultationAstrologersPanel } from "@/components/consultation/ConsultationAstrologersPanel";
import { ConsultationHubTabs } from "@/components/consultation/ConsultationHubTabs";
import { ConsultationMeetingsPanel } from "@/components/consultation/ConsultationMeetingsPanel";
import { useConsultationHubTab } from "@/hooks/useConsultationHubTab";
import { useI18nConstants } from "@/hooks/useT";
import {
  CONSULTATION_HOME_LAYOUT,
  CONSULTATION_HOME_SCREEN,
} from "@/lib/constants/consultation-home";
import { CONSULTATION_HUB_TAB_MEETING } from "@/lib/constants/consultation-routes";
import { ROUTES } from "@/lib/constants";

export function ConsultationHomeView() {
  const CH = useI18nConstants(CONSULTATION_HOME_SCREEN);
  const router = useRouter();
  const { tab, setTab } = useConsultationHubTab();

  return (
    <div className={CONSULTATION_HOME_LAYOUT.page}>
      <div className={CONSULTATION_HOME_LAYOUT.header}>
        <AppHeader
          title={CH.appBarTitle}
          showBack
          onBackClick={() => router.push(ROUTES.home)}
          className={CONSULTATION_HOME_LAYOUT.appHeader}
        />
      </div>

      <ConsultationHubTabs activeTab={tab} onChange={setTab} />

      <div className="flex-1">
        {tab === CONSULTATION_HUB_TAB_MEETING ? (
          <ConsultationMeetingsPanel />
        ) : (
          <ConsultationAstrologersPanel />
        )}
      </div>
    </div>
  );
}
