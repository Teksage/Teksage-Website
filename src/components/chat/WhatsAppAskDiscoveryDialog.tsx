"use client";

import Link from "next/link";
import {
  FEATURE_DISCOVERY_SCREEN,
  FEATURE_DISCOVERY_UI,
  ROUTES,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { WhatsAppAskDiscoveryDialogProps } from "@/types/ui/feature-discovery";

function FeatureDiscoveryCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8.25 12.25 10.75 14.75 15.75 9.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HintRow({ text }: { text: string }) {
  return (
    <li className={FEATURE_DISCOVERY_UI.hintRow}>
      <FeatureDiscoveryCheckIcon className={FEATURE_DISCOVERY_UI.hintIcon} />
      <span className={FEATURE_DISCOVERY_UI.hintText}>{text}</span>
    </li>
  );
}

export function WhatsAppAskDiscoveryDialog({
  open,
  onDismiss,
}: WhatsAppAskDiscoveryDialogProps) {
  if (!open) return null;

  return (
    <div className={FEATURE_DISCOVERY_UI.overlay} role="presentation">
      <button
        type="button"
        className={FEATURE_DISCOVERY_UI.backdrop}
        onClick={() => void onDismiss()}
        aria-label="Dismiss"
      />
      <div
        className={FEATURE_DISCOVERY_UI.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feature-discovery-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="feature-discovery-title" className={FEATURE_DISCOVERY_UI.title}>
          {FEATURE_DISCOVERY_SCREEN.title}
        </h2>
        <p className={FEATURE_DISCOVERY_UI.body}>{FEATURE_DISCOVERY_SCREEN.body}</p>
        <ul className={FEATURE_DISCOVERY_UI.hints}>
          <HintRow text={FEATURE_DISCOVERY_SCREEN.whatsappHint} />
          <HintRow text={FEATURE_DISCOVERY_SCREEN.askAstrologerHint} />
        </ul>
        <Link
          href={ROUTES.whatsappUpdates}
          className={FEATURE_DISCOVERY_UI.link}
          onClick={() => void onDismiss()}
        >
          {FEATURE_DISCOVERY_SCREEN.openWhatsAppSettings}
        </Link>
        <button
          type="button"
          className={cn(FEATURE_DISCOVERY_UI.cta)}
          onClick={() => void onDismiss()}
        >
          {FEATURE_DISCOVERY_SCREEN.gotIt}
        </button>
      </div>
    </div>
  );
}
