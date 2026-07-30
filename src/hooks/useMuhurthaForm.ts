"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18nConstants } from "@/hooks/useT";
import { useMuhurthaAccess } from "@/hooks/useMuhurthaAccess";
import { MUHURTHA_SCREEN } from "@/lib/constants/muhurtha-screen";
import { isMuhurthaStartDateAllowed } from "@/lib/muhurtha-date-range";
import { buildEventPlannerResultsPath } from "@/lib/muhurtha-route";
import { toIsoDate } from "@/lib/panchang-calendar";
import type { MuhurthaEventType } from "@/types/muhurtha";

export function useMuhurthaForm() {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const router = useRouter();
  const { user, maySearch } = useMuhurthaAccess();

  const [event, setEvent] = useState<MuhurthaEventType>("Travel");
  const [startDate, setStartDate] = useState(() => toIsoDate(new Date()));
  const [location, setLocation] = useState("");
  const [locationFull, setLocationFull] = useState("");
  const [locationError, setLocationError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  useEffect(() => {
    const preferred = user?.preferredLocation?.trim() ?? "";
    if (!preferred) return;
    setLocation((current) => (current.trim() ? current : preferred));
    setLocationFull((current) => (current.trim() ? current : preferred));
  }, [user?.preferredLocation]);

  const onLocationChange = useCallback((selected: string, full: string) => {
    setLocation(selected);
    setLocationFull(full);
    setLocationError(null);
  }, []);

  const onStartDateChange = useCallback((value: string) => {
    setStartDate(value);
    setDateError(null);
  }, []);

  const submit = useCallback(() => {
    if (!maySearch) return;
    if (!isMuhurthaStartDateAllowed(startDate)) {
      setDateError(M.startDateOutOfRange);
      return;
    }
    const scanLocation = (locationFull || location).trim();
    if (!scanLocation) {
      setLocationError(M.locationRequired);
      return;
    }
    setLocationError(null);
    setDateError(null);
    router.push(
      buildEventPlannerResultsPath({
        event,
        startDate,
        location: scanLocation,
      })
    );
  }, [
    M.locationRequired,
    M.startDateOutOfRange,
    event,
    location,
    locationFull,
    maySearch,
    router,
    startDate,
  ]);

  return {
    event,
    setEvent,
    startDate,
    setStartDate: onStartDateChange,
    location,
    locationFull,
    locationError,
    dateError,
    onLocationChange,
    submit,
  };
}
