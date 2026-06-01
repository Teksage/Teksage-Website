/** FastAPI origin for Next.js route handlers that proxy to the Python API. */
export function getBackendProxyOrigin(): string {
  const raw =
    process.env.BACKEND_PROXY_TARGET?.trim() ??
    process.env.BACKEND_URL?.trim() ??
    "http://127.0.0.1:8000";
  return raw.replace(/\/$/, "");
}
