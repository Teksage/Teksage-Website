# Manual test — Panchang & Horoscope (Phase 1 parity)

Use after **`docs/MANUAL_TEST_API_ENDPOINTS.md`** (API constants) passes. This phase wires **`GET /api/prediction/panchang`**, **`POST /api/share/panchang`**, **`GET /api/auth/horoscope`**, **`GET /api/horoscope/download`**, and mirrors Flutter **premium / auth / profile** behaviour.

## Prerequisites

1. Backend at `NEXT_PUBLIC_API_BASE_URL` (see `.env.local`).
2. `npm run dev` → open `http://localhost:3000`.
3. Test accounts:
   - **Logged-out** user.
   - **Logged-in, non-premium** (`premium_member: false` from OTP verify).
   - **Logged-in, premium** with **complete profile** (DOB, TOB, place — same as app).
   - **Logged-in, profile incomplete** (missing horoscope / `is_profile_updated` false) — expect horoscope block only.

## A. Panchang (`/panchang`)

| Step | Action | Expected |
|------|--------|----------|
| A1 | Visit `/panchang` logged out | Copy explains OTP login; **Go to login** → `/login?redirect=%2Fpanchang`. |
| A2 | Log in as **non-premium**, open `/panchang` | Hero image (`panchangBG.png`) + gradient; **View subscriptions** → `/settings/subscriptions`. No `GET .../panchang` until premium. |
| A3 | Log in as **premium**, open `/panchang` | Network: `GET .../api/prediction/panchang` with `Authorization` + `X-Timezone`; UI lists sunrise/sunset, tithi, nakshatra, etc. |
| A4 | Tap **Download PDF** (premium, data loaded) | Network: `POST .../api/share/panchang` with JSON `{"prediction_id":<id>}`; browser downloads `panchang.pdf` (or file opens). |
| A5 | Backend error (e.g. turn off API) | Friendly error + **Try again** triggers reload. |

## B. Horoscope (`/horoscope`)

| Step | Action | Expected |
|------|--------|----------|
| B1 | Visit `/horoscope` logged out | Sign-in copy; **Go to login** → `/login?redirect=%2Fhoroscope`. |
| B2 | Log in, **profile incomplete** | “Complete your profile” + **Open profile** → `/profile`. Network may show `400` on `GET .../api/auth/horoscope`. |
| B3 | Log in, **profile complete** | `GET .../api/auth/horoscope` → 200; cards show name, rashi, nakshatra, birth fields, **lagna**. |
| B4 | Charts | If API returns HTML/SVG in `rashi_chart` / `navamsa_chart`, two **iframes** render below (may be tall/scroll). |
| B5 | **Download PDF** | `GET .../api/horoscope/download` (blob); file `horoscope.pdf` saves. |
| B6 | API failure | Error message + **Try again**. |

## C. Regression

| Step | Check |
|------|--------|
| C1 | `/home`, `/profile`, `/settings` still behave as before. |
| C2 | `401` from any API still redirects to `/login` (existing `http` interceptor). |

---

**Pass:** A1–A5 and B1–B6 behave as described with no console build errors (`npm run build`).

**Next:** `docs/MANUAL_TEST_PREDICTIONS_MATCHMAKING.md` (prediction routes + match making).
