"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { PanchangPersonalizedSections } from "@/components/panchang/PanchangPersonalizedSections";
import { PanchangMuhurthaCta } from "@/components/muhurtha/PanchangMuhurthaCta";
import {
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
  PANCHANG_ASSETS,
  PANCHANG_LAYOUT,
  PANCHANG_SCREEN,
} from "@/lib/constants";
import type { PanchangDetailViewProps } from "@/types";

function PanchangInfoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 10.2V16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7.3" r="0.9" fill="currentColor" />
    </svg>
  );
}

/**
 * Premium Personalized Panchang — mirrors Flutter `panchangPage.dart`: gradient under
 * **`public/flutter-assets/images/panchangBG.png`** (`PANCHANG_ASSETS.personalizedBackground`, `BoxFit.cover`).
 */
export function PanchangDetailView({
  panchang,
  selectedDate,
  onSelectDate,
  onDownloadPdf,
  pdfBusy = false,
}: PanchangDetailViewProps) {
  const P = useI18nConstants(PANCHANG_SCREEN);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const L = PANCHANG_LAYOUT;

  return (
    <div className={PAGE_SHELL.detailRoot}>
      <div aria-hidden className={MAIN_TAB_VIEWPORT_BACKDROP.overflowHidden}>
        <div className={L.desktopBackdrop} />
        <div className={L.mobileBackdrop}>
          <div className={L.heroGradient} />
          <div className={L.fillLayer}>
            <Image
              src={PANCHANG_ASSETS.personalizedBackground}
              alt=""
              fill
              className={L.imageCover}
              sizes={L.imageSizes}
              priority
            />
          </div>
        </div>
      </div>

      <header className={L.heroHeader}>
        <h1 className={L.heroTitle}>{P.personalizedTitle}</h1>
        <div className="flex items-center gap-1">
          {onDownloadPdf ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
              disabled={pdfBusy}
              onClick={onDownloadPdf}
            >
              {pdfBusy ? "…" : P.downloadPdfCta}
            </Button>
          ) : null}
          <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={L.infoButton}
          aria-label={P.infoButtonAria}
          onClick={() => dialogRef.current?.showModal()}
        >
          <PanchangInfoIcon />
        </Button>
        </div>
      </header>

      <dialog ref={dialogRef} className={L.infoDialog}>
        <p className={L.infoDialogTitle}>{P.infoDialogTitle}</p>
        <p className={L.infoDialogBody}>{P.infoDialogBody}</p>
        <form method="dialog" className={L.infoDialogActions}>
          <Button type="submit" className={L.infoDialogClose}>
            {P.infoDialogCloseCta}
          </Button>
        </form>
      </dialog>

      <div className={L.content}>
        <div className={L.contentColumn}>
          <PanchangPersonalizedSections
            panchang={panchang}
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
          />
          <PanchangMuhurthaCta />
        </div>
      </div>
    </div>
  );
}
