/** Query flag so mobile WebView can hide site chrome. */

export const WEB_EMBED = {
  queryKey: "embed",
  queryValue: "1",
} as const;

export function isWebEmbedParam(value: string | null | undefined): boolean {
  return value === WEB_EMBED.queryValue;
}
