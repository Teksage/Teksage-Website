import { COLORS } from "@/lib/constants/colors";
import { HOROSCOPE_CHART_FRAME } from "@/lib/constants/horoscope-chart-frame";

/** Wraps chart HTML from the API for `iframe srcDoc` (mirrors Flutter `ChartWidget` shell). */
export function buildHoroscopeChartSrcDoc(htmlFragment: string): string {
  const bg = COLORS.whiteColor;
  const pad = HOROSCOPE_CHART_FRAME.srcDocPaddingPx;
  const msg = HOROSCOPE_CHART_FRAME.resizeMessageType;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><style>html,body{margin:0;background:${bg};}body{display:flex;align-items:center;justify-content:center;padding:${pad}px;box-sizing:border-box;}body table,body svg,body>div{display:block;margin:0 auto;max-width:100%;height:auto;}</style></head><body>${htmlFragment}<script>(function(){var t="${msg}";function p(){var h=Math.ceil(document.documentElement.getBoundingClientRect().height);if(h>0)parent.postMessage({type:t,height:h},"*");}if(document.readyState==="complete")p();else addEventListener("load",p);if(typeof ResizeObserver!=="undefined")new ResizeObserver(p).observe(document.body);})();</script></body></html>`;
}
