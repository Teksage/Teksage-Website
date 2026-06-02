export interface YearlyPlanetDetails {
  year: string;
  endMonth: string;
  startMonth: string;
  beforeDetails: string;
  afterDetails: string;
}

export interface YearlyPlanetTransits {
  jupiter: YearlyPlanetDetails;
  saturn: YearlyPlanetDetails;
  rahu: YearlyPlanetDetails;
  ketu: YearlyPlanetDetails;
  currentDasa: YearlyPlanetDetails;
}

export interface YearlyCategorizedPrediction {
  career: string;
  finance: string;
  health: string;
  relationship: string;
}

export interface YearlyRemedies {
  chanting: string;
  puja: string;
  charity: string;
}

export interface YearlyPredictionDetail {
  kind: "yearly";
  general: string;
  planetTransits: YearlyPlanetTransits;
  prediction: YearlyCategorizedPrediction;
  remedies: YearlyRemedies;
  predictionId: number | null;
}
