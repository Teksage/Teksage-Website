"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { WHATSAPP_UPDATES_ASSETS } from "@/lib/constants/assets";
import { useI18nConstants } from "@/hooks/useT";
import {
  WHATSAPP_UPDATES_SCREEN,
  WHATSAPP_UPDATES_UI,
} from "@/lib/constants/whatsapp-updates";
import { cn } from "@/lib/utils";

type WhatsAppUpdatesCtaProps = {
  disabled: boolean;
  loading: boolean;
  onEnable: () => void;
  className?: string;
  showStopNote?: boolean;
  hintText?: string;
};

export function WhatsAppUpdatesCta({
  disabled,
  loading,
  onEnable,
  className,
  showStopNote = true,
  hintText,
}: WhatsAppUpdatesCtaProps) {
  const WU = useI18nConstants(WHATSAPP_UPDATES_SCREEN);

  return (
    <div className={cn("mt-6", className)}>
      <Button
        type="button"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-brand-primary)] text-base font-semibold text-white hover:bg-[var(--color-brand-primary)]/90"
        disabled={disabled || loading}
        onClick={onEnable}
      >
        <Image
          src={WHATSAPP_UPDATES_ASSETS.ctaWhatsapp}
          alt=""
          width={22}
          height={22}
          unoptimized
          className="size-[22px] brightness-0 invert"
        />
        <span className="flex-1 text-center">
          {loading ? WU.ctaSending : WU.ctaLabel}
        </span>
        <Image
          src={WHATSAPP_UPDATES_ASSETS.ctaChevron}
          alt=""
          width={18}
          height={18}
          unoptimized
          className="size-[18px] shrink-0 brightness-0 invert"
        />
      </Button>
      {hintText ? (
        <p className={WHATSAPP_UPDATES_UI.footer}>{hintText}</p>
      ) : null}
      {showStopNote ? (
        <p className={WHATSAPP_UPDATES_UI.footer}>
          <Image
            src={WHATSAPP_UPDATES_ASSETS.unsubscribeShield}
            alt=""
            width={14}
            height={14}
            className="mr-1 inline-block"
            unoptimized
          />
          {WU.unsubscribeNote}{" "}
          <strong>{WU.unsubscribeKeyword}</strong> {WU.unsubscribeSuffix}
        </p>
      ) : null}
    </div>
  );
}
