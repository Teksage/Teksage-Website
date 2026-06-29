"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useState } from "react";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import { MATCH_MAKING_ASSETS } from "@/lib/constants/prediction-assets";
import { MATCH_MAKING_SCREEN } from "@/lib/constants/match-making-screen";
import { cn } from "@/lib/utils";

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
      <div className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] right-5 z-50 flex flex-col items-end gap-3 lg:hidden">
        {open ? (
          <div className="rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
            {onDownloadPdf ? (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onDownloadPdf();
                }}
                disabled={pdfBusy}
                className="flex w-full items-center gap-2.5 py-1.5 text-base font-medium text-[var(--color-brand-black)]"
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
              className={cn(
                "flex w-full items-center gap-2.5 py-1.5 text-base font-medium text-[var(--color-brand-black)]",
                onDownloadPdf && "mt-3"
              )}
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
              className="mt-3 flex w-full items-center gap-2.5 py-1.5 text-base font-medium text-[var(--color-brand-black)]"
            >
              <img src={MATCH_MAKING_ASSETS.regenerate} alt="" className="size-5" />
              {MM.regenerateCta}
            </button>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex size-[4.375rem] items-center justify-center rounded-full",
            "bg-[var(--color-match-fab)] shadow-lg transition-transform",
            open && "rotate-45"
          )}
          aria-label={open ? "Close actions" : "Open actions"}
        >
          <img src={MATCH_MAKING_ASSETS.fabButton} alt="" className="size-7" />
        </button>
      </div>
    </>
  );
}
