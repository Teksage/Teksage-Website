"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useState } from "react";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import { MATCH_MAKING_ASSETS } from "@/lib/constants/prediction-assets";
import { MATCH_MAKING_LAYOUT } from "@/lib/constants/match-making-layout";
import { MATCH_MAKING_SCREEN } from "@/lib/constants/match-making-screen";
import { cn } from "@/lib/utils";

/** Mobile-only plus menu (`lg:hidden`). Desktop uses the three CTA buttons. */
export function MatchMakingDetailsFab({
  onRegenerate,
  onExpertConnect,
  onDownloadPdf,
  pdfBusy = false,
}: {
  onRegenerate: () => void;
  onExpertConnect: () => void;
  onDownloadPdf?: () => void;
  pdfBusy?: boolean;
}) {
  const MM = useI18nConstants(MATCH_MAKING_SCREEN);
  const L = MATCH_MAKING_LAYOUT;
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <div className={L.fabWrap}>
        {open ? (
          <div className={L.fabMenuPanel}>
            {onDownloadPdf ? (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onDownloadPdf();
                }}
                disabled={pdfBusy}
                className={L.fabMenuItem}
              >
                <img src={CHAT_ASSETS.download} alt="" className="size-5" />
                {pdfBusy ? "…" : MM.downloadPdfCta}
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onExpertConnect();
              }}
              className={cn(L.fabMenuItem, onDownloadPdf && "mt-2")}
            >
              <img src={MATCH_MAKING_ASSETS.expert} alt="" className="size-5" />
              {MM.expertConnectCta}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onRegenerate();
              }}
              className={cn(L.fabMenuItem, "mt-2")}
            >
              <img src={MATCH_MAKING_ASSETS.regenerate} alt="" className="size-5" />
              {MM.regenerateCta}
            </button>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(L.fabButton, open && "rotate-45")}
          aria-label={open ? "Close actions" : "Open actions"}
        >
          <img src={MATCH_MAKING_ASSETS.fabButton} alt="" className={L.fabIcon} />
        </button>
      </div>
    </>
  );
}
