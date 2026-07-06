/**
 * Backend `chart.py` returns a full HTML document. The website iframe shell must
 * receive only styles + body markup — nesting another document drops grid CSS
 * and breaks planet positioning.
 */
export function unwrapHoroscopeChartHtml(fullHtml: string): string {
  const trimmed = fullHtml?.trim() ?? "";
  if (!trimmed) return "";
  if (!/<html[\s>]/i.test(trimmed)) return trimmed;

  const styleBlocks: string[] = [];
  const styleRegex = /<style[^>]*>[\s\S]*?<\/style>/gi;
  let match: RegExpExecArray | null;
  while ((match = styleRegex.exec(trimmed)) !== null) {
    styleBlocks.push(match[0]);
  }

  const bodyMatch = trimmed.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyInner = bodyMatch?.[1]?.trim() ?? trimmed;

  return `${styleBlocks.join("\n")}${bodyInner}`;
}
