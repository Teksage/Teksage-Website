"use client";

import Image from "next/image";
import { useI18nConstants } from "@/hooks/useT";
import { SETTINGS_ASSETS } from "@/lib/constants/assets";
import {
  SETTINGS_SUPPORT_COPY,
  buildSupportWhatsAppUrl,
} from "@/lib/constants/settings-support";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import { markSupportWhatsAppIntent } from "@/lib/services/settings-support";

export function SettingsSupportWhatsAppCta() {
  const SU = useI18nConstants(SETTINGS_SUPPORT_COPY);

  function onClick() {
    void markSupportWhatsAppIntent().catch(() => {
      /* WhatsApp still opens; marker in prefill is the fallback. */
    });
  }

  return (
    <>
      <div className={SETTINGS_UI.supportOrRow}>
        <span className={SETTINGS_UI.supportOrLine} />
        <span className={SETTINGS_UI.supportOrLabel}>{SU.orDivider}</span>
        <span className={SETTINGS_UI.supportOrLine} />
      </div>
      <a
        href={buildSupportWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className={SETTINGS_UI.supportWhatsAppBtn}
        onClick={onClick}
      >
        <Image
          src={SETTINGS_ASSETS.whatsapp}
          alt=""
          width={20}
          height={20}
          unoptimized
          className={SETTINGS_UI.supportWhatsAppIcon}
        />
        {SU.whatsappCta}
      </a>
      <p className={SETTINGS_UI.supportWhatsAppHint}>{SU.whatsappHint}</p>
    </>
  );
}
