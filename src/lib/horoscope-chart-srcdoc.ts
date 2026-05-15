import { COLORS } from "@/lib/constants/colors";

/** Wraps chart HTML from the API for `iframe srcDoc` (mirrors Flutter `ChartWidget` shell). */
export function buildHoroscopeChartSrcDoc(htmlFragment: string): string {
  const bg = COLORS.whiteColor;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><style>body{margin:0;background:${bg};padding:8px;}</style></head><body>${htmlFragment}</body></html>`;
}
