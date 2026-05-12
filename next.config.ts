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
        source: "/api/:path*",
        destination: `${backendOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
