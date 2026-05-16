"use client";

import { useState } from "react";
import { MATCH_MAKING_ASSETS } from "@/lib/constants/prediction-assets";
import { MATCH_MAKING_SCREEN } from "@/lib/constants/match-making-screen";
import { cn } from "@/lib/utils";

export function MatchMakingDetailsFab({
  onRegenerate,
  onExpertConnect,
}: {
  onRegenerate: () => void;
  onExpertConnect: () => void;
}) {
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
      <div className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] right-5 z-50 flex flex-col items-end gap-3 lg:bottom-8">
        {open ? (
          <div className="rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onExpertConnect();
              }}
              className="flex w-full items-center gap-2.5 py-1.5 text-base font-medium text-[var(--color-brand-black)]"
            >
              <img src={MATCH_MAKING_ASSETS.expert} alt="" className="size-5" />
              {MATCH_MAKING_SCREEN.expertConnectCta}
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
              {MATCH_MAKING_SCREEN.regenerateCta}
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
