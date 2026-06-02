import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
}: ProfileFieldProps) {
  const disabled = isReadOnly || !isEditable;
  const isProfile = appearance === "profile";

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <Label
          className={cn(
            "font-medium text-[var(--color-brand-black)]",
            isProfile ? "text-sm" : "text-xs uppercase tracking-wide text-gray-500"
          )}
        >
          {label}
          {required ? (
            <span className="text-[var(--color-brand-error)]">*</span>
          ) : null}
        </Label>
      ) : null}
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={() => onBlurCommit?.()}
        placeholder={placeholder ?? label}
        disabled={disabled}
        readOnly={disabled}
        className={cn(
          "h-12 rounded-xl px-4 text-sm font-medium transition-colors",
          "focus-visible:ring-0",
          isProfile && "border border-black/15 bg-neutral-100",
          disabled
            ? isProfile
              ? "cursor-not-allowed border-black/10 bg-neutral-100 text-neutral-800"
              : "cursor-not-allowed border-transparent bg-[var(--color-brand-bg)] text-gray-500"
            : hasError
              ? "border-[var(--color-brand-error)] focus-visible:border-[var(--color-brand-error)]"
              : isProfile
                ? "border-black/15 focus-visible:border-[var(--color-brand-primary)]"
                : "border-black/20 focus-visible:border-[var(--color-brand-primary)]"
        )}
      />
      {hasError && errorMessage && (
        <p className="text-xs font-semibold text-[var(--color-brand-error)]">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

