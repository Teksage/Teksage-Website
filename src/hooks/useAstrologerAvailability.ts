import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { useAuthStore } from "@/store/auth.store";
import {
  fetchAstrologerSlots,
  createAstrologerSlots,
  availableRangesFromSlots,
  bookedRangesFromSlots,
} from "@/lib/services/astrologer-portal";
import type { AstroSlot } from "@/types/astrologer-portal";

export function useAstrologerAvailability(selectedDate: Date) {
  const user = useAuthStore((s) => s.user);
  const [slots, setSlots] = useState<AstroSlot[]>([]);
  const [selectedRanges, setSelectedRanges] = useState<Set<string>>(new Set());
  const [originalRanges, setOriginalRanges] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const dateStr = format(selectedDate, "yyyy-MM-dd");

  const loadSlots = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAstrologerSlots(user.id, dateStr);
      const available = availableRangesFromSlots(data);
      setSlots(data);
      setSelectedRanges(new Set(available));
      setOriginalRanges(new Set(available));
    } catch {
      setError("Failed to load slots.");
    } finally {
      setLoading(false);
    }
  }, [user?.id, dateStr]);

  useEffect(() => {
    loadSlots();
  }, [loadSlots]);

  const bookedRanges = bookedRangesFromSlots(slots);

  const hasChanges =
    selectedRanges.size !== originalRanges.size ||
    [...selectedRanges].some((r) => !originalRanges.has(r)) ||
    [...originalRanges].some((r) => !selectedRanges.has(r));

  const saveSlots = useCallback(async () => {
    setSaving(true);
    setSaveMessage(null);
    const payload: Array<{
      start_datetime: string;
      end_datetime: string;
      create?: boolean;
    }> = [];
    const date = dateStr;
    for (const range of selectedRanges) {
      const parts = range.split(" - ");
      if (parts.length !== 2) continue;
      payload.push({
        start_datetime: `${date}T${parts[0]}:00`,
        end_datetime: `${date}T${parts[1]}:00`,
        create: true,
      });
    }
    try {
      await createAstrologerSlots(payload);
      await loadSlots();
      setSaveMessage({ type: "success", text: "Slot Updated Successfully." });
    } catch {
      setSaveMessage({ type: "error", text: "Please try again." });
    } finally {
      setSaving(false);
    }
  }, [selectedRanges, dateStr, loadSlots]);

  return {
    slots,
    bookedRanges,
    selectedRanges,
    setSelectedRanges,
    hasChanges,
    loading,
    saving,
    error,
    saveMessage,
    setSaveMessage,
    saveSlots,
    reload: loadSlots,
  };
}
