"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18nConstants } from "@/hooks/useT";
import { DESKTOP_SIDEBAR_PANCHANG_TIMING } from "@/lib/constants/desktop-sidebar-panchang";
import { HOME_PANCHANG_TIMING_UI } from "@/lib/constants/home-panchang-timing-ui";
import type { HomePanchangTimingAuspiciousCellProps } from "@/types/ui/home-panchang-timing";
import { cn } from "@/lib/utils";

export function HomePanchangAuspiciousCell({
  label,
  slots,
  placeholder,
  variant,
}: HomePanchangTimingAuspiciousCellProps) {
  const copy = useI18nConstants(DESKTOP_SIDEBAR_PANCHANG_TIMING);
  const listId = useId();
  const onPrimary = variant === "onPrimary";
  const [open, setOpen] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const moreBtnRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const hasSlots = slots.length > 0;
  const first = hasSlots ? slots[0] : placeholder;
  const hiddenCount = Math.max(0, slots.length - 1);
  const valueClass = onPrimary
    ? HOME_PANCHANG_TIMING_UI.valueOnPrimary
    : HOME_PANCHANG_TIMING_UI.valueLight;

  const updatePopoverPos = useCallback(() => {
    const btn = moreBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    setPopoverPos({ top: rect.bottom + 6, left: rect.left });
  }, []);

  const isInsidePanel = useCallback((target: Node) => {
    return (
      rootRef.current?.contains(target) ||
      popoverRef.current?.contains(target) ||
      false
    );
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePopoverPos();
    const onLayout = () => updatePopoverPos();
    window.addEventListener("resize", onLayout);
    window.addEventListener("scroll", onLayout, true);
    return () => {
      window.removeEventListener("resize", onLayout);
      window.removeEventListener("scroll", onLayout, true);
    };
  }, [open, updatePopoverPos]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (isInsidePanel(event.target as Node)) return;
      setOpen(false);
    };
    const timer = window.setTimeout(() => {
      document.addEventListener("pointerdown", onPointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, isInsidePanel]);

  const popover =
    open && hiddenCount > 0 ? (
      <div
        ref={popoverRef}
        id={listId}
        className={HOME_PANCHANG_TIMING_UI.auspiciousPopoverFixed}
        style={{ top: popoverPos.top, left: popoverPos.left }}
        role="dialog"
        aria-label={copy.auspiciousTime}
      >
        <p className={HOME_PANCHANG_TIMING_UI.auspiciousPopoverTitle}>
          {copy.auspiciousTime}
        </p>
        <ul className={HOME_PANCHANG_TIMING_UI.auspiciousPopoverList}>
          {slots.map((slot) => (
            <li key={slot} className={HOME_PANCHANG_TIMING_UI.auspiciousPopoverItem}>
              {slot}
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  return (
    <div
      ref={rootRef}
      className={cn(
        HOME_PANCHANG_TIMING_UI.cell,
        HOME_PANCHANG_TIMING_UI.cellRelative,
        HOME_PANCHANG_TIMING_UI.cellInteractive,
        onPrimary
          ? HOME_PANCHANG_TIMING_UI.cellDividerOnPrimary
          : HOME_PANCHANG_TIMING_UI.cellDividerLight
      )}
    >
      <p
        className={
          onPrimary
            ? HOME_PANCHANG_TIMING_UI.labelOnPrimary
            : HOME_PANCHANG_TIMING_UI.labelLight
        }
      >
        {label}
      </p>

      <div className={HOME_PANCHANG_TIMING_UI.auspiciousValueRow}>
        <span className={cn(valueClass, "line-clamp-1 min-w-0")}>{first}</span>
        {hiddenCount > 0 ? (
          <button
            ref={moreBtnRef}
            type="button"
            className={cn(
              HOME_PANCHANG_TIMING_UI.auspiciousMoreBtn,
              onPrimary
                ? HOME_PANCHANG_TIMING_UI.auspiciousMoreBtnOnPrimary
                : HOME_PANCHANG_TIMING_UI.auspiciousMoreBtnLight
            )}
            aria-expanded={open}
            aria-controls={listId}
            onClick={() => setOpen((value) => !value)}
          >
            +{hiddenCount} {copy.auspiciousMore}
          </button>
        ) : null}
      </div>

      {typeof document !== "undefined" && popover
        ? createPortal(popover, document.body)
        : null}
    </div>
  );
}
