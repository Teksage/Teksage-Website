import { DASHBOARD_ASSETS } from "@/lib/constants/assets";
import { HOME_DASHBOARD } from "@/lib/constants/home-dashboard";
import { ROUTES } from "@/lib/constants/routes";

export const PREDICTION_CIRCLE_LINKS = [
  {
    label: HOME_DASHBOARD.weeklyPrediction,
    href: ROUTES.predictionsWeekly,
    src: DASHBOARD_ASSETS.weeklyIcon,
  },
  {
    label: HOME_DASHBOARD.yearlyPrediction,
    href: ROUTES.predictionsYearly,
    src: DASHBOARD_ASSETS.yearlyIcon,
  },
  {
    label: HOME_DASHBOARD.lifePrediction,
    href: ROUTES.predictionsLife,
    src: DASHBOARD_ASSETS.lifeIcon,
  },
] as const;
