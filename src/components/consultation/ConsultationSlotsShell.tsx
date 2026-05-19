"use client";

import { AppHeader } from "@/components/common/AppHeader";
import { CONSULTATION_SLOTS_LAYOUT } from "@/lib/constants/consultation-slots";
import { cn } from "@/lib/utils";
import type { ConsultationSlotsShellProps } from "@/types/ui/consultation";

/** Green booking chrome — Flutter `userBookingPage.dart`. */
export function ConsultationSlotsShell({
  title,
  children,
  footer,
  onBack,
}: ConsultationSlotsShellProps) {
  return (
    <div className={CONSULTATION_SLOTS_LAYOUT.page}>
      <AppHeader
        title={title}
        showBack
        onBackClick={onBack}
        className={cn(
          CONSULTATION_SLOTS_LAYOUT.header,
          "[&_button]:text-white [&_button_svg_path]:stroke-white"
        )}
      />
      <div className={CONSULTATION_SLOTS_LAYOUT.scroll}>
        <div className={CONSULTATION_SLOTS_LAYOUT.contentColumn}>{children}</div>
      </div>
      {footer ? (
        <div className={CONSULTATION_SLOTS_LAYOUT.footerWrap}>
          <div className={CONSULTATION_SLOTS_LAYOUT.contentColumn}>{footer}</div>
        </div>
      ) : null}
    </div>
  );
}
