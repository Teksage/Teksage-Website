import { isAxiosError } from "axios";

/** Mirrors Flutter `IncompleteProfileException` / horoscope `PROFILE_INCOMPLETE`. */
export const PREDICTION_PROFILE_INCOMPLETE = "PROFILE_INCOMPLETE" as const;

export function isPredictionProfileIncompleteError(error: unknown): boolean {
  if (!isAxiosError(error)) return false;
  const body = error.response?.data as { detail?: string } | undefined;
  return (
    error.response?.status === 400 &&
    body?.detail === "Profile not completed"
  );
}

export function isPredictionProfileIncompleteMessage(
  message: string | null | undefined
): boolean {
  return message === PREDICTION_PROFILE_INCOMPLETE;
}

/** Backend may return raw Python errors in `data` when profile/horoscope is missing. */
export function mapPredictionApiStringError(message: string): string {
  const trimmed = message.trim();
  if (!trimmed) return message;
  if (trimmed === PREDICTION_PROFILE_INCOMPLETE) return trimmed;
  if (trimmed.includes("Profile not completed")) {
    return PREDICTION_PROFILE_INCOMPLETE;
  }
  if (/NoneType.*has no attribute/i.test(trimmed)) {
    const profileFields = [
      "horoscope_id",
      "date_of_birth",
      "nakshatra",
      "rashi",
      "dasa_bukti",
      "horoscope_details",
    ];
    if (profileFields.some((field) => trimmed.includes(field))) {
      return PREDICTION_PROFILE_INCOMPLETE;
    }
  }
  return message;
}

export function predictionErrorMessage(error: unknown): string {
  if (isPredictionProfileIncompleteError(error)) {
    return PREDICTION_PROFILE_INCOMPLETE;
  }
  if (isAxiosError(error)) {
    const body = error.response?.data as { detail?: string; data?: string } | undefined;
    if (typeof body?.detail === "string") {
      return mapPredictionApiStringError(body.detail);
    }
    if (typeof body?.data === "string") {
      return mapPredictionApiStringError(body.data);
    }
  }
  if (error instanceof Error) return mapPredictionApiStringError(error.message);
  return "Request failed";
}
