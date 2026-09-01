import type { NextConfig } from "next";

/** FastAPI origin for `/api/*` rewrites (browser may call same-origin `/api/...` on this Next server). */
const backendOrigin =
  process.env.BACKEND_PROXY_TARGET?.replace(/\/$/, "") ??
  process.env.BACKEND_URL?.replace(/\/$/, "") ??
  "http://127.0.0.1:8000";

/**
 * Browser WebSocket must hit FastAPI directly — Vercel rewrites do not upgrade WS.
 * If NEXT_PUBLIC_WS_BASE_URL is unset, reuse BACKEND_PROXY_TARGET at build time.
 */
const publicWebSocketBase =
  process.env.NEXT_PUBLIC_WS_BASE_URL?.trim().replace(/\/$/, "") || backendOrigin;

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_WS_BASE_URL: publicWebSocketBase,
  },
  async rewrites() {
    return [
      {
        // FastAPI routes defined with trailing slash — must not strip (POST 307 loses body)
        source: "/api/payment/verify-payment",
        destination: `${backendOrigin}/api/payment/verify-payment/`,
      },
      {
        source: "/api/payment/verify-auto-payment",
        destination: `${backendOrigin}/api/payment/verify-auto-payment/`,
      },
      {
        // Special case: register-token REQUIRES trailing slash (FastAPI route definition)
        source: "/api/auth/register-token",
        destination: `${backendOrigin}/api/auth/register-token/`,
      },
      {
        // Service catalog list — FastAPI route is `/service-catalogs/` (trailing slash required)
        source: "/api/admin/service-catalogs",
        destination: `${backendOrigin}/api/admin/service-catalogs/`,
      },
      {
        // Normalize ALL other /api/* paths: remove trailing slash to avoid 307 redirects
        // Exclude: places (Next.js route handlers) and register-token (handled above)
        source: "/api/:path((?!places/)(?!auth/register-token$).*)/",
        destination: `${backendOrigin}/api/:path`,
      },
      {
        // Pass through paths without trailing slash as-is (excluding places and register-token)
        source: "/api/:path((?!places/)(?!auth/register-token$).*)",
        destination: `${backendOrigin}/api/:path`,
      },
    ];
  },
};

export default nextConfig;
