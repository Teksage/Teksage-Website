import { COLORS } from "@/lib/constants/colors";
import { HOROSCOPE_CHART_FRAME } from "@/lib/constants/horoscope-chart-frame";
import { unwrapHoroscopeChartHtml } from "@/lib/horoscope-chart-html";

/** Wraps chart HTML from the API for `iframe srcDoc` (square South-Indian grid). */
export function buildHoroscopeChartSrcDoc(htmlFragment: string): string {
  const bg = COLORS.whiteColor;
  const pad = HOROSCOPE_CHART_FRAME.srcDocPaddingPx;
  const msg = HOROSCOPE_CHART_FRAME.resizeMessageType;
  const chartMarkup = unwrapHoroscopeChartHtml(htmlFragment);
  const squareCss = [
    "html,body{margin:0;padding:0;background:" + bg + ";height:100%;width:100%;overflow:hidden;}",
    "body{box-sizing:border-box;padding:" + pad + "px;height:100%;display:flex;align-items:center;justify-content:center;}",
    "br{display:none;}",
    ".rasi_chart{width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;min-width:0!important;min-height:0!important;aspect-ratio:1/1;margin:0 auto;box-sizing:border-box;",
    "display:grid!important;grid-template-columns:repeat(4,1fr)!important;grid-template-rows:repeat(4,1fr)!important;gap:3px!important;}",
    ".rasi_chart .container,.rasi_chart>div{min-height:0!important;min-width:0!important;height:100%;overflow:hidden;}",
  ].join("");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><style>${squareCss}</style></head><body>${chartMarkup}<script>(function(){var t="${msg}";function p(){var w=Math.ceil(document.documentElement.clientWidth||0);if(w>0)parent.postMessage({type:t,height:w},"*");}if(document.readyState==="complete")p();else addEventListener("load",p);addEventListener("resize",p);})();</script></body></html>`;
}
