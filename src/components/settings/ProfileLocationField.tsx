"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { fetchPlaceSuggestions, type PlaceSuggestion } from "@/lib/places-suggestions";
import { cn } from "@/lib/utils";
import type { ProfileLocationFieldProps } from "@/types";

type MenuPos = { top: number; left: number; width: number };

export function ProfileLocationField({
  label,
  required,
  value,
  fullLocation,
  isEditable,
  placeholder,
  onChange,
  onBlurCommit,
  hasError,
  errorMessage,
  onFocusAttempt,
  inputClassName,
}: ProfileLocationFieldProps) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [menuPos, setMenuPos] = useState<MenuPos>({ top: 0, left: 0, width: 0 });
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function syncMenuPos() {
    const el = inputRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMenuPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open || suggestions.length === 0) return;
    syncMenuPos();
    const onReflow = () => syncMenuPos();
    window.addEventListener("scroll", onReflow, true);
    window.addEventListener("resize", onReflow);
    return () => {
      window.removeEventListener("scroll", onReflow, true);
      window.removeEventListener("resize", onReflow);
    };
  }, [open, suggestions]);

  function scheduleSuggestions(query: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim() || !isEditable) {
      setSuggestions([]);
      return;
    }
    debounceRef.current = setTimeout(() => {
      void fetchPlaceSuggestions(query).then((list) => {
        setSuggestions(list);
        if (list.length > 0) {
          setOpen(true);
          syncMenuPos();
        }
      });
    }, 300);
  }

  function pickSuggestion(item: PlaceSuggestion) {
    onChange(item.selectedText, item.displayText);
    setSuggestions([]);
    setOpen(false);
    onBlurCommit?.();
  }

  const showMenu = open && isEditable && suggestions.length > 0;
  const menu =
    showMenu && typeof document !== "undefined"
      ? createPortal(
        <ul
          id={listId}
          role="listbox"
          className="max-h-48 overflow-y-auto rounded-xl border border-black/10 bg-white py-1 shadow-lg"
          style={{
            position: "fixed",
            top: menuPos.top,
            left: menuPos.left,
            width: menuPos.width,
            zIndex: 9999,
          }}
        >
          {suggestions.map((item) => (
            <li key={`${item.displayText}-${item.selectedText}`}>
              <button
                type="button"
                className="w-full px-3 py-2.5 text-left text-sm hover:bg-neutral-100"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pickSuggestion(item)}
              >
                <span className="font-medium text-[var(--color-brand-black)]">
                  {item.selectedText}
                </span>
                <span className="mt-0.5 block text-xs text-black/50">{item.displayText}</span>
              </button>
            </li>
          ))}
        </ul>,
        document.body
      )
      : null;

  return (
    <div className="relative flex flex-col gap-1.5">
      <Label className="text-sm font-medium text-[var(--color-brand-black)]">
        {label}
        {required ? <span className="text-[var(--color-brand-error)]">*</span> : null}
      </Label>
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          const next = e.target.value;
          onChange(next, next === value ? fullLocation : next);
          scheduleSuggestions(next);
          setOpen(true);
        }}
        onFocus={() => {
          if (onFocusAttempt && !onFocusAttempt()) return;
          setOpen(true);
          scheduleSuggestions(value);
          syncMenuPos();
        }}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 250);
          onBlurCommit?.();
        }}
        disabled={!isEditable}
        placeholder={placeholder}
        className={cn(
          "h-12 rounded-xl border bg-neutral-100 px-4 text-sm font-medium",
          "focus-visible:ring-0",
          hasError
            ? "border-[var(--color-brand-error)] focus-visible:border-[var(--color-brand-error)]"
            : "border-black/15 focus-visible:border-[var(--color-brand-primary)]",
          !isEditable && "cursor-not-allowed opacity-90",
          inputClassName
        )}
      />
      {hasError && errorMessage ? (
        <p className="text-xs font-semibold text-[var(--color-brand-error)]">
          {errorMessage}
        </p>
      ) : null}
      {menu}
      {!isEditable && fullLocation && fullLocation !== value ? (
        <p className="text-xs text-black/45">{fullLocation}</p>
      ) : null}
    </div>
  );
}

