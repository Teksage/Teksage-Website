/** Allowed remote hosts for same-origin voice audio proxy. */
export const VOICE_AUDIO_PROXY_ALLOWED_HOSTS = [
  "astroprompt.s3.amazonaws.com",
  "astroprompt.s3.ap-south-1.amazonaws.com",
] as const;

export function isVoiceAudioProxyAllowed(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    return VOICE_AUDIO_PROXY_ALLOWED_HOSTS.includes(
      parsed.hostname as (typeof VOICE_AUDIO_PROXY_ALLOWED_HOSTS)[number]
    );
  } catch {
    return false;
  }
}

export function voiceAudioProxyPath(remoteUrl: string): string {
  return `/api/proxy-audio?url=${encodeURIComponent(remoteUrl)}`;
}

export function resolveVoicePlaybackUrl(src: string): string {
  if (src.startsWith("blob:") || src.startsWith("/")) return src;
  if (isVoiceAudioProxyAllowed(src)) return voiceAudioProxyPath(src);
  return src;
}
