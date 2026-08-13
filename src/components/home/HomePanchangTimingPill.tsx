"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18nConstants } from "@/hooks/useT";
import { DESKTOP_SIDEBAR_PANCHANG_TIMING } from "@/lib/constants/desktop-sidebar-panchang";
import { HOME_PANCHANG_TIMING_UI as UI } from "@/lib/constants/home-panchang-timing-ui";
import { cn } from "@/lib/utils";
import type { HomePanchangTimingPillProps } from "@/types/ui/home-panchang-timing";

export function HomePanchangTimingPill({
  label,
  value,
  tone,
  extraLabel,
  extraSlots = [],
}: HomePanchangTimingPillProps) {
  const copy = useI18nConstants(DESKTOP_SIDEBAR_PANCHANG_TIMING);
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const extraRef = useRef<HTMLSpanElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const canShowExtra = Boolean(extraLabel) && extraSlots.length > 0;

  const updatePos = useCallback(() => {
    const el = extraRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ top: rect.bottom + 6, left: rect.left + rect.width / 2 });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePos();
    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos, true);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos, true);
    };
  }, [open, updatePos]);

  const popover =
    open && canShowExtra ? (
      <div
        ref={popoverRef}
        id={listId}
        className={UI.auspiciousPopoverFixed}
        style={{ top: pos.top, left: pos.left, transform: "translateX(-50%)" }}
        role="tooltip"
        aria-label={copy.auspiciousTime}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <p className={UI.auspiciousPopoverTitle}>{copy.auspiciousTime}</p>
        <ul className={UI.auspiciousPopoverList}>
          {extraSlots.map((slot) => (
            <li key={slot} className={UI.auspiciousPopoverItem}>
              {slot}
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  return (
    <div className={UI.pill}>
      <span
        className={cn(
          UI.pillDot,
          tone === "auspicious" ? UI.pillDotAuspicious : UI.pillDotInauspicious
        )}
        aria-hidden
      />
      <span
        className={
          tone === "auspicious" ? UI.pillLabelAuspicious : UI.pillLabel
        }
      >
        {label}
      </span>
      <span className={UI.pillValue}>{value}</span>
      {canShowExtra ? (
        <span
          ref={extraRef}
          className={UI.pillExtraWrap}
          onMouseEnter={() => {
            updatePos();
            setOpen(true);
          }}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => {
            updatePos();
            setOpen(true);
          }}
          onBlur={() => setOpen(false)}
        >
          <button
            type="button"
            className={UI.pillExtra}
            aria-expanded={open}
            aria-controls={listId}
            aria-label={`${copy.auspiciousTime} ${extraLabel}`}
          >
            {extraLabel}
          </button>
        </span>
      ) : null}
      {typeof document !== "undefined" && popover
        ? createPortal(popover, document.body)
        : null}
    </div>
  );
}
