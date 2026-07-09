"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MUHURTHA_LAYOUT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { MuhurthaReasonInfoProps } from "@/types/muhurtha";

type PanelPos = {
  top: number;
  left: number;
  width: number;
  placement: "above" | "below";
};

function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
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

function measurePanel(anchor: HTMLElement): PanelPos {
  const rect = anchor.getBoundingClientRect();
  const width = Math.min(288, window.innerWidth - 32);
  const left = Math.min(Math.max(16, rect.right - width), window.innerWidth - width - 16);
  const belowTop = rect.bottom + 8;
  const spaceBelow = window.innerHeight - belowTop;
  if (spaceBelow < 96 && rect.top > 112) {
    return { top: rect.top - 8, left, width, placement: "above" };
  }
  return { top: belowTop, left, width, placement: "below" };
}

export function MuhurthaReasonInfo({ reasons, ariaLabel }: MuhurthaReasonInfoProps) {
  const L = MUHURTHA_LAYOUT;
  const tooltipId = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [panelPos, setPanelPos] = useState<PanelPos | null>(null);
  const filtered = reasons.map((r) => r.trim()).filter(Boolean);
  const open = pinned || hovered;

  const syncPanel = () => {
    if (!btnRef.current) return;
    setPanelPos(measurePanel(btnRef.current));
  };

  useLayoutEffect(() => {
    if (!open) {
      setPanelPos(null);
      return;
    }
    syncPanel();
    const onReflow = () => syncPanel();
    window.addEventListener("resize", onReflow);
    window.addEventListener("scroll", onReflow, true);
    return () => {
      window.removeEventListener("resize", onReflow);
      window.removeEventListener("scroll", onReflow, true);
    };
  }, [open]);

  useEffect(() => {
    if (!pinned) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!btnRef.current?.contains(event.target as Node)) setPinned(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPinned(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [pinned]);

  if (!filtered.length) return <span />;

  const panel =
    open && panelPos && typeof document !== "undefined"
      ? createPortal(
          <div
            role="tooltip"
            id={tooltipId}
            className={L.reasonTooltipPanelFixed}
            style={{
              position: "fixed",
              top: panelPos.placement === "below" ? panelPos.top : undefined,
              bottom:
                panelPos.placement === "above"
                  ? window.innerHeight - panelPos.top
                  : undefined,
              left: panelPos.left,
              width: panelPos.width,
              zIndex: 9999,
            }}
          >
            {filtered.length === 1 ? (
              filtered[0]
            ) : (
              <ul className={L.reasonList}>
                {filtered.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            )}
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <span className={L.reasonTooltipWrap}>
        <button
          ref={btnRef}
          type="button"
          className={cn(
            L.reasonInfoBtn,
            open &&
              "border-[var(--color-brand-primary)]/35 bg-[var(--color-brand-bg)] text-[var(--color-brand-primary)]"
          )}
          aria-label={ariaLabel}
          aria-expanded={open}
          aria-describedby={open ? tooltipId : undefined}
          onMouseEnter={() => {
            syncPanel();
            setHovered(true);
          }}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => {
            syncPanel();
            setHovered(true);
          }}
          onBlur={() => setHovered(false)}
          onClick={() => {
            syncPanel();
            setPinned((value) => !value);
          }}
        >
          <InfoIcon />
        </button>
      </span>
      {panel}
    </>
  );
}
