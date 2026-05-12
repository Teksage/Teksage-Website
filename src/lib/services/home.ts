import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { Notification } from "@/types";

export interface DailyPredictionSummary {
  tharaBala?: string;
  chandraBala?: string;
}

export async function fetchDailyPredictionSummary(): Promise<DailyPredictionSummary> {
  const { data } = await http.get<DailyPredictionSummary>(
    API_ENDPOINTS.dailyPrediction
  );
  return data;
}

export async function fetchNotifications(): Promise<Notification[]> {
  const { data } = await http.get<Notification[]>(API_ENDPOINTS.notifications);
  return data;
}
