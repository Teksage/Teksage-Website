import type { SharePdfOutcome } from "@/types/prediction-share";
import { pdfFileForSystemShare, sharePdfFileWithKeepalive } from "@/lib/pdf-share-file";

const BLOB_REVOKE_DELAY_MS = 2000;

export function canSharePdfFile(file: File): boolean {
  if (typeof navigator === "undefined" || !navigator.canShare) return false;
  try {
    return navigator.canShare({ files: [file] });
  } catch {
    return false;
  }
}

export function triggerPdfDownload(blob: Blob, filename: string): void {
  const pdfBlob = blob.type === "application/pdf" ? blob : new Blob([blob], { type: "application/pdf" });
  const url = URL.createObjectURL(pdfBlob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.setTimeout(() => URL.revokeObjectURL(url), BLOB_REVOKE_DELAY_MS);
}

export function triggerPdfDownloadFromBytes(bytes: ArrayBuffer, filename: string): void {
  triggerPdfDownload(new Blob([bytes], { type: "application/pdf" }), filename);
}

/** Share PDF via Web Share — file only (no text; Outlook breaks with text + files). */
export async function sharePdfWithWebApi(args: {
  bytes: ArrayBuffer;
  filename: string;
}): Promise<SharePdfOutcome> {
  if (typeof navigator === "undefined" || !navigator.share) {
    throw new Error("share_unavailable");
  }

  const file = await pdfFileForSystemShare(args.bytes, args.filename);

  try {
    await sharePdfFileWithKeepalive(file);
    return "native";
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") return "cancelled";
    throw error;
  }
}

export { pdfFileForSystemShare };
