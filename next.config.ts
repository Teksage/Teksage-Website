import type { NextConfig } from "next";

/** FastAPI origin for `/api/*` rewrites (browser may call same-origin `/api/...` on this Next server). */
const backendOrigin =
  process.env.BACKEND_PROXY_TARGET?.replace(/\/$/, "") ??
  process.env.BACKEND_URL?.replace(/\/$/, "") ??
  "http://127.0.0.1:8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Special case: register-token REQUIRES trailing slash (FastAPI route definition)
        source: "/api/auth/register-token",
        destination: `${backendOrigin}/api/auth/register-token/`,
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
