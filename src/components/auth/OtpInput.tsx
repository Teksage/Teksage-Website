"use client";

import { useRef, KeyboardEvent, ClipboardEvent } from "react";
import { cn } from "@/lib/utils";
import { AUTH_SCREEN, OTP_LENGTH } from "@/lib/constants";
import type { OtpInputProps } from "@/types";

export function OtpInput({ value, onChange, hasError, className }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const cells = Array.from({ length: OTP_LENGTH }, (_, i) => value[i] ?? "");

  function handleChange(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    if (raw !== "" && digit === "") return;
    const next = [...cells];
    next[index] = digit;
    onChange(next);
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Backspace") return;
    e.preventDefault();
    if (cells[index]) {
      const next = [...cells];
      next[index] = "";
      onChange(next);
      return;
    }
    if (index > 0) {
      inputRefs.current[index - 1]?.focus();
      const next = [...cells];
      next[index - 1] = "";
      onChange(next);
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = Array.from({ length: OTP_LENGTH }, (_, i) => pasted[i] ?? "");
    onChange(next);
    inputRefs.current[Math.min(Math.max(pasted.length - 1, 0), OTP_LENGTH - 1)]?.focus();
  }

  return (
    <div className={cn(AUTH_SCREEN.otpRowClassName, className)}>
      {Array.from({ length: OTP_LENGTH }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          autoComplete="one-time-code"
          value={cells[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            AUTH_SCREEN.otpCellClassName,
            hasError
              ? AUTH_SCREEN.otpCellErrorClassName
              : cells[index]
                ? AUTH_SCREEN.otpCellFilledClassName
                : AUTH_SCREEN.otpCellIdleClassName
          )}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
