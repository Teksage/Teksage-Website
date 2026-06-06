# Manual test — Predictions & match making (Phase B)

Use after **API** and **Panchang / Horoscope** manual tests pass. This covers **prediction detail pages** (`GET /api/prediction/{daily|weekly|yearly|life}`), **share PDF** (`POST /api/share/...` — *UI disabled for now*), and **match making** (`GET`/`POST /api/prediction/compatibility`, astrologer rashi/nakshatra lists).

**Flutter parity reference:** `lib/Screens/prediction/`, `lib/Components/Predictions/predictionLandingPage.dart`, `lib/Screens/MatchMaking/matchMakingDetails.dart`.

## Prerequisites

1. Backend running at `NEXT_PUBLIC_API_BASE_URL` (e.g. `http://localhost:8000` — match `.env.local`).
2. `npm run dev` → `http://localhost:3000`.
3. **Logged-in user** with **active subscription** and **complete profile** (same as Flutter — backend enforces for predictions).
4. Browser **DevTools → Network** open to verify calls (optional but useful).
5. Hard refresh (`Ctrl+Shift+R`) after pulling UI changes so Tailwind/CSS updates apply.

## A. Home entry points (`/home`)

| Step | Action | Expected |
|------|--------|----------|
| A1 | **Daily Prediction** card (green) while logged in | Navigates to `/predictions/daily`. |
| A2 | **Weekly / Yearly / Life** circles under “Explore Other Predictions” | `/predictions/weekly`, `/predictions/yearly`, `/predictions/life` respectively. |
| A3 | Same links **logged out** | Go to `/login` with `redirect` back to the prediction path (no prediction API calls until authenticated). |
| A4 | **Marriage match making** card — **no** saved match yet | Link goes to `/matchmaking`. |
| A5 | **Marriage match making** card — **after** you saved a match (see section C) | Link goes to `/matchmaking/details`. Dashboard uses `GET /api/prediction/compatibility` once after login to set this. |

## B. Prediction detail pages

All routes use **Flutter full-bleed** layout (no `max-w-lg` letterboxing). Logged-out users see sign-in CTA with **`redirect`** back to the same path after login.

> **Download PDF:** Commented out in UI across daily / weekly / yearly / life / match making. Service helpers remain in `src/lib/services/predictions.ts` for when product re-enables. Skip PDF steps unless you uncomment the UI.

### B1. Daily (`/predictions/daily`)

| Step | Action | Expected |
|------|--------|----------|
| B1a | Open logged in | `GET /api/prediction/daily` (200); green hero, Thara/Chandra bala if present, category cards (Career, Relationship, Wealth, Health), today’s note if `quote` present. |
| B1b | Layout | Edge-to-edge on mobile; no generic gray `AppHeader` bar. |
| B1c | API returns `data` as error string | Error text + **Try again**. |

### B2. Weekly (`/predictions/weekly`)

| Step | Action | Expected |
|------|--------|----------|
| B2a | Open logged in | `GET /api/prediction/weekly`; green hero, day tabs (Sun–Sat), selected day card with short/long text, favorable/mixed badge, bala line if present. |
| B2b | Tap another day tab | Selected card scrolls into view (not stuck under tabs); no left/right white gutters on the page. |
| B2c | Content | **No** “AI Voice Astro Chat” / `ChatBanner` on this screen. |

### B3. Yearly (`/predictions/yearly`)

**Flow mirrors Flutter `predictionLandingPage.dart` → `yearlyPrediction.dart`.**

| Step | Action | Expected |
|------|--------|----------|
| B3a | Open logged in (first visit) | `GET /api/prediction/yearly?generate=false` — **landing only**, even if DB already has a cached prediction. Pink/coral gradient, rotating deco, **Generate Yearly Prediction** button. |
| B3b | Tap **Generate** | `GET /api/prediction/yearly?generate=true`; detail view with General, Planet transits (before/after dasa), Prediction categories, Remedies carousels, dashed dividers, **Regenerate** + consultation CTA. |
| B3c | Background | Full-viewport yearly gradient under floating bottom nav — **no white band** between content and nav. |
| B3d | Back from detail | Returns via browser/app back; re-opening route shows landing again until Generate is tapped. |

### B4. Life (`/predictions/life`)

**Flow mirrors Flutter `predictionLandingPage.dart` → `lifePrediction.dart`.**

| Step | Action | Expected |
|------|--------|----------|
| B4a | Open logged in (first visit) | `GET /api/prediction/life?generate=false` — **landing only**, even if DB already has cached data. **Purple gradient** (`#9754F6` → `#ABAEDB`), rotating `lifeLandingDeco`, white title/description, **Generate Life Prediction** button. |
| B4b | Tap **Generate** | `GET /api/prediction/life?generate=true`; detail with header icon, intro copy, **card swiper** (General, Career, Relationship, Wealth, Health, Current time period) with `n/total` badge, dot indicators, swipe left/right. |
| B4c | Background | Purple gradient on landing **and** detail; text readable (white on purple on landing). No gray `#F1F1F1` body showing through. |
| B4d | Consultation CTA | Links to consultation route from detail footer. |

