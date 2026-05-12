"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import {
  SETTINGS_PLACEHOLDER_SLUGS,
  SETTINGS_SCREEN,
  SETTINGS_SECTION_TITLE,
  SETTINGS_SHELL_GRADIENT_CLASS,
  type SettingsPlaceholderSlug,
} from "@/lib/constants/settings-screen";
import { cn } from "@/lib/utils";

function isPlaceholderSlug(s: string): s is SettingsPlaceholderSlug {
  return (SETTINGS_PLACEHOLDER_SLUGS as readonly string[]).includes(s);
}

export default function SettingsSectionPlaceholderPage() {
  const router = useRouter();
  const params = useParams();
  const raw = params.section;
  const section = typeof raw === "string" ? raw : "";
  if (!isPlaceholderSlug(section)) notFound();

  const title = SETTINGS_SECTION_TITLE[section];

  return (
    <div
      className={cn(
        "flex min-h-dvh flex-col",
        SETTINGS_SHELL_GRADIENT_CLASS
      )}
    >
      <AppHeader
        title={title}
        blend
        showBack
        onBackClick={() => router.back()}
      />

      <div className="mx-auto w-full max-w-lg flex-1 px-5 pb-28 pt-8">
        <div className="rounded-2xl border border-black/[0.06] bg-white/90 px-5 py-8 shadow-sm">
          <p className="text-lg font-semibold text-neutral-900">
            {SETTINGS_SCREEN.placeholderLead}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600">
            {SETTINGS_SCREEN.placeholderHint}
          </p>
        </div>
      </div>
    </div>
  );
}
