import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PROFILE_FIELD_UI as FU } from "@/lib/constants/profile-details";
import { cn } from "@/lib/utils";
import type { ProfileFieldProps } from "@/types";

export function ProfileField({
  label,
  value = "",
  onChange,
  type = "text",
  placeholder,
  isEditable = true,
  isReadOnly = false,
  required = false,
  appearance = "default",
  hasError = false,
  errorMessage,
  className,
  onBlurCommit,
  onFocusAttempt,
}: ProfileFieldProps) {
  const disabled = isReadOnly || !isEditable;
  const isProfile = appearance === "profile";

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <Label
          className={cn(
            isProfile
              ? FU.label
              : "text-xs font-medium uppercase tracking-wide text-gray-500"
          )}
        >
          {label}
          {required ? <span className={FU.labelRequired}>*</span> : null}
        </Label>
      ) : null}
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={(e) => {
          if (onFocusAttempt && !onFocusAttempt()) {
            e.target.blur();
          }
        }}
        onBlur={() => onBlurCommit?.()}
        placeholder={placeholder ?? label}
        disabled={disabled}
        readOnly={disabled}
        className={cn(
          FU.inputBase,
          isProfile
            ? disabled
              ? FU.inputDisabled
              : hasError
                ? FU.inputError
                : FU.inputIdle
            : disabled
              ? "cursor-not-allowed border-transparent bg-[var(--color-brand-bg)] text-gray-500"
              : hasError
                ? "border-[var(--color-brand-error)] focus-visible:border-[var(--color-brand-error)]"
                : "border-black/20 focus-visible:border-[var(--color-brand-primary)]"
        )}
      />
      {hasError && errorMessage ? (
        <p className={FU.errorText}>{errorMessage}</p>
      ) : null}
    </div>
  );
}
