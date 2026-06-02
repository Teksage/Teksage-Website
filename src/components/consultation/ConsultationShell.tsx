"use client";

import Image from "next/image";
import { AppHeader } from "@/components/common/AppHeader";
import { CONSULTATION_ASSETS, CONSULTATION_LAYOUT } from "@/lib/constants";
import type { ConsultationShellProps } from "@/types/ui/consultation";
import { cn } from "@/lib/utils";

/** Consultation flow chrome — Flutter `userCategory.dart` / `userSelectLanguage.dart`. */
export function ConsultationShell({
  title,
  children,
  footer,
  onBack,
  className,
}: ConsultationShellProps) {
  return (
    <div className={cn(CONSULTATION_LAYOUT.shell, className)}>
      <Image
        src={CONSULTATION_ASSETS.categoryTopDeco}
        alt=""
        width={800}
        height={400}
        unoptimized
        className={CONSULTATION_LAYOUT.decoTop}
        aria-hidden
      />
      <Image
        src={CONSULTATION_ASSETS.categoryBottomDeco}
        alt=""
        width={800}
        height={160}
        unoptimized
        className={CONSULTATION_LAYOUT.decoBottom}
        aria-hidden
      />
      <div className={CONSULTATION_LAYOUT.body}>
        <AppHeader title={title} showBack onBackClick={onBack} blend />
        <div className={CONSULTATION_LAYOUT.scroll}>{children}</div>
        {footer ? <footer className={CONSULTATION_LAYOUT.footer}>{footer}</footer> : null}
      </div>
    </div>
  );
}
