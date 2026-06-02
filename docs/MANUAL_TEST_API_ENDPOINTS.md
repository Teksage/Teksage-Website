# Manual test — API endpoint constants (Phase 0)

This checklist verifies **Phase 0** of the web parity plan: `src/lib/constants/api.ts` is aligned with the FastAPI app (`Teksage-backend-latest`) and Flutter `api_endpoints.dart`, and **legacy password / non-OTP login helpers** are removed from the web client.

## Prerequisites

1. Backend running with OpenAPI, e.g. `http://127.0.0.1:8000/docs` and `http://127.0.0.1:8000/openapi.json`.
2. Website `.env.local` with `NEXT_PUBLIC_API_BASE_URL` pointing at that host (no trailing path segment issues — use the same origin the app uses in the browser).
3. `npm run dev` in `Teksage-Website`.

## A. OpenAPI path smoke checks

In Swagger (`/docs`), confirm each **path string** exists (method may differ; use the doc for the correct verb). Spot-check the following against `API_ENDPOINTS` in `src/lib/constants/api.ts`:

| Constant | Expected path |
|----------|----------------|
| `sendOtp` | `/api/auth/otp/request` |
| `verifyOtp` | `/api/auth/otp/login-verify` |
| `panchang` | `/api/prediction/panchang` |
| `horoscope` | `/api/auth/horoscope` |
| `horoscopeDownload` | `/api/horoscope/download` |
| `matchMakingCompatibility` | `/api/prediction/compatibility` |
| `chatHistory` | `/api/chat-history` |
| `astrologerFilter` | `/api/astrologer/filter` |
| `astrologerDetail` + `/{id}` | `/api/astrologer/astrologer/{astrologer_id}` |
| `astrologerBook` | `/api/astrologer/book` |
| `serviceCatalogs` | `/api/admin/service-catalogs/` |
| `paymentSubscribe` | `/api/payment/subscribe` |
| `paymentVerify` | `/api/payment/verify-payment/` |
| `paymentApplyCoupon` | `/api/payment/apply-coupon` |
| `faq` | `/api/faq/` |
| `countries` | `/api/countries` |

**Pass:** Every row appears in OpenAPI with the same path (trailing slashes must match FastAPI, e.g. `serviceCatalogs`, `faq`, `registerToken`).

## B. Removed / bogus routes (must not exist)

In OpenAPI, confirm these **old** website paths are **absent** (they were removed as non-contract):

- `/api/home/dashboard`
- `/api/auth/login`
- `/api/auth/login/mobile`
- `/api/panchang` (wrong; panchang lives under **prediction**)
- `/api/horoscope` (wrong; user horoscope is under **auth**)
- `/api/matchmaking` and `/api/matchmaking/details` (replaced by **prediction/compatibility**)
- `/api/chat/history` (replaced by **`/api/chat-history`**)
- `/api/consultation/*` (replaced by **astrologer** + **payment** routes)
- `/api/subscription/*` (replaced by **admin/service-catalogs/** + **payment/subscribe**)

**Pass:** None of the above appear as documented routes (or you have consciously re-added them on the backend — then update `api.ts` again).

## C. Regression — existing site flows still call valid routes

| Step | Action | Pass criteria |
|------|--------|----------------|
| C1 | Open `/login`, **Email** tab, enter email, request OTP | Network: `POST .../api/auth/otp/request` → 2xx (or expected 4xx for invalid email), no call to `/api/auth/login`. |
| C2 | Complete OTP verify | Network: `POST .../api/auth/otp/login-verify`; session cookie; redirect to `?redirect=` target or `/home`. |
| C2b | Logged out, open `/predictions/daily` | Redirect to `/login?redirect=%2Fpredictions%2Fdaily`; after OTP, land on daily prediction. |
| C2c | Login page **Mobile** tab | `POST .../api/auth/otp/request` with `mobile_number` + `country_code`; verify with same country. |
| C3 | Load `/home` while logged in | Network: `GET .../api/prediction/daily` and `GET .../api/notifications` succeed as before. |
| C4 | Open `/profile`, load and save | `GET/POST .../api/auth/profile` and `.../update-profile` unchanged. |
| C5 | From settings, **Logout** | `POST .../api/auth/logout` and redirect to `/login`. |

## D. WebSocket note (documentation only for this phase)

- Backend serves the AI chat WebSocket at **`/api/chat`** (API router). Some clients also use root **`/chat`**; the constant `chatWebSocket` documents the **`/api/chat`** path for the Next.js app.

**Pass:** You can open `openapi.json` or docs and see the WebSocket entry for `/api/chat` if listed; no code change required in this phase beyond the constant being correct for future wiring.

## E. Code sanity

| Check | Pass |
|--------|------|
| `grep -r "loginWithEmail\|API_ENDPOINTS.login\|/api/home/dashboard"` in `src/` | No matches (dead paths removed). |
| `npm run build` (or `tsc --noEmit`) in `Teksage-Website` | Completes without errors. |

---

When A–E pass, **Phase 0** is done; next phase per plan: **Panchang + Horoscope** screens (`panchang-horoscope` todo).
