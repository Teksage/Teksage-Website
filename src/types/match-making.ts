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
  girl_name: string;
  boy_rashi: string;
  boy_nakshatra: string;
  girl_rashi: string;
  girl_nakshatra: string;
}
