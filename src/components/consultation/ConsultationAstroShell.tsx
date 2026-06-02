"use client";

import { AppHeader } from "@/components/common/AppHeader";
import { CONSULTATION_DETAIL_LAYOUT } from "@/lib/constants/consultation-detail";
import { cn } from "@/lib/utils";

type ConsultationAstroShellProps = {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onBack?: () => void;
};

/** Green consultation chrome — Flutter `astrologerDetailpage.dart`, `userHome.dart`. */
export function ConsultationAstroShell({
  title,
  children,
  footer,
  onBack,
}: ConsultationAstroShellProps) {
  return (
    <div className={CONSULTATION_DETAIL_LAYOUT.page}>
      <AppHeader
        title={title}
        showBack
        onBackClick={onBack}
        className={cn(
          CONSULTATION_DETAIL_LAYOUT.header,
          "[&_button]:text-white [&_button_svg_path]:stroke-white"
        )}
      />
      <div className={CONSULTATION_DETAIL_LAYOUT.scroll}>
        <div className={CONSULTATION_DETAIL_LAYOUT.contentColumn}>{children}</div>
      </div>
      {footer ? (
        <div className={CONSULTATION_DETAIL_LAYOUT.footerWrap}>
          <div className={CONSULTATION_DETAIL_LAYOUT.contentColumn}>{footer}</div>
        </div>
      ) : null}
    </div>
  );
}
