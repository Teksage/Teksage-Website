"use client";

import { useId } from "react";
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
  const tooltipId = useId();

  if (!tooltip.trim()) return <span />;

  return (
    <span className={`group ${L.reasonTooltipWrap}`}>
      <span role="tooltip" id={tooltipId} className={L.reasonTooltipPanel}>
        {tooltip}
        <span className={L.reasonTooltipArrow} />
      </span>
      <button
        type="button"
        className={L.reasonInfoBtn}
        aria-label={ariaLabel}
        aria-describedby={tooltipId}
      >
        <InfoIcon />
      </button>
    </span>
  );
}
