import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DASHBOARD_ASSETS, HOME_DASHBOARD, HOME_LAYOUT } from "@/lib/constants";

const PREDICTION_ICONS: { label: string; href: string; src: string }[] = [
  {
    label: HOME_DASHBOARD.weeklyPrediction,
    href: "/predictions/weekly",
    src: DASHBOARD_ASSETS.weeklyIcon,
  },
  {
    label: HOME_DASHBOARD.yearlyPrediction,
    href: "/predictions/yearly",
    src: DASHBOARD_ASSETS.yearlyIcon,
  },
  {
    label: HOME_DASHBOARD.lifePrediction,
    href: "/predictions/life",
    src: DASHBOARD_ASSETS.lifeIcon,
  },
];

interface PredictionCirclesProps {
  isLoggedIn: boolean;
  className?: string;
}

function HomeRuleLine() {
  return (
    <Image
      src={DASHBOARD_ASSETS.homeLine}
      alt=""
      width={77}
      height={1}
      unoptimized
      className="h-px min-h-px min-w-[2rem] flex-1 object-cover opacity-40"
    />
  );
}

export function PredictionCircles({ isLoggedIn, className }: PredictionCirclesProps) {
  return (
    <div className={cn("flex flex-col", HOME_LAYOUT.exploreSectionGap, className)}>
      <div className="flex items-center gap-2 sm:gap-3">
        <HomeRuleLine />
        <span
          className={cn(
            "whitespace-nowrap text-sm font-semibold sm:text-[0.9375rem]",
            "text-[color:var(--color-brand-panchang)]"
          )}
        >
          {HOME_DASHBOARD.explorePredictionsTitle}
        </span>
        <HomeRuleLine />
      </div>

      <div className="flex justify-between gap-2 px-0 sm:gap-3 sm:px-1">
        {PREDICTION_ICONS.map((item) => (
          <Link
            key={item.label}
            href={isLoggedIn ? item.href : "/login"}
            className="flex max-w-[33%] flex-1 flex-col items-center gap-2"
          >
            <div
              className={cn(
                "flex w-full max-w-[5.75rem] justify-center drop-shadow-[0_6px_20px_rgba(0,0,0,0.12)]",
                "transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              <Image
                src={item.src}
                alt=""
                width={95}
                height={94}
                unoptimized
                className="h-[5.5rem] w-auto max-w-full object-contain"
              />
            </div>
            <span className="text-center text-xs font-semibold leading-snug text-neutral-700 sm:text-[0.8125rem]">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
