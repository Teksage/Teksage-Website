import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { persistAppLanguage } from "@/lib/settings-language-storage";

/** Flutter `AuthService.updateAppLanguage` → POST `/api/auth/update-app-language`. */
export async function updateAppLanguage(backendName: string): Promise<string> {
  const { data } = await http.post<{ app_language?: string }>(
    API_ENDPOINTS.updateAppLanguage,
    { app_language: backendName }
  );
  const saved = (data?.app_language ?? backendName).toLowerCase();
  persistAppLanguage(saved);
  return saved;
}
