"use client";

import { Input } from "@/components/ui/input";
import { PROFILE_DETAILS } from "@/lib/constants/profile-details";
import { cn } from "@/lib/utils";

interface ProfilePhoneRowProps {
  countryCode: string;
  mobile: string;
  onMobileChange: (value: string) => void;
  isMobileVerified?: boolean;
  isEditing: boolean;
}

export function ProfilePhoneRow({
  countryCode,
  mobile,
  onMobileChange,
  isMobileVerified,
  isEditing,
}: ProfilePhoneRowProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-[var(--color-brand-black)]">
        {PROFILE_DETAILS.phone}
      </span>
      <div
        className={cn(
          "flex h-12 items-stretch overflow-hidden rounded-xl border border-black/15 bg-neutral-100",
          "transition-colors focus-within:border-[var(--color-brand-primary)]",
          !isEditing && "opacity-90"
        )}
      >
        <div
          className={cn(
            "flex w-[4.5rem] shrink-0 items-center justify-center border-r border-black/15",
            "text-sm font-semibold text-neutral-800"
          )}
        >
          +{countryCode || "91"}
        </div>
        <Input
          type="tel"
          value={mobile}
          onChange={(e) =>
            onMobileChange(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          disabled={!isEditing}
          placeholder="Mobile"
          className={cn(
            "h-12 min-w-0 flex-1 rounded-none border-0 bg-transparent px-4 text-sm font-medium shadow-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            !isEditing && "cursor-not-allowed"
          )}
        />
        {!isMobileVerified ? (
          <>
            <div className="w-px shrink-0 self-stretch bg-black/15" aria-hidden />
            <button
              type="button"
              className="shrink-0 px-3.5 text-sm font-semibold text-[var(--color-brand-primary)] hover:bg-black/[0.04]"
              onClick={() => {
                const digits = mobile.replace(/\D/g, "");
                if (digits.length < 10) {
                  window.alert("Enter a valid 10-digit mobile number to verify.");
                  return;
                }
                window.alert("Complete mobile verification in the Teksage app.");
              }}
            >
              {PROFILE_DETAILS.verify}
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
