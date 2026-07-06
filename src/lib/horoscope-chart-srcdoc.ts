import { COLORS } from "@/lib/constants/colors";
import { HOROSCOPE_CHART_FRAME } from "@/lib/constants/horoscope-chart-frame";
import { unwrapHoroscopeChartHtml } from "@/lib/horoscope-chart-html";

/** Wraps chart HTML from the API for `iframe srcDoc` (mirrors Flutter `ChartWidget` shell). */
export function buildHoroscopeChartSrcDoc(htmlFragment: string): string {
  const bg = COLORS.whiteColor;
  const pad = HOROSCOPE_CHART_FRAME.srcDocPaddingPx;
  const minH = HOROSCOPE_CHART_FRAME.frameHeightPx;
  const msg = HOROSCOPE_CHART_FRAME.resizeMessageType;
  const chartMarkup = unwrapHoroscopeChartHtml(htmlFragment);
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><style>html,body{margin:0;background:${bg};}body{display:flex;align-items:center;justify-content:center;padding:${pad}px;box-sizing:border-box;}.rasi_chart{width:100%!important;max-width:100%!important;min-width:0!important;margin:0 auto;box-sizing:border-box;}</style></head><body>${chartMarkup}<script>(function(){var t="${msg}",m=${minH};function p(){var h=Math.ceil(document.body.scrollHeight);if(h>0)parent.postMessage({type:t,height:Math.max(h,m)},"*");}if(document.readyState==="complete")p();else addEventListener("load",p);if(typeof ResizeObserver!=="undefined")new ResizeObserver(p).observe(document.body);})();</script></body></html>`;
}
