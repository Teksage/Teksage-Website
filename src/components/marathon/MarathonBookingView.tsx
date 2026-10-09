"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useI18nConstants, useT } from "@/hooks/useT";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { MARATHON_ASSETS } from "@/lib/constants/assets";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { MARATHON_COPY, MARATHON_PAGE, MARATHON_PLAY_STORE, MARATHON_PORTAL_UI } from "@/lib/constants/marathon";
import { MARATHON_SUCCESS } from "@/lib/constants/marathon-success";
import { ROUTES } from "@/lib/constants/routes";
import { buildSupportWhatsAppUrl } from "@/lib/constants/settings-support";
import { markSupportWhatsAppIntent } from "@/lib/services/settings-support";
import { marathonDateParts, marathonPaidLabel } from "@/lib/marathon-display";
import { fetchMyMarathonBookings } from "@/lib/services/marathon";
import type { MarathonBooking } from "@/types/marathon";

export function MarathonBookingView({ bookingId }: { bookingId: number }) {
  const copy = useI18nConstants(MARATHON_COPY);
  const { locale, t } = useT();
  const localeTag = bcp47FromAppLocale(locale);
  const router = useRouter();
  const page = MARATHON_PAGE;
  const ui = MARATHON_SUCCESS;
  const [booking, setBooking] = useState<MarathonBooking | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchMyMarathonBookings()
      .then((rows) => setBooking(rows.find((row) => row.id === bookingId) ?? null))
      .catch(() => setBooking(null))
      .finally(() => setLoaded(true));
  }, [bookingId]);

  const when = booking ? marathonDateParts(booking.starts_at, booking.timezone, localeTag) : null;
  const until = booking ? marathonDateParts(booking.ends_at, booking.timezone, localeTag) : null;
  const link = booking?.meeting_link?.trim() ?? "";

  return (
    <div className={page.page}>
      <div className={CHAT_LAYOUT.messageListGlow} aria-hidden />
      <div className={page.pageInner}>
        <button type="button" className={MARATHON_PORTAL_UI.back} onClick={() => router.push(ROUTES.marathon)}>
          <svg viewBox="0 0 24 24" className={MARATHON_PORTAL_UI.backIcon} fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{t("Go back")}</span>
        </button>
        <div className={page.column}>
          {loaded && booking && when && until ? (
            <div className={ui.stack}>
              <section className={ui.hero}>
                <div className={ui.glow} aria-hidden />
                <div className={ui.badge}>
                  <svg viewBox="0 0 24 24" className="size-8" fill="none" aria-hidden>
                    <path d="M6 12.5l4 4L18 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h1 className={ui.title}>{copy.paymentDone}</h1>
                <p className={ui.event}>{booking.event_name}</p>
                {booking.categories[0] ? (
                  <div className={ui.chips}>
                    <span className={page.showChip}>{t(booking.categories[0])}</span>
                  </div>
                ) : null}
                {link ? (
                  <a className={ui.meet} href={link}>{t("Join Meeting")}</a>
                ) : (
                  <p className={ui.note}>{copy.summary}</p>
                )}
              </section>
              <section className={ui.card}>
                <h2 className={ui.cardHead}>{copy.meetingDetails}</h2>
                <div className={ui.row}>
                  <span className={ui.label}>{t("Date")}</span>
                  <span className={ui.value}>{`${when.month} ${when.day}`}</span>
                </div>
                <div className={ui.row}>
                  <span className={ui.label}>{t("Time")}</span>
                  <span className={ui.value}>{`${when.time} – ${until.time}`}</span>
                </div>
                <div className={ui.row}>
                  <span className={ui.label}>{t("Duration")}</span>
                  <span className={ui.value}>{copy.minutes}</span>
                </div>
                <div className={ui.row}>
                  <span className={ui.label}>{t("Consultation Fee")}</span>
                  <span className={ui.value}>{marathonPaidLabel(booking.fee, booking.currency)}</span>
                </div>
                {booking.astrologer_name ? (
                  <div className={ui.row}>
                    <span className={ui.label}>{t("Astrologer")}</span>
                    <span className={ui.value}>{booking.astrologer_name}</span>
                  </div>
                ) : null}
              </section>
              <div className={ui.storeBar}>
                  <a className={ui.storePrimary} href={ROUTES.home}>
                    <svg viewBox="0 0 15 13" className={ui.storeIcon} fill="none" aria-hidden>
                      <path d="M0.75 6.5H14.17M8.42 12.25L14.17 6.5L8.42 0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {copy.webApp}
                  </a>
                  <a className={ui.storeGhost} href={MARATHON_PLAY_STORE} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 21 23" className={ui.storeIcon} fill="currentColor" aria-hidden>
                      <path d="M19.42 9.66 3.18.29A1.23 1.23 0 0 0 1.06.29C.38.7 0 1.37 0 2.12v18.76c0 .76.4 1.45 1.06 1.83.66.39 1.46.39 2.12 0l16.24-9.38c.66-.38 1.06-1.07 1.06-1.83s-.4-1.46-1.06-1.84zM1.36 21.04V2.12l9.21 9.31-9.21 9.61zM3.33 1.93l10.52 6.08-2.35 2.45L3.33 1.93zM3.04 21.24l8.46-8.83 2.43 2.54-10.89 6.29zM18.75 12.17 15.14 14.25 12.44 11.43l2.62-2.73 3.69 2.13c.35.2.38.53.38.67s-.03.47-.38.67z" />
                    </svg>
                    {copy.android}
                  </a>
                  <a
                    className={ui.storeGhost}
                    href={buildSupportWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { void markSupportWhatsAppIntent().catch(() => undefined); }}
                  >
                    <Image src={MARATHON_ASSETS.whatsapp} alt="" width={20} height={20} unoptimized className={ui.storeIcon} />
                    {copy.whatsapp}
                  </a>
              </div>
            </div>
          ) : (
            <p className={page.heroSub}>{loaded ? copy.empty : ""}</p>
          )}
        </div>
      </div>
    </div>
  );
}
