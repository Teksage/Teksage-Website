"use client";

import { useEffect, useRef, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { SubscribePromptDialog } from "@/components/common/SubscribePromptDialog";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import { CHAT_LANDING_LAYOUT } from "@/lib/constants/chat-landing-ui";
import { CHAT_SCREEN } from "@/lib/constants/chat-screen";
import {
  downloadChatPdf,
  sendChatHistoryMail,
} from "@/lib/services/chat";
import { cn } from "@/lib/utils";
import type { SubscribePromptPlanStatus } from "@/types/ui/subscribe-prompt";

type ChatAppBarMenuProps = {
  isPremium: boolean;
  messageCount: number;
  maintainHistory: boolean;
  planStatus: string;
  onToast: (message: string) => void;
  /** `light` = white header background (home embed). */
  tone?: "dark" | "light";
  trigger?: "bars" | "dots";
};

export function ChatAppBarMenu({
  isPremium,
  messageCount,
  maintainHistory,
  planStatus,
  onToast,
  tone = "dark",
  trigger = "bars",
}: ChatAppBarMenuProps) {
  const CS = useI18nConstants(CHAT_SCREEN);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const dialogStatus: SubscribePromptPlanStatus =
    planStatus.trim().toLowerCase() === "expired" ? "expired" : "default";

  function requirePremium(action: () => void) {
    if (!isPremium) {
      setSubscribeOpen(true);
      setOpen(false);
      return;
    }
    if (messageCount === 0) {
      onToast(CS.chatExportEmpty);
      setOpen(false);
      return;
    }
    action();
  }

  async function handleDownload() {
    setBusy(true);
    try {
      const blob = await downloadChatPdf(maintainHistory);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "AstroPromptChat.pdf";
      anchor.click();
      URL.revokeObjectURL(url);
      onToast(CS.chatDownloadSuccess);
    } catch {
      onToast(CS.chatExportFailed);
    } finally {
      setBusy(false);
      setOpen(false);
    }
  }

  async function handleMail() {
    setBusy(true);
    try {
      const res = await sendChatHistoryMail(maintainHistory);
      if (res.message?.toLowerCase().includes("success")) {
        onToast(CS.mailSentSuccess);
      } else {
        onToast(CS.chatExportFailed);
      }
    } catch {
      onToast(CS.chatExportFailed);
    } finally {
      setBusy(false);
      setOpen(false);
    }
  }

  const lineClass =
    tone === "light"
      ? "block h-0.5 w-5 rounded-full bg-[var(--color-brand-black)]/70"
      : "block h-0.5 w-5 rounded-full bg-white";

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={
          trigger === "dots"
            ? CHAT_LANDING_LAYOUT.headerActionBtn
            : "flex size-10 items-center justify-center"
        }
        aria-label={CS.chatMenuAria}
        aria-expanded={open}
        disabled={busy}
      >
        {trigger === "dots" ? (
          <span className="flex flex-col gap-0.5">
            <span className={CHAT_LANDING_LAYOUT.headerMenuDot} />
            <span className={CHAT_LANDING_LAYOUT.headerMenuDot} />
            <span className={CHAT_LANDING_LAYOUT.headerMenuDot} />
          </span>
        ) : (
          <span className="flex flex-col gap-1">
            <span className={lineClass} />
            <span className={lineClass} />
            <span className={lineClass} />
          </span>
        )}
      </button>
      {open ? (
        <div
          className={cn(
            "absolute right-0 top-full z-50 mt-2 min-w-[12.5rem] rounded-2xl",
            "bg-white px-4 py-3 shadow-[0_4px_23px_rgba(0,0,0,0.17)]"
          )}
        >
          <button
            type="button"
            className="flex w-full items-center gap-2.5 py-2 text-left text-base font-medium text-[var(--color-brand-black)]"
            onClick={() => requirePremium(() => void handleDownload())}
          >
            <img src={CHAT_ASSETS.download} alt="" className="size-5" />
            {CS.downloadChat}
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2.5 py-2 text-left text-base font-medium text-[var(--color-brand-black)]"
            onClick={() => requirePremium(() => void handleMail())}
          >
            <img src={CHAT_ASSETS.downloadMail} alt="" className="size-5" />
            {CS.sendToMail}
          </button>
        </div>
      ) : null}
      <SubscribePromptDialog
        open={subscribeOpen}
        onClose={() => setSubscribeOpen(false)}
        planStatus={dialogStatus}
      />
    </div>
  );
}
