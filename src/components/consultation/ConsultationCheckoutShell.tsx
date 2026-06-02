"use client";

import Image from "next/image";
import { AppHeader } from "@/components/common/AppHeader";
import { CONSULTATION_ASSETS } from "@/lib/constants";
import { CONSULTATION_CHECKOUT_LAYOUT } from "@/lib/constants/consultation-checkout";
import type { ConsultationShellProps } from "@/types/ui/consultation";

/** Checkout chrome — white deco shell with centered desktop column. */
export function ConsultationCheckoutShell({
  title,
  children,
  footer,
  onBack,
}: ConsultationShellProps) {
  return (
    <div className={CONSULTATION_CHECKOUT_LAYOUT.page}>
      <Image
        src={CONSULTATION_ASSETS.categoryTopDeco}
        alt=""
        width={800}
        height={400}
        unoptimized
        className={CONSULTATION_CHECKOUT_LAYOUT.decoTop}
        aria-hidden
      />
      <Image
        src={CONSULTATION_ASSETS.categoryBottomDeco}
        alt=""
        width={800}
        height={160}
        unoptimized
        className={CONSULTATION_CHECKOUT_LAYOUT.decoBottom}
        aria-hidden
      />
      <div className={CONSULTATION_CHECKOUT_LAYOUT.body}>
        <AppHeader title={title} showBack onBackClick={onBack} blend />
        <div className={CONSULTATION_CHECKOUT_LAYOUT.scroll}>
          <div className={CONSULTATION_CHECKOUT_LAYOUT.contentColumn}>{children}</div>
        </div>
        {footer ? (
          <footer className={CONSULTATION_CHECKOUT_LAYOUT.footer}>
            <div className={CONSULTATION_CHECKOUT_LAYOUT.footerColumn}>{footer}</div>
          </footer>
        ) : null}
      </div>
    </div>
  );
}
