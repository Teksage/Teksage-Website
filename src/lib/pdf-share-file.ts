const SHARE_FILE_KEEPALIVE_MS = 60_000;

function safeShareFilename(filename: string): string {
  return filename.replace(/[^\w.-]/g, "_");
}

/** Outlook reads attachments after share() resolves — keep a strong File reference briefly. */
let shareFileKeepAlive: File | null = null;

function retainShareFile(file: File): void {
  shareFileKeepAlive = file;
  window.setTimeout(() => {
    if (shareFileKeepAlive === file) shareFileKeepAlive = null;
  }, SHARE_FILE_KEEPALIVE_MS);
}

async function writePdfToOpfs(bytes: ArrayBuffer, filename: string): Promise<File> {
  const root = await navigator.storage.getDirectory();
  const handle = await root.getFileHandle(safeShareFilename(filename), { create: true });
  const writable = await handle.createWritable();
  await writable.write(bytes);
  await writable.close();
  const file = await handle.getFile();
  if (file.size === 0) throw new Error("empty_opfs_pdf");
  return file;
}

/** Build a File Outlook can read — prefer OPFS-backed file on disk over in-memory only. */
export async function pdfFileForSystemShare(bytes: ArrayBuffer, filename: string): Promise<File> {
  const copy = bytes.slice(0);
  if (copy.byteLength === 0) throw new Error("empty_pdf");

  if (typeof navigator.storage?.getDirectory === "function") {
    try {
      return await writePdfToOpfs(copy, filename);
    } catch {
      // Fall back to in-memory File (works for WhatsApp; Outlook may still fail).
    }
  }

  return new File([copy], filename, {
    type: "application/pdf",
    lastModified: Date.now(),
  });
}

export async function sharePdfFileWithKeepalive(file: File): Promise<void> {
  if (file.size === 0) throw new Error("empty_pdf");
  retainShareFile(file);
  await navigator.share({ files: [file] });
}
