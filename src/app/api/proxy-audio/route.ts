import { isVoiceAudioProxyAllowed } from "@/lib/voice-audio-proxy";

export async function GET(request: Request) {
  const remoteUrl = new URL(request.url).searchParams.get("url");
  if (!remoteUrl || !isVoiceAudioProxyAllowed(remoteUrl)) {
    return new Response("Invalid audio URL", { status: 400 });
  }

  const upstream = await fetch(remoteUrl);
  if (!upstream.ok) {
    return new Response("Upstream audio fetch failed", { status: upstream.status });
  }

  const contentType = upstream.headers.get("Content-Type") ?? "audio/webm";

  return new Response(upstream.body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
