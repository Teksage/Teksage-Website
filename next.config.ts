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
        // OTP request should always hit backend without trailing slash to avoid 307.
        source: "/api/auth/otp/request/",
        destination: `${backendOrigin}/api/auth/otp/request`,
      },
      {
        // Same as above for non-trailing-slash request path.
        source: "/api/auth/otp/request",
        destination: `${backendOrigin}/api/auth/otp/request`,
      },
      {
        // Normalize OTP login verify path (with slash) to non-trailing slash backend route.
        source: "/api/auth/otp/login-verify/",
        destination: `${backendOrigin}/api/auth/otp/login-verify`,
      },
      {
        // Normalize OTP login verify path (without slash) to non-trailing slash backend route.
        source: "/api/auth/otp/login-verify",
        destination: `${backendOrigin}/api/auth/otp/login-verify`,
      },
      {
        // Normalize authenticated OTP send route.
        source: "/api/auth/otp/send-authenticated/",
        destination: `${backendOrigin}/api/auth/otp/send-authenticated`,
      },
      {
        // Normalize authenticated OTP send route.
        source: "/api/auth/otp/send-authenticated",
        destination: `${backendOrigin}/api/auth/otp/send-authenticated`,
      },
      {
        // Normalize authenticated OTP verify route.
        source: "/api/auth/otp/verify/",
        destination: `${backendOrigin}/api/auth/otp/verify`,
      },
      {
        // Normalize authenticated OTP verify route.
        source: "/api/auth/otp/verify",
        destination: `${backendOrigin}/api/auth/otp/verify`,
      },
      {
        // Preserve trailing slash — FastAPI routes like `/register-token/` 307 without it,
        // and redirect drops the Authorization header → 401 on register-token.
        source:
          "/api/:path((?!places/)(?!auth/otp/request/?$)(?!auth/otp/login-verify/?$)(?!auth/otp/send-authenticated/?$)(?!auth/otp/verify/?$).*)/",
        destination: `${backendOrigin}/api/:path/`,
      },
      {
        // Next.js route handlers under `app/api/places/*` — do not proxy to FastAPI.
        // Exclude register-token — handled by `app/api/auth/register-token/route.ts`.
        source:
          "/api/:path((?!places/)(?!auth/register-token$)(?!auth/otp/request/?$)(?!auth/otp/login-verify/?$)(?!auth/otp/send-authenticated/?$)(?!auth/otp/verify/?$).*)",
        destination: `${backendOrigin}/api/:path`,
      },
    ];
  },
};

export default nextConfig;
