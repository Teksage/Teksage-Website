import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ProfileFieldProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: "text" | "email" | "tel" | "date" | "time";
  placeholder?: string;
  isEditable?: boolean;
  isReadOnly?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
}

export function ProfileField({
  label,
  value = "",
  onChange,
  type = "text",
  placeholder,
  isEditable = true,
  isReadOnly = false,
  hasError = false,
  errorMessage,
  className,
}: ProfileFieldProps) {
  const disabled = isReadOnly || !isEditable;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {label}
      </Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder ?? label}
        disabled={disabled}
        className={cn(
          "h-12 rounded-xl text-sm font-semibold px-4 transition-colors",
          "focus-visible:ring-0",
          disabled
            ? "bg-[var(--color-brand-bg)] border-transparent text-gray-500 cursor-not-allowed"
            : hasError
            ? "border-[var(--color-brand-error)] focus-visible:border-[var(--color-brand-error)]"
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
