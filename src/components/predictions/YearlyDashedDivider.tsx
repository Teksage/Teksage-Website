import { YEARLY_PREDICTION_ASSETS } from "@/lib/constants/prediction-assets";

export function YearlyDashedDivider() {
  return (
    <img
      src={YEARLY_PREDICTION_ASSETS.dashedLine}
      alt=""
      className="mx-auto w-full max-w-md brightness-0 invert"
    />
  );
}
