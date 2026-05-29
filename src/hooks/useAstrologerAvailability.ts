import { useState, useEffect, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useAuthStore } from "@/store/auth.store";
import {
  buildSlotsPayload,
  cloneSet,
  collectChangedDates,
  datesWithSlotMarkers,
  type SlotsByDate,
} from "@/lib/astrologer-availability-state";
import {
  fetchAstrologerSlots,
  createAstrologerSlots,
  availableRangesFromSlots,
  bookedRangesFromSlots,
} from "@/lib/services/astrologer-portal";
import { ASTRO_PORTAL_UI } from "@/lib/constants/astrologer-portal";

export function useAstrologerAvailability(selectedDate: Date) {
  const user = useAuthStore((s) => s.user);
  const dateStr = format(selectedDate, "yyyy-MM-dd");

  const [draftByDate, setDraftByDate] = useState<SlotsByDate>({});
  const [originalByDate, setOriginalByDate] = useState<SlotsByDate>({});
  const [bookedByDate, setBookedByDate] = useState<SlotsByDate>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const selectedRanges = useMemo(
    () => draftByDate[dateStr] ?? new Set<string>(),
    [draftByDate, dateStr]
  );

  const bookedRanges = useMemo(
    () => bookedByDate[dateStr] ?? new Set<string>(),
    [bookedByDate, dateStr]
  );

  const markedDates = useMemo(
    () => datesWithSlotMarkers(draftByDate, originalByDate, bookedByDate),
    [draftByDate, originalByDate, bookedByDate]
  );

  const hasChanges = useMemo(
    () => collectChangedDates(draftByDate, originalByDate).length > 0,
    [draftByDate, originalByDate]
  );

  const loadDate = useCallback(
    async (targetDate: string, options?: { syncDraftFromServer?: boolean }) => {
      if (!user?.id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAstrologerSlots(user.id, targetDate);
        const available = availableRangesFromSlots(data);
        const booked = bookedRangesFromSlots(data);

        setBookedByDate((prev) => ({ ...prev, [targetDate]: booked }));
        setOriginalByDate((prev) => ({ ...prev, [targetDate]: cloneSet(available) }));

        setDraftByDate((prev) => {
          if (!options?.syncDraftFromServer && prev[targetDate]) return prev;
          return { ...prev, [targetDate]: cloneSet(available) };
        });
      } catch {
        setError("Failed to load slots.");
      } finally {
        setLoading(false);
      }
    },
    [user?.id]
  );

  useEffect(() => {
    void loadDate(dateStr);
  }, [dateStr, loadDate]);

  const setSelectedRanges = useCallback(
    (updater: Set<string> | ((prev: Set<string>) => Set<string>)) => {
      setDraftByDate((prev) => {
        const current = prev[dateStr] ?? new Set<string>();
        const next =
          typeof updater === "function"
            ? (updater as (p: Set<string>) => Set<string>)(current)
            : updater;
        return { ...prev, [dateStr]: next };
      });
      setSaveMessage(null);
    },
    [dateStr]
  );

  const saveSlots = useCallback(async (): Promise<boolean> => {
    const changedDates = collectChangedDates(draftByDate, originalByDate);
    if (changedDates.length === 0) return true;

    setSaving(true);
    setSaveMessage(null);
    const payload = buildSlotsPayload(draftByDate, changedDates);

    try {
      await createAstrologerSlots(payload);
      setOriginalByDate((prev) => {
        const next = { ...prev };
        for (const d of changedDates) {
          next[d] = cloneSet(draftByDate[d] ?? new Set());
        }
        return next;
      });
      await loadDate(dateStr, { syncDraftFromServer: true });
      setSaveMessage({ type: "success", text: ASTRO_PORTAL_UI.avail.saveSuccess });
      return true;
    } catch {
      setSaveMessage({ type: "error", text: ASTRO_PORTAL_UI.avail.saveFail });
      return false;
    } finally {
      setSaving(false);
    }
  }, [draftByDate, originalByDate, dateStr, loadDate]);

  return {
    bookedRanges,
    selectedRanges,
    setSelectedRanges,
    markedDates,
    hasChanges,
    loading,
    saving,
    error,
    saveMessage,
    setSaveMessage,
    saveSlots,
  };
}
