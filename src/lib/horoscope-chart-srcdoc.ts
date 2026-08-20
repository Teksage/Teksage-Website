import { COLORS } from "@/lib/constants/colors";
import { HOROSCOPE_CHART_FRAME } from "@/lib/constants/horoscope-chart-frame";
import { unwrapHoroscopeChartHtml } from "@/lib/horoscope-chart-html";

/** Wraps chart HTML from the API for `iframe srcDoc` (mirrors Flutter `ChartWidget` shell). */
export function buildHoroscopeChartSrcDoc(htmlFragment: string): string {
  const bg = COLORS.whiteColor;
  const pad = HOROSCOPE_CHART_FRAME.srcDocPaddingPx;
  const msg = HOROSCOPE_CHART_FRAME.resizeMessageType;
  const chartMarkup = unwrapHoroscopeChartHtml(htmlFragment);
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><style>html,body{margin:0;padding:0;background:${bg};height:auto;}body{box-sizing:border-box;padding:${pad}px;}br{display:none;}.rasi_chart{width:100%!important;max-width:100%!important;min-width:0!important;margin:0 auto;box-sizing:border-box;}</style></head><body>${chartMarkup}<script>(function(){var t="${msg}";function p(){var el=document.querySelector(".rasi_chart");var h=el?Math.ceil(el.getBoundingClientRect().height)+${pad}*2:Math.ceil(document.body.scrollHeight);if(h>0)parent.postMessage({type:t,height:h},"*");}if(document.readyState==="complete")p();else addEventListener("load",p);if(typeof ResizeObserver!=="undefined"){var n=document.querySelector(".rasi_chart")||document.body;new ResizeObserver(p).observe(n);}})();</script></body></html>`;
}
