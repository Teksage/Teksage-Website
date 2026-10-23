"use client";

import Link from "next/link";
import { MarathonRegisterTimer } from "@/components/marathon/MarathonRegisterTimer";
import { useI18nConstants, useT } from "@/hooks/useT";
import { useViewerTimezone } from "@/hooks/useViewerTimezone";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { useSoonestMarathon } from "@/hooks/useSoonestMarathon";
import { MARATHON_COPY } from "@/lib/constants/marathon";
import { MARATHON_HOME } from "@/lib/constants/marathon-home";
import { ROUTES } from "@/lib/constants/routes";
import { marathonDateParts, marathonDisplayName } from "@/lib/marathon-display";

export function MarathonBanner() {
  const copy = useI18nConstants(MARATHON_COPY);
  const { locale } = useT();
  const localeTag = bcp47FromAppLocale(locale);
  const viewerZone = useViewerTimezone();
  const event = useSoonestMarathon();
  if (!event) return null;
  const when = event
    ? marathonDateParts(event.starts_at, viewerZone, localeTag)
    : null;
  const eventLine =
    event && when
      ? `${marathonDisplayName(event.name)} · ${when.month} ${when.day}, ${when.time}`
      : null;

  return (
    <Link href={ROUTES.expertHours} className={MARATHON_HOME.card}>
      <span className={MARATHON_HOME.stripe} aria-hidden />
      <div className={MARATHON_HOME.body}>
        <div className={MARATHON_HOME.head}>
          <p className={MARATHON_HOME.title}>{copy.title}</p>
          {event?.booking_closes_at ? (
            <MarathonRegisterTimer
              closesAt={event.booking_closes_at}
              compact
              className={MARATHON_HOME.timer}
            />
          ) : null}
        </div>
        {eventLine ? <p className={MARATHON_HOME.event}>{eventLine}</p> : null}
        <span className={MARATHON_HOME.cta}>{copy.bannerCta}</span>
      </div>
    </Link>
  );
}
