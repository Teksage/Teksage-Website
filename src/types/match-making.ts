export interface RashiOption {
  id: number;
  name: string;
}

export interface NakshatraOption {
  id: number;
  name: string;
  signs: number[];
}

export interface MatchMakingKutaRow {
  kuta?: string;
  max?: number;
  gained?: number;
  details?: string;
  present?: boolean;
}

export interface MatchMakingResult {
  general_details?: string;
  kutas?: MatchMakingKutaRow[];
  gained?: number;
  max_score?: number;
}

export interface MatchMakingExisting {
  matchMakingId: number;
  boyName: string;
  girlName: string;
  boyRashi: string;
  boyNakshatra: string;
  girlRashi: string;
  girlNakshatra: string;
  result: MatchMakingResult;
}

export interface CompatibilityFormValues {
  boy_name: string;
  boy_date_of_birth: string;
  boy_time_of_birth: string;
  boy_birth_location: string;
  girl_name: string;
  girl_date_of_birth: string;
  girl_time_of_birth: string;
  girl_birth_location: string;
}

export type MatchMakingPartnerBirthFields = {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  birthLocationFull: string;
};