## C. Match making

### C1. Form (`/matchmaking`)

| Step | Action | Expected |
|------|--------|----------|
| C1a | Logged out | Sign-in copy; login preserves return to `/matchmaking`. |
| C1b | Logged in | `GET /api/astrologer/rashi` populates both **Rasi** dropdowns. |
| C1c | Choose **Boy** rasi | `GET /api/astrologer/nakshatra?sign_id=<id>` for boy nakshatras; changing rasi clears nakshatra. |
| C1d | Same for **Girl** | Independent lists. |
| C1e | Fill names + all fields → **Calculate Match** | `POST /api/prediction/compatibility` body: `boy_name`, `boy_rashi`, `boy_nakshatra`, `girl_name`, `girl_rashi`, `girl_nakshatra` (strings). On success → **`/matchmaking/details`**. |
| C1f | **View saved match** | Goes to `/matchmaking/details` without submitting. |

### C2. Details (`/matchmaking/details`)

**Flutter parity:** `matchMakingDetails.dart` (pink gradient, not legacy gray “Compatibility” layout).

| Step | Action | Expected |
|------|--------|----------|
| C2a | Logged in, existing match | `GET /api/prediction/compatibility` (200): pink gradient + `matchMakingBG.png` hero, **Marriage Match Making** title, hero card (boy/girl names, Rasi, Nakshatram, dashed lines, total score e.g. `14/40`). |
| C2b | Kuta table | White card: columns **Kuta / Gained / Max** for each row in `kutas`. |
| C2c | Kuta breakdown | Per-kuta cards with green/red title, **Present** / **Absent** badge, description text. |
| C2d | Summary | `general_details` paragraph when present. |
| C2e | **Expert Connect** | CTA to consultation. |
| C2f | Pink **FAB** (+) | Regenerate / new match → `/matchmaking`. |
| C2g | Background | Pink gradient under floating bottom nav — no white band below last card. |
| C2h | Logged in, **no** saved match | Message + button to `/matchmaking`. |

## D. Regression & auth

| Step | Check |
|------|--------|
| D1 | `/panchang`, `/horoscope`, `/home`, `/profile`, `/settings` still work. |
| D2 | `401` on any API still redirects to `/login` (`http.ts` interceptor). |
| D3 | `npm run build` completes with no TypeScript errors. |
| D4 | Yearly + life landing do **not** auto-open detail when `generate=false` (only after Generate). |

## E. UI parity quick checklist

| Screen | Gradient / shell | Key assets |
|--------|------------------|------------|
| Weekly | Green hero, full bleed | `weeklyPrediction` pattern |
| Yearly landing | Coral/yellow `yearly-shell-gradient` | `yearlyLandingDeco`, `yearlyDecoIcon` |
| Yearly detail | Same shell | Category rows, planet cards, remedies |
| Life landing | Purple `bg-gradient-to-b from-[#9754f6] to-[#abaedb]` | `lifeLandingDeco`, `lifeDecoIcon` |
| Life detail | Same purple shell | `lifeCareer.svg`, etc. per section |
| Match details | Pink `match-details-body-gradient` | `matchMakingBG.png`, `bigRing`, present/absent icons |

---

**Pass:** A1–A5, B1–B4 (generate flows + UI), C1–C2, and D1–D4 behave as above.

**Deferred (not in pass criteria):** Download PDF buttons in UI.

**Related docs:** `docs/MANUAL_TEST_API_ENDPOINTS.md`, `docs/MANUAL_TEST_PANCHANG_HOROSCOPE.md`.

**Next phases:** Consultation booking, settings subpages — see `.cursor/plans/web_parity_and_apis_c29caa7b.plan.md`.

## AI Chat (`/chat`)

| Step | Action | Pass |
|------|--------|------|
| 1 | Log in; open **Home → Chat Now** or `/chat` | Chat shell loads (green bubbles, bot avatar) |
| 2 | Ensure `NEXT_PUBLIC_WS_BASE_URL` matches FastAPI when using `same-origin` REST | WebSocket connects (`ws://127.0.0.1:8000/api/chat?token=…`) |
| 3 | Send a question | Typing indicator → streamed reply → `[END]` enables input |
| 4 | After reply | **Related questions** chips appear (POST `/api/prediction/related_queries`) |
| 5 | Reload page | Last messages restored from GET `/api/chat-history` (if any) |
| 6 | Free user | 5 messages / 7-day count from GET `/api/auth/maintain_history` then subscribe prompt |

**Deferred (v1 web):** voice/hybrid mode, PDF download/mail, avatar/style picker — REST helpers exist in `src/lib/services/chat.ts`.
