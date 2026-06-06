"use client";

import Image from "next/image";
import { WHATSAPP_UPDATES_UI } from "@/lib/constants/whatsapp-updates";
import { cn } from "@/lib/utils";

type WhatsAppUpdatesBenefitIconProps = {
  src: string;
  className?: string;
};

export function WhatsAppUpdatesBenefitIcon({
  src,
  className,
}: WhatsAppUpdatesBenefitIconProps) {
  return (
    <span className={cn(WHATSAPP_UPDATES_UI.benefitIcon, className)}>
      <Image src={src} alt="" width={22} height={22} unoptimized className="size-[22px]" />
    </span>
  );
}
