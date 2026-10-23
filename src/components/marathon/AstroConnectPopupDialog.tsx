"use client";

import { useEffect, type ReactNode } from "react";
import { useI18nConstants, useT } from "@/hooks/useT";
import { useViewerTimezone } from "@/hooks/useViewerTimezone";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { MARATHON_ASSETS } from "@/lib/constants/assets";
import { ASTROCONNECT_POPUP_COPY, ASTROCONNECT_POPUP_UI, popupCategoryLine } from "@/lib/constants/astroconnect-popup";
import { marathonDateParts, marathonPopupDate, marathonTimeRange } from "@/lib/marathon-display";
import type { AstroConnectPopupDialogProps } from "@/types/astroconnect-popup";

function Highlighted({
  template,
  token,
  value,
  className,
  accentClass,
}: {
  template: string;
  token: string;
  value: string;
  className: string;
  accentClass?: string;
}) {
  const ui = ASTROCONNECT_POPUP_UI;
  const parts = template.split(token);
  if (parts.length < 2) return <p className={className}>{template}</p>;
  return (
    <p className={className}>
      {parts[0]}
      <span className={accentClass ?? ui.accent}>{value}</span>
      {parts[1]}
    </p>
  );
}

function Icon({ d, warm }: { d: string; warm?: boolean }) {
  const ui = ASTROCONNECT_POPUP_UI;
  return (
    <span className={warm ? ui.perkIconWarm : ui.perkIcon} aria-hidden>
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d={d} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Perk({ d, text, warm }: { d: string; text: string; warm?: boolean }) {
  const ui = ASTROCONNECT_POPUP_UI;
  return (
    <li className={ui.perk}>
      <Icon d={d} warm={warm} />
      <span>{text}</span>
    </li>
  );
}

function StoryFooter({ template, category }: { template: string; category: string }) {
  const ui = ASTROCONNECT_POPUP_UI;
  const label = category.toLocaleLowerCase();
  const text = template.split("{category}").join(label);
  const phrases = ["expert astrologers", `specialising in ${label} guidance`];
  return <p className={ui.body}>{emphasize(text, phrases, ui.bodyStrong)}</p>;
}

function emphasize(text: string, phrases: string[], className: string): ReactNode {
  const hit = phrases
    .map((phrase) => ({ phrase, index: text.toLowerCase().indexOf(phrase.toLowerCase()) }))
    .filter((item) => item.index >= 0)
    .sort((left, right) => left.index - right.index)[0];
  if (!hit) return text;
  const end = hit.index + hit.phrase.length;
  return (
    <>
      {text.slice(0, hit.index)}
      <span className={className}>{text.slice(hit.index, end)}</span>
      {emphasize(text.slice(end), phrases, className)}
    </>
  );
}

function WhenCard({ label, value, d }: { label: string; value: string; d: string }) {
  const ui = ASTROCONNECT_POPUP_UI;
  return (
    <div className={ui.whenCard}>
      <span className={ui.whenIcon} aria-hidden>
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d={d} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className="min-w-0">
        <p className={ui.whenLabel}>{label}</p>
        <p className={ui.whenValue}>{value}</p>
      </div>
    </div>
  );
}

export function AstroConnectPopupDialog({ event, onClose, onBook }: AstroConnectPopupDialogProps) {
  const copy = useI18nConstants(ASTROCONNECT_POPUP_COPY);
  const ui = ASTROCONNECT_POPUP_UI;
  const { locale, t } = useT();
  const localeTag = bcp47FromAppLocale(locale);
  const viewerZone = useViewerTimezone();
  const category = popupCategoryLine(event.categories, t);
  const when = marathonDateParts(event.startsAt, viewerZone, localeTag);
  const end = marathonDateParts(event.endsAt, viewerZone, localeTag);

  useEffect(() => {
    function onKey(keyEvent: KeyboardEvent) {
      if (keyEvent.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={ui.overlay} role="presentation">
      <button type="button" className={ui.backdrop} aria-label={copy.close} onClick={onClose} />
      <div className={ui.panel} role="dialog" aria-modal="true" aria-labelledby="astroconnect-popup-title">
        <button type="button" className={ui.close} aria-label={copy.close} onClick={onClose}>
          <svg viewBox="0 0 24 24" className={ui.closeIcon} fill="none" aria-hidden>
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
        <div className={ui.art}>
          <div className={ui.imageWrap}>
            <img src={MARATHON_ASSETS.popupBanner} alt="" className={ui.image} />
          </div>
          <div className={ui.scrimTop} aria-hidden />
          <div className={ui.scrimBottom} aria-hidden />
          <div className={ui.artCopy}>
            <div className={ui.artTop}>
              <span className={ui.badge}>{copy.badge}</span>
              <div id="astroconnect-popup-title" className={ui.headlines}>
                <Highlighted template={copy.stuck} token="{category}" value={category} className={ui.headline} />
                <Highlighted template={copy.next} token="{word}" value={copy.nextWord} className={ui.headline} />
              </div>
            </div>
            <StoryFooter template={copy.bring} category={category} />
          </div>
        </div>
        <div className={ui.details}>
          <p className={ui.kicker}>{copy.whatYouGet}</p>
          <ul className={ui.perks}>
            <Perk d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M12 7v5l3 2" text={copy.oneOnOne} />
            <Perk d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M3 12h18M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9s1.2-6.4 3.6-9" text={copy.online} />
            <Perk d="M8 3v3M16 3v3M5 9h14M7 5h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2" text={copy.limited} warm />
          </ul>
          <div className={ui.when}>
            <WhenCard
              label={copy.date}
              value={marathonPopupDate(event.startsAt, viewerZone, localeTag)}
              d="M8 3v3M16 3v3M5 9h14M7 5h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2"
            />
            <WhenCard
              label={copy.time}
              value={marathonTimeRange(when.time, end.time)}
              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M12 7v5l3 2"
            />
          </div>
          <button type="button" className={ui.cta} onClick={onBook}>
            {copy.book}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
