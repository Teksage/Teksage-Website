"use client";

import { useState, useMemo } from "react";
import { format, addDays, startOfWeek, isBefore, isToday, isSameDay } from "date-fns";
import { PageLoadingCenter } from "@/components/common/Loader";
import { cn } from "@/lib/utils";
import { ASTRO_PORTAL_UI, ASTRO_PORTAL_COLORS, SLOT_SESSIONS } from "@/lib/constants/astrologer-portal";
import type { AstrologerAvailabilityProps } from "@/types";

// ─── Time-slot helpers (mirrors Flutter TimeSelectorComponent) ──────────────

function format12h(hour: number, minute: number): string {
  const d = new Date(2000, 0, 1, hour, minute);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

function generateSlots(startHour: number, endHour: number): Array<{ label: string; range24: string }> {
  const slots: Array<{ label: string; range24: string }> = [];
  for (let h = startHour; h < endHour; h++) {
    const s0 = `${String(h).padStart(2, "0")}:00`;
    const s30 = `${String(h).padStart(2, "0")}:30`;
    const e30 = `${String(h).padStart(2, "0")}:30`;
    const h1 = h + 1;
    const e00 = `${String(h1 % 24).padStart(2, "0")}:00`;

    slots.push({
      label: `${format12h(h, 0)} - ${format12h(h, 30)}`,
      range24: `${s0} - ${e30}`,
    });
    if (h !== endHour - 1) {
      slots.push({
        label: `${format12h(h, 30)} - ${format12h(h1, 0)}`,
        range24: `${s30} - ${e00}`,
      });
    }
  }
  // Last slot: (endHour-1):30 - endHour:00
  const lh = endHour - 1;
  const lh1 = endHour % 24;
  slots.push({
    label: `${format12h(lh, 30)} - ${format12h(lh1, 0)}`,
    range24: `${String(lh).padStart(2, "0")}:30 - ${String(lh1).padStart(2, "0")}:00`,
  });
  return slots;
}

function isSlotInPast(range24: string, selectedDate: Date): boolean {
  if (!isToday(selectedDate)) return false;
  try {
    const startStr = range24.split(" - ")[0];
    const [h, m] = startStr.split(":").map(Number);
    const slotTime = new Date(selectedDate);
    slotTime.setHours(h, m, 0, 0);
    return slotTime < new Date();
  } catch {
    return false;
  }
}

// ─── Week date picker (mirrors HorizontalDatePicker) ────────────────────────

interface WeekDatePickerProps {
  selectedDate: Date;
  onDateSelect: (d: Date) => void;
  availableRanges: Set<string>;
}

function WeekDatePicker({ selectedDate, onDateSelect, availableRanges }: WeekDatePickerProps) {
  const today = useMemo(() => new Date(), []);
  const [weekStart, setWeekStart] = useState(() => {
    const d = new Date(today);
    const dow = d.getDay();
    d.setDate(d.getDate() - dow);
    return d;
  });

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const canGoPrev = !isBefore(
    addDays(weekStart, 6),
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  );

  function goNext() {
    setWeekStart((d) => addDays(d, 7));
  }
  function goPrev() {
    const prev = addDays(weekStart, -7);
    const prevEnd = addDays(prev, 6);
    const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (!isBefore(prevEnd, todayMid)) setWeekStart(prev);
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900/50">
          {format(weekStart, "MMMM yyyy")}
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={goPrev}
            disabled={!canGoPrev}
            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 disabled:opacity-30"
            aria-label="Previous week"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100"
            aria-label="Next week"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isPast = isBefore(
            new Date(day.getFullYear(), day.getMonth(), day.getDate()),
            new Date(today.getFullYear(), today.getMonth(), today.getDate())
          );
          const isSelected = isSameDay(day, selectedDate);
          const hasSlots =
            !isPast &&
            [...availableRanges].some(() => true); // simplified; full check would need date context

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={isPast}
              onClick={() => onDateSelect(day)}
              className={cn(
                "flex flex-col items-center rounded-xl py-2 text-xs font-semibold transition-colors",
                isPast && "cursor-default opacity-30",
                isSelected
                  ? "text-white"
                  : "bg-transparent text-gray-700 hover:bg-gray-100"
              )}
              style={isSelected ? { backgroundColor: ASTRO_PORTAL_COLORS.brandGreen } : undefined}
            >
              <span className="text-[10px] font-medium uppercase text-current opacity-60">
                {format(day, "EEE")}
              </span>
              <span className="mt-0.5">{format(day, "d")}</span>
              {hasSlots && !isSelected && (
                <span
                  className="mt-0.5 h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: ASTRO_PORTAL_COLORS.brandGreen }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Session slot grid section ───────────────────────────────────────────────

interface SessionSectionProps {
  title: string;
  slots: Array<{ label: string; range24: string }>;
  selectedDate: Date;
  selectedRanges: Set<string>;
  bookedRanges: Set<string>;
  isEdit: boolean;
  onToggle: (range24: string) => void;
  onBookedTap: () => void;
}

function SessionSection({
  title,
  slots,
  selectedDate,
  selectedRanges,
  bookedRanges,
  isEdit,
  onToggle,
  onBookedTap,
}: SessionSectionProps) {
  const [expanded, setExpanded] = useState(true);

  const visibleSlots = useMemo(() => {
    if (isEdit) return slots.filter((s) => !isSlotInPast(s.range24, selectedDate));
    // View mode: only show selected or booked
    return slots.filter(
      (s) => selectedRanges.has(s.range24) || bookedRanges.has(s.range24)
    );
  }, [slots, isEdit, selectedDate, selectedRanges, bookedRanges]);

  const selectedCount = useMemo(
    () => visibleSlots.filter((s) => selectedRanges.has(s.range24)).length,
    [visibleSlots, selectedRanges]
  );

  if (!isEdit && visibleSlots.length === 0) return null;

  return (
    <div
      className={cn(
        "mb-5 overflow-hidden rounded-xl",
        isEdit
          ? `border ${expanded ? "border-[#94C10D]" : "border-black/[0.06]"}`
          : "bg-white"
      )}
      style={isEdit ? { backgroundColor: ASTRO_PORTAL_COLORS.slotEditBg } : undefined}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex h-[51px] w-full items-center justify-between px-3"
      >
        <span className="text-base font-bold text-gray-900/60">{title}</span>
        <span className="flex items-center gap-2">
          <span className="text-base font-semibold" style={{ color: ASTRO_PORTAL_COLORS.brandGreen }}>
            {selectedCount} {ASTRO_PORTAL_UI.avail.slots}
          </span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" style={{ color: ASTRO_PORTAL_COLORS.brandGreen }}>
            <path
              d={expanded ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      {expanded && (
        <>
          <div className="mx-3 border-t border-dashed border-black/20" />
          <div className="grid grid-cols-3 gap-2.5 p-3">
            {visibleSlots.map((s) => {
              const isSelected = selectedRanges.has(s.range24);
              const isBooked = bookedRanges.has(s.range24);
              const isPast = isSlotInPast(s.range24, selectedDate);

              let bgColor = "white";
              let textColor = isEdit ? "rgba(0,0,0,0.6)" : "black";
              let borderStyle: React.CSSProperties = {};

              if (isPast || isBooked) {
                bgColor = isEdit ? "#E0E0E0" : ASTRO_PORTAL_COLORS.slotBooked;
              } else if (isSelected) {
                bgColor = isEdit ? ASTRO_PORTAL_COLORS.brandGreen : ASTRO_PORTAL_COLORS.slotAvailable;
                textColor = isEdit ? "white" : "black";
              }

              if (isEdit) {
                borderStyle = { border: "1px solid rgba(0,0,0,0.1)" };
              }

              return (
                <button
                  key={s.range24}
                  type="button"
                  disabled={!isEdit || isPast}
                  onClick={() => {
                    if (isBooked) { onBookedTap(); return; }
                    onToggle(s.range24);
                  }}
                  className="flex items-center justify-center rounded-xl py-2.5 text-sm font-semibold leading-none transition-transform active:scale-95 disabled:cursor-default"
                  style={{ backgroundColor: bgColor, color: textColor, ...borderStyle }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function AstrologerAvailability({
  selectedDate,
  onDateChange,
  isEdit,
  onEditChange,
  availability,
}: AstrologerAvailabilityProps) {
  const [showBookedError, setShowBookedError] = useState(false);

  const {
    bookedRanges,
    selectedRanges,
    setSelectedRanges,
    loading,
    saveMessage,
    setSaveMessage,
  } = availability;

  const morningSlots = useMemo(
    () =>
      generateSlots(SLOT_SESSIONS.morning.start, SLOT_SESSIONS.morning.end),
    []
  );
  const afternoonSlots = useMemo(
    () =>
      generateSlots(SLOT_SESSIONS.afternoon.start, SLOT_SESSIONS.afternoon.end),
    []
  );

  function handleToggle(range24: string) {
    setSelectedRanges((prev) => {
      const next = new Set(prev);
      if (next.has(range24)) next.delete(range24);
      else next.add(range24);
      return next;
    });
    setSaveMessage(null);
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-4">
        {/* Divider */}
        <div className="border-b border-dashed border-black/20 py-4">
          <p className="text-center text-sm font-semibold text-gray-900">
            {isEdit
              ? ASTRO_PORTAL_UI.avail.editingPrompt
              : ASTRO_PORTAL_UI.avail.viewingPrompt}
          </p>
        </div>

        <div className="mt-7" />

        {/* Week date picker */}
        <WeekDatePicker
          selectedDate={selectedDate}
          onDateSelect={(d) => {
            if (isEdit && availability.hasChanges) {
              if (confirm(ASTRO_PORTAL_UI.avail.unsavedWarningBody)) {
                onEditChange(false);
                onDateChange(d);
              }
            } else {
              onDateChange(d);
            }
          }}
          availableRanges={selectedRanges}
        />

        <div className="mt-5" />

        {/* Booked-slot error toast */}
        {showBookedError && (
          <div
            className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-[#FFE5E5] px-4 py-3 text-sm text-red-700"
          >
            <span className="flex-1">{ASTRO_PORTAL_UI.avail.bookedNotice}</span>
            <button type="button" onClick={() => setShowBookedError(false)} aria-label="Dismiss">
              ✕
            </button>
          </div>
        )}

        {/* Save feedback */}
        {saveMessage && (
          <div
            className={cn(
              "mb-4 rounded-xl px-4 py-3 text-sm font-semibold",
              saveMessage.type === "success"
                ? "bg-[#ECF4D3] text-green-800"
                : "bg-red-50 text-red-700"
            )}
          >
            {saveMessage.text}
          </div>
        )}

        {/* Slot sections */}
        {loading ? (
          <PageLoadingCenter className="py-20" />
        ) : (
          <>
            <SessionSection
              title={ASTRO_PORTAL_UI.avail.morning}
              slots={morningSlots}
              selectedDate={selectedDate}
              selectedRanges={selectedRanges}
              bookedRanges={bookedRanges}
              isEdit={isEdit}
              onToggle={handleToggle}
              onBookedTap={() => setShowBookedError(true)}
            />
            <SessionSection
              title={ASTRO_PORTAL_UI.avail.afternoon}
              slots={afternoonSlots}
              selectedDate={selectedDate}
              selectedRanges={selectedRanges}
              bookedRanges={bookedRanges}
              isEdit={isEdit}
              onToggle={handleToggle}
              onBookedTap={() => setShowBookedError(true)}
            />

            {/* No slots in view mode */}
            {!isEdit && selectedRanges.size === 0 && bookedRanges.size === 0 && (
              <p className="mt-10 text-center text-sm font-medium text-gray-400">
                {ASTRO_PORTAL_UI.avail.emptyDayHint}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
