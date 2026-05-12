import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  name?: string;
  avatarUrl?: string;
  isPremium?: boolean;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function ProfileAvatar({
  name,
  avatarUrl,
  isPremium = false,
  className,
}: ProfileAvatarProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3 py-6", className)}>
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[var(--color-brand-primary)]/30 bg-gray-100 flex items-center justify-center">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={name ?? "Profile"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-bold text-[var(--color-brand-primary)]">
              {name ? getInitials(name) : "?"}
            </span>
          )}
        </div>
        {isPremium && (
          <span className="absolute -top-1 -right-1 text-lg" title="Premium">
            ⭐
          </span>
        )}
      </div>

      {name && (
        <p className="text-lg font-bold text-gray-900">{name}</p>
      )}

      {isPremium && (
        <span className="px-3 py-1 rounded-full bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] text-xs font-semibold">
          Premium Member
        </span>
      )}
    </div>
  );
}
