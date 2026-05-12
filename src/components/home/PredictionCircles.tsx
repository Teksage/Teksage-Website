import Link from "next/link";
import { cn } from "@/lib/utils";

interface PredictionItem {
  label: string;
  href: string;
  emoji: string;
  bgColor: string;
  textColor: string;
}

const PREDICTION_ITEMS: PredictionItem[] = [
  {
    label: "Weekly",
    href: "/predictions/weekly",
    emoji: "📅",
    bgColor: "#61CC95",
    textColor: "#ffffff",
  },
  {
    label: "Yearly",
    href: "/predictions/yearly",
    emoji: "🌟",
    bgColor: "#EF8B8B",
    textColor: "#ffffff",
  },
  {
    label: "Life",
    href: "/predictions/life",
    emoji: "✨",
    bgColor: "#9754F6",
    textColor: "#ffffff",
  },
];

interface PredictionCirclesProps {
  isLoggedIn: boolean;
  className?: string;
}

export function PredictionCircles({ isLoggedIn, className }: PredictionCirclesProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
          Explore Other Predictions
        </span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* 3 prediction circles */}
      <div className="flex justify-around">
        {PREDICTION_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={isLoggedIn ? item.href : "/login"}
            className="flex flex-col items-center gap-2 group"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-md transition-transform group-hover:scale-105"
              style={{ backgroundColor: item.bgColor }}
            >
              <span className="text-3xl" role="img" aria-label={item.label}>
                {item.emoji}
              </span>
            </div>
            <span className="text-xs font-semibold text-gray-600">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
