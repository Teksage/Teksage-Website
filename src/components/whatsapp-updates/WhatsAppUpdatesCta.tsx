"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { WHATSAPP_UPDATES_ASSETS } from "@/lib/constants/assets";
import { CONSULTATION_BOOKING_LAYOUT } from "@/lib/constants/consultation-booking";
import { useI18nConstants } from "@/hooks/useT";
import {
  WHATSAPP_UPDATES_SCREEN,
  WHATSAPP_UPDATES_UI,
} from "@/lib/constants/whatsapp-updates";
import { cn } from "@/lib/utils";
import type { WhatsAppUpdatesCtaProps } from "@/types/whatsapp-updates";

export function WhatsAppUpdatesCta({
  disabled,
  loading,
  onEnable,
  className,
  showStopNote = true,
  hintText,
  ctaLabel,
  variant = "default",
}: WhatsAppUpdatesCtaProps) {
  const WU = useI18nConstants(WHATSAPP_UPDATES_SCREEN);
  const label = loading ? WU.ctaSending : ctaLabel ?? WU.ctaLabel;

  if (variant === "flow") {
    return (
      <button
        type="button"
        disabled={disabled || loading}
        onClick={onEnable}
        className={cn(
          CONSULTATION_BOOKING_LAYOUT.payBtn,
          "inline-flex items-center justify-center gap-2",
          className
        )}
      >
        <Image
          src={WHATSAPP_UPDATES_ASSETS.ctaWhatsapp}
          alt=""
          width={20}
          height={20}
          unoptimized
          className="size-5 shrink-0 brightness-0 invert"
        />
        {label}
      </button>
    );
  }

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
        <span className="flex-1 text-center">{label}</span>
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
