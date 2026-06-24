"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CONSULTATION_HOME_ASSETS,
  CONSULTATION_HOME_LAYOUT,
  CONSULTATION_HOME_SCREEN,
} from "@/lib/constants/consultation-home";
import { ConsultationFindAvatarStack } from "@/components/consultation/ConsultationFindAvatarStack";
import { ROUTES } from "@/lib/constants";
import { useI18nConstants } from "@/hooks/useT";

export function ConsultationFindAstrologersCard() {
  const CH = useI18nConstants(CONSULTATION_HOME_SCREEN);

  return (
    <Link href={ROUTES.consultationAstrologers} className={CONSULTATION_HOME_LAYOUT.findOuter}>
      <div className={CONSULTATION_HOME_LAYOUT.findTitleRow}>
        <p className={CONSULTATION_HOME_LAYOUT.findTitle}>{CH.findConsultTitle}</p>
        <Image
          src={CONSULTATION_HOME_ASSETS.appBarBack}
          alt=""
          width={20}
          height={20}
          unoptimized
          className={CONSULTATION_HOME_LAYOUT.findArrow}
        />
      </div>
      <div className={CONSULTATION_HOME_LAYOUT.findInner}>
        <ConsultationFindAvatarStack />
        <div className="min-w-0 flex-1">
          <p className={CONSULTATION_HOME_LAYOUT.findCount}>{CH.findConsultCount}</p>
          <p className={CONSULTATION_HOME_LAYOUT.findHint}>{CH.findConsultHint}</p>
        </div>
      </div>
    </Link>
  );
}
