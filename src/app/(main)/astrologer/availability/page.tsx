"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { AstrologerAvailability } from "@/components/astrologer/AstrologerAvailability";
import { useAstrologerAvailability } from "@/hooks/useAstrologerAvailability";
import { ROUTES } from "@/lib/constants/routes";
import { ASTRO_PORTAL_UI, ASTRO_PORTAL_COLORS } from "@/lib/constants/astrologer-portal";

export default function AstrologerAvailabilityPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [isEdit, setIsEdit] = useState(false);
  const availability = useAstrologerAvailability(selectedDate);

  const handleEditSave = useCallback(async () => {
    if (!isEdit) {
      setIsEdit(true);
      return;
    }
    if (!availability.hasChanges) {
      setIsEdit(false);
      return;
    }
    const ok = await availability.saveSlots();
    if (ok) setIsEdit(false);
  }, [availability, isEdit]);

  const editSaveLabel = availability.saving
    ? ASTRO_PORTAL_UI.avail.savingLabel
    : isEdit
      ? ASTRO_PORTAL_UI.avail.saveLabel
      : ASTRO_PORTAL_UI.avail.editLabel;

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AppHeader
        title={ASTRO_PORTAL_UI.availabilityTitle}
        showBack
        onBackClick={() => router.push(ROUTES.astrologer)}
        action={
          <button
            type="button"
            onClick={handleEditSave}
            disabled={availability.saving}
            className="px-1 text-lg font-semibold leading-none transition-opacity hover:opacity-80 disabled:opacity-50"
            style={{ color: ASTRO_PORTAL_COLORS.brandGreen }}
          >
            {editSaveLabel}
          </button>
        }
      />
      <div className="mx-auto w-full max-w-2xl flex-1">
        <AstrologerAvailability
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          isEdit={isEdit}
          onEditChange={setIsEdit}
          availability={availability}
        />
      </div>
    </div>
  );
}
