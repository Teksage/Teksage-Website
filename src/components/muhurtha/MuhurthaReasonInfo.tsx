"use client";

import { MUHURTHA_LAYOUT } from "@/lib/constants";

function InfoIcon() {
  return (
    <svg
      width="18"
      height="18"
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

export function MuhurthaReasonInfo({
  tooltip,
  ariaLabel,
}: {
  tooltip: string;
  ariaLabel: string;
}) {
  const L = MUHURTHA_LAYOUT;

  if (!tooltip.trim()) return <span />;

  return (
    <span className="flex items-center">
      <button
        type="button"
        className={L.reasonInfoBtn}
        title={tooltip}
        aria-label={ariaLabel}
      >
        <InfoIcon />
      </button>
    </span>
  );
}
