import { isAxiosError } from "axios";

/** Extract FastAPI `detail` / `error` message for profile save failures. */
export function messageFromProfileApiError(error: unknown): string | null {
  if (!isAxiosError(error)) return null;
  const data = error.response?.data;
  if (data == null) return null;
  if (typeof data === "string") return data;
  if (typeof data === "object" && !Array.isArray(data)) {
    const row = data as Record<string, unknown>;
    if (typeof row.detail === "string") return row.detail;
    if (typeof row.error === "string") return row.error;
    if (typeof row.data === "string" && row.data.trim()) return row.data;
    if (Array.isArray(row.detail) && row.detail[0]) {
      const first = row.detail[0] as Record<string, unknown>;
      if (typeof first.msg === "string") return first.msg;
    }
  }
  return null;
}
