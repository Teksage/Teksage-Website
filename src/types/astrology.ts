/** API-aligned shapes — mirrors Flutter `panchang_model.dart` / `horoscope_model.dart`. */

export interface PanchangSegment {
  name?: string;
  endTime?: string;
  next?: string;
}

export interface PanchangKarnaArm {
  name?: string;
  endTime?: string;
}

export interface PanchangKarna {
  first?: PanchangKarnaArm;
  second?: PanchangKarnaArm;
}

export interface PanchangDetail {
  time?: string;
  date?: string;
  weekday?: string;
  eng_weekday?: string;
  timeZoneId?: string;
  sunrise?: string;
  sunset?: string;
  paksha?: string;
  rahuKala?: string;
  yamaKanda?: string;
  thara_bala?: number;
  chandra_bala?: number;
  thara_bala_is_positive?: boolean;
  chandra_bala_is_positive?: boolean;
  auspiciousTime?: string[];
  nakshathra?: PanchangSegment;
  thithi?: PanchangSegment;
  yoga?: PanchangSegment;
  karna?: PanchangKarna;
  amirthathiYoga?: PanchangSegment;
}

export interface PanchangPayload {
  panchangId: number;
  panchang: PanchangDetail;
}

export interface HoroscopePayload {
  first_name?: string;
  last_name?: string;
  preferred_location?: string;
  date_of_birth?: string;
  time_of_birth?: string;
  birth_location?: string;
  rashi?: string;
  nakshatra?: string;
  lagna?: string;
  rashi_chart?: string;
  navamsa_chart?: string;
  rasi_chart_label?: string;
  navamsa_chart_label?: string;
}

export interface HoroscopeDivisionalChart {
  id: string;
  label: string;
  html: string;
}

export interface HoroscopeChartsPayload {
  charts: HoroscopeDivisionalChart[];
}

/** Parsed `current_dasa` line from profile API (`current_dasa_summary`). */
export interface CurrentDasaSummary {
  dasa: string;
  bukti: string;
  label: string;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  raw?: string;
}
