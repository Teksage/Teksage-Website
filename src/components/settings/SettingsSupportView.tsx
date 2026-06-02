"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useState } from "react";
import { SETTINGS_SUPPORT_COPY } from "@/lib/constants/settings-support";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import { showErrorAppSnackBar, showSuccessAppSnackBar } from "@/lib/app-snackbar";
import { submitSupportQuery } from "@/lib/services/settings-support";
import { cn } from "@/lib/utils";

export function SettingsSupportView() {
  const SU = useI18nConstants(SETTINGS_SUPPORT_COPY);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canSubmit = query.trim().length > 0 && !busy;

  async function onSubmit() {
    const trimmed = query.trim();
    if (!trimmed) {
      setError(SU.emptyError);
      return;
    }
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      await submitSupportQuery(trimmed);
      showSuccessAppSnackBar(SU.success);
      setQuery("");
    } catch {
      setError(SU.failed);
      showErrorAppSnackBar(SU.failed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className={cn(
        SETTINGS_UI.contentPad,
        "relative z-10 flex min-h-0 flex-1 flex-col bg-white pb-8 pt-10"
      )}
    >
      <p className={cn(SETTINGS_UI.supportLead, "whitespace-pre-line")}>
        {SU.lead}
      </p>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        rows={6}
        placeholder={SU.placeholder}
        className={SETTINGS_UI.supportTextarea}
      />
      {error ? (
        <p className="mt-2 text-sm text-[var(--color-brand-error)]">{error}</p>
      ) : null}
      {message ? (
        <p className="mt-2 text-sm text-[var(--color-brand-primary)]">{message}</p>
      ) : null}
      <button
        type="button"
        disabled={!canSubmit}
        className={cn(SETTINGS_UI.supportSubmit, "mt-8")}
        onClick={() => void onSubmit()}
      >
        {busy ? SU.submitting : SU.submit}
      </button>
    </div>
  );
}

