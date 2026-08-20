import type { HoroscopeDivisionalChart, HoroscopePayload } from "@/types";
import { HOROSCOPE_SCREEN } from "@/lib/constants/horoscope-screen";

export function fallbackHoroscopeCharts(
  data: HoroscopePayload
): HoroscopeDivisionalChart[] {
  const rows: HoroscopeDivisionalChart[] = [
    {
      id: "d1",
      label: data.rasi_chart_label ?? HOROSCOPE_SCREEN.chartFallbackRasi,
      html: data.rashi_chart ?? "",
    },
    {
      id: "d9",
      label: data.navamsa_chart_label ?? HOROSCOPE_SCREEN.chartFallbackNavamsa,
      html: data.navamsa_chart ?? "",
    },
  ];
  return rows.filter((row) => row.html.trim().length > 0);
}
