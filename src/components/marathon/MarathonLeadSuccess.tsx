"use client";

import Image from "next/image";
import { useI18nConstants } from "@/hooks/useT";
import { MARATHON_ASSETS } from "@/lib/constants/assets";
import {
  ASTROCONNECT_LEAD_COPY,
  ASTROCONNECT_LEAD_UI,
  ASTROCONNECT_LEAD_WHATSAPP,
  buildAstroConnectConsentWhatsAppUrl,
} from "@/lib/constants/astroconnect-leads";
import type { MarathonLeadSuccessProps } from "@/types/ui/astroconnect-lead-success";

function resolveChannelUrl(url: string | null | undefined): string {
  const value = (url || "").trim();
  if (!value) return ASTROCONNECT_LEAD_WHATSAPP.channelUrl;
  // Force www so desktop Chrome does not open a blank WhatsApp Web shell.
  return value.replace("https://whatsapp.com/", "https://www.whatsapp.com/");
}

export function MarathonLeadSuccess({ result }: MarathonLeadSuccessProps) {
  const copy = useI18nConstants(ASTROCONNECT_LEAD_COPY);
  const ui = ASTROCONNECT_LEAD_UI;
  const granted = Boolean(result.whatsapp_opt_in);
  const already = result.already_submitted;
  const whatsappUrl =
    result.whatsapp_click_url ||
    buildAstroConnectConsentWhatsAppUrl({
      name: result.name,
      categories: result.categories,
    });
  const channelUrl = resolveChannelUrl(result.channel_url);

  const title = granted
    ? copy.grantedTitle
    : already
      ? copy.alreadySubmitted
      : copy.tapSendTitle;
  const body = granted
    ? copy.grantedBody
    : already
      ? copy.alreadySubmittedBody
      : copy.tapSendBody;

  return (
    <div className={ui.successHead}>
      <div className={ui.successMark} aria-hidden>
        <Image
          src={MARATHON_ASSETS.verified}
          alt=""
          width={28}
          height={28}
          unoptimized
          className={ui.successMarkIcon}
        />
      </div>
      <p className={ui.successTitle}>{title}</p>
      <p className={ui.successBody}>{body}</p>

      <div className={ui.primaryRow}>
        <a
          className={ui.primaryLink}
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={MARATHON_ASSETS.whatsapp}
            alt=""
            width={20}
            height={20}
            unoptimized
            className={ui.linkIcon}
          />
          {copy.openWhatsApp}
        </a>
      </div>

      <p className={ui.followLabel}>{copy.followUs}</p>
      <div className={ui.followRow}>
        <a className={ui.link} href={channelUrl} target="_blank" rel="noreferrer">
          <Image
            src={MARATHON_ASSETS.whatsapp}
            alt=""
            width={20}
            height={20}
            unoptimized
            className={ui.linkIcon}
          />
          {copy.joinChannel}
        </a>
        <a className={ui.link} href={result.instagram_url} target="_blank" rel="noreferrer">
          <Image
            src={MARATHON_ASSETS.instagram}
            alt=""
            width={20}
            height={20}
            unoptimized
            className={ui.linkIcon}
          />
          {copy.joinInstagram}
        </a>
      </div>
    </div>
  );
}
