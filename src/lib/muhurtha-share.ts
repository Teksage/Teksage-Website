import { toBlob } from "html-to-image";
import { DOWNLOAD_FILENAMES } from "@/lib/constants/downloads";
import { MUHURTHA_SCREEN } from "@/lib/constants/muhurtha-screen";
import { PUBLIC_SITE_ORIGIN } from "@/lib/constants/site";
import { ROUTES } from "@/lib/constants/routes";

export type MuhurthaImageShareOutcome =
  | "shared"
  | "sharedNeedsPaste"
  | "copied"
  | "downloaded"
  | "cancelled";

const PIXEL_RATIO = 2;
const BLOB_REVOKE_DELAY_MS = 2000;

/** Keep localhost/dev page URL; rewrite only non-local hosts to production. */
export function toPublicMuhurthaShareUrl(pageUrl: string): string {
  try {
    const fallbackOrigin =
      typeof window !== "undefined" ? window.location.origin : PUBLIC_SITE_ORIGIN;
    const parsed = new URL(pageUrl, fallbackOrigin);
    const host = parsed.hostname;
    const isLocal =
      host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");
    const origin = isLocal ? parsed.origin : PUBLIC_SITE_ORIGIN;
    const path = parsed.pathname.includes("event-planner")
      ? parsed.pathname
      : ROUTES.eventPlannerResults;
    return `${origin}${path}${parsed.search}`;
  } catch {
    return pageUrl;
  }
}

export function buildMuhurthaShareCaption(pageUrl: string): string {
  return `${MUHURTHA_SCREEN.share.shareCredit}\n${toPublicMuhurthaShareUrl(pageUrl)}`;
}

export async function captureMuhurthaResultImage(
  element: HTMLElement
): Promise<Blob> {
  const blob = await toBlob(element, {
    pixelRatio: PIXEL_RATIO,
    cacheBust: true,
  });
  if (!blob) throw new Error("capture_failed");
  return blob;
}

function triggerPngDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.setTimeout(() => URL.revokeObjectURL(url), BLOB_REVOKE_DELAY_MS);
}

async function copyCaption(caption: string): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
    return false;
  }
  try {
    await navigator.clipboard.writeText(caption);
    return true;
  } catch {
    return false;
  }
}

/**
 * WhatsApp Web ignores Web Share `text` for the image caption field.
 * Copy caption first, share the photo, then user pastes into "Add a message…".
 */
async function sharePngWithCaption(args: {
  blob: Blob;
  filename: string;
  title: string;
  caption: string;
}): Promise<MuhurthaImageShareOutcome> {
  const captionCopied = await copyCaption(args.caption);
  const file = new File([args.blob], args.filename, { type: "image/png" });

  if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
    triggerPngDownload(args.blob, args.filename);
    return captionCopied ? "copied" : "downloaded";
  }

  const filesOnly = { files: [file], title: args.title };
  const withCaption = {
    files: [file],
    title: args.title,
    text: args.caption,
  };

  try {
    // Prefer file+text where the OS maps text → image caption (Android WhatsApp).
    if (navigator.canShare?.(withCaption)) {
      await navigator.share(withCaption);
      return captionCopied ? "sharedNeedsPaste" : "shared";
    }
    if (navigator.canShare?.(filesOnly)) {
      await navigator.share(filesOnly);
      return captionCopied ? "sharedNeedsPaste" : "shared";
    }
    await navigator.share({ title: args.title, text: args.caption });
    return "shared";
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return "cancelled";
    }
    throw err;
  }
}

/** Capture on-screen results table and open the system share sheet. */
export async function shareMuhurthaResultImage(args: {
  element: HTMLElement;
  pageUrl: string;
}): Promise<MuhurthaImageShareOutcome> {
  const blob = await captureMuhurthaResultImage(args.element);
  return sharePngWithCaption({
    blob,
    filename: DOWNLOAD_FILENAMES.eventPlannerResultPng,
    title: MUHURTHA_SCREEN.share.shareTitle,
    caption: buildMuhurthaShareCaption(args.pageUrl),
  });
}
