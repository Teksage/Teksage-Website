function readFiniteDuration(audio: HTMLAudioElement): number | null {
  const value = audio.duration;
  return Number.isFinite(value) && value > 0 ? value : null;
}

/**
 * Probe duration via HTMLAudioElement.
 * MediaRecorder WebM files often report `Infinity` until seeked to the end.
 */
function readDurationFromElement(url: string): Promise<number | null> {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.preload = "auto";
    let settled = false;

    const finish = (value: number | null) => {
      if (settled) return;
      settled = true;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      resolve(value);
    };

    const tryRead = () => {
      const direct = readFiniteDuration(audio);
      if (direct) {
        finish(direct);
        return true;
      }
      return false;
    };

    const onLoadedMetadata = () => {
      if (tryRead()) return;
      const value = audio.duration;
      if (!Number.isFinite(value) || value === Infinity) {
        audio.currentTime = Number.MAX_SAFE_INTEGER;
      }
    };

    const onTimeUpdate = () => {
      if (!tryRead()) return;
      audio.currentTime = 0;
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("durationchange", () => {
      void tryRead();
    });
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("error", () => finish(null));
    window.setTimeout(() => finish(null), 12000);
    audio.src = url;
    audio.load();
  });
}

/** Resolve audio duration from a blob — reliable for WebM recordings without metadata. */
export async function readAudioDurationSeconds(blob: Blob): Promise<number | null> {
  if (typeof window === "undefined") return null;

  const bytes = await blob.arrayBuffer();
  const typedBlob = new Blob([bytes], {
    type: blob.type || "audio/webm",
  });

  const AudioContextCtor =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (AudioContextCtor) {
    const ctx = new AudioContextCtor();
    try {
      const buffer = await ctx.decodeAudioData(bytes.slice(0));
      const duration = buffer.duration;
      if (Number.isFinite(duration) && duration > 0) return duration;
    } catch {
      /* fall through to element probe */
    } finally {
      void ctx.close();
    }
  }

  const blobUrl = URL.createObjectURL(typedBlob);
  try {
    return await readDurationFromElement(blobUrl);
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
}

/** Probe duration for a direct playback URL when blob decode is unavailable. */
export async function readAudioDurationFromUrl(url: string): Promise<number | null> {
  if (typeof window === "undefined") return null;
  return readDurationFromElement(url);
}

/** Read duration from a local File (recorded or attached voice). */
export async function readAudioDurationFromFile(file: File): Promise<number | null> {
  return readAudioDurationSeconds(file);
}
