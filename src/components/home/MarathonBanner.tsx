"use client";

import Link from "next/link";
import { MarathonRegisterTimer } from "@/components/marathon/MarathonRegisterTimer";
import { useI18nConstants, useT } from "@/hooks/useT";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { useSoonestMarathon } from "@/hooks/useSoonestMarathon";
import { MARATHON_COPY } from "@/lib/constants/marathon";
import { MARATHON_HOME } from "@/lib/constants/marathon-home";
import { ROUTES } from "@/lib/constants/routes";
import { marathonDateParts } from "@/lib/marathon-display";

export function MarathonBanner() {
  const copy = useI18nConstants(MARATHON_COPY);
  const { locale } = useT();
  const event = useSoonestMarathon();
  const when = event ? marathonDateParts(event.starts_at, event.timezone, bcp47FromAppLocale(locale)) : null;

  return (
    <Link href={ROUTES.marathon} className={MARATHON_HOME.card}>
      <span className={MARATHON_HOME.stripe} aria-hidden />
      <div className={MARATHON_HOME.body}>
        <div className={MARATHON_HOME.head}>
          <p className={MARATHON_HOME.title}>{copy.title}</p>
          {event?.booking_closes_at ? (
            <MarathonRegisterTimer closesAt={event.booking_closes_at} compact className={MARATHON_HOME.timer} />
          ) : null}
        </div>
        <p className={MARATHON_HOME.sub}>{copy.subtitle}</p>
        {event && when ? (
          <p className={MARATHON_HOME.event}>{`${event.name} · ${when.month} ${when.day}, ${when.time}`}</p>
        ) : null}
        <span className={MARATHON_HOME.cta}>{copy.bannerCta}</span>
      </div>
    </Link>
  );
}
