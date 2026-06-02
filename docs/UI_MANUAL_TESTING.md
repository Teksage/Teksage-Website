# Teksage Website — UI manual test guide

Use this document to verify **Phase 1** screens (login, home dashboard, profile shell, navigation) before moving to the next implementation phase.

## Prerequisites

1. **Repository:** `Teksage-Website` (Next.js 16, App Router under `src/app/`).
2. **Environment:** Copy [`.env.example`](../.env.example) to **`.env.local`** in the project root (same folder as `package.json`).
   - Set `NEXT_PUBLIC_API_BASE_URL` to your running Python API (e.g. `http://127.0.0.1:8000`).
3. **Install & run:**
   ```bash
   cd Teksage-Website
   npm install
   npm run dev
   ```
4. Open the URL shown in the terminal (usually **http://localhost:3000**).

## Branding / logo

- Login and OTP screens show the **Teksage login logo** copied from Flutter:  
  `Teksage-Mobile-App/assets/svg/loginLogo.svg` → site file **`/branding/login-logo.svg`**.
- Optional app mark: **`/branding/app-logo.svg`** (from Flutter `logo.svg`).
- If the logo does not appear: hard-refresh (Ctrl+Shift+R), confirm files exist under `public/branding/`, and check the browser **Network** tab for `404` on those SVGs.

---

## How to open each screen (routes)

| Screen        | URL path      | Notes                                      |
|---------------|---------------|--------------------------------------------|
| Root redirect | `/`           | Redirects to `/home`                      |
| Login         | `/login`      | Tabs: Mobile Number / Email                |
| Home          | `/home`       | Main dashboard (requires session cookie)   |
| Panchang      | `/panchang`   | Placeholder                                |
| Horoscope     | `/horoscope`  | Placeholder                                |
| Settings      | `/settings`   | Menu + logout                              |
| Profile       | `/profile`    | Profile form (requires session)          |

**Proxy (auth guard):** Without a valid **`teksage_auth_token`** cookie, visiting `/home`, `/panchang`, `/horoscope`, `/settings`, or `/profile` redirects to **`/login`**. With a valid cookie, `/login` redirects to **`/home`**.

---

## Phase checklist (pass / fail)

### A. Login — layout & logo

| # | Action | Expected |
|---|--------|----------|
| A1 | Open `/login` | Green gradient top area, **Teksage SVG logo** centered above “Login or Sign up”. |
| A2 | Resize to ~375px width (mobile) | Layout readable; logo scales (`max-width` cap); no horizontal scroll. |
| A3 | Footer legal line | “By continuing…” visible at bottom of scroll area. |

### B. Login — Mobile tab validation

| # | Action | Expected |
|---|--------|----------|
| B1 | Leave mobile empty, tap **Continue** | Button stays disabled (greyed primary). |
| B2 | Enter `0` + 9 digits (invalid first digit) | Red error: invalid mobile message; Continue disabled. |
| B3 | Enter valid 10-digit mobile (e.g. `9876543210`) | Continue enabled (solid green). |
| B4 | Tap **Continue** with API **down** or wrong URL | Red error: failed to send OTP. |
| B5 | Tap **Continue** with API **up** and correct contract | Navigates to **OTP** step (no error). |

### C. Login — Email tab validation

| # | Action | Expected |
|---|--------|----------|
| C1 | Switch to **Email** tab | Email field visible; Mobile field hidden. |
| C2 | Enter `not-an-email` | Red error: valid email required; Continue disabled. |
| C3 | Enter valid email | Continue enabled. |
| C4 | Submit with API failure | “Failed to send OTP…” error. |
| C5 | Submit with API success | OTP step; masked email in subtitle. |

### D. OTP screen

| # | Action | Expected |
|---|--------|----------|
| D1 | From mobile flow, open OTP | Masked mobile like `98******10` (pattern may vary). |
| D2 | From email flow | Masked email; verify request sends **`email` + `otp`** (not mobile). |
| D3 | Enter fewer than 6 digits | **Verify & Login** disabled. |
| D4 | Enter 6 digits + wrong OTP (API 4xx) | Red: “Invalid OTP…”. |
| D5 | **Back** arrow | Returns to login form step; tab state preserved where applicable. |
| D6 | Logo on OTP | Smaller **Brand** logo above “Enter OTP”. |

### E. Session & protected routes

| # | Action | Expected |
|---|--------|----------|
| E1 | After successful verify + `setAuth` + cookie | Redirect to **`/home`**. |
| E2 | Open `/home` in new tab same browser | Loads home (cookie present). |
| E3 | DevTools → Application → Cookies → delete `teksage_auth_token` | Next navigation to `/home` redirects to **`/login`**. |
| E4 | Logged in, visit `/login` | Redirect to **`/home`**. |

### F. Home dashboard

| # | Action | Expected |
|---|--------|----------|
| F1 | `/home` | Greeting, notification icon, consultation banner, prediction row, match+daily cards, chat banner. |
| F2 | Tap bottom nav tabs | Navigates between Home / Panchang / Horoscope / Settings. |
| F3 | API failure for dashboard data | Hook error state (if surfaced in UI) or empty/loader per implementation. |

### G. Settings & profile

| # | Action | Expected |
|---|--------|----------|
| G1 | `/settings` | User card (if logged in), list items, **Logout**. |
| G2 | Logout | Cookie cleared; redirect **`/login`**. |
| G3 | `/profile` | Avatar area, **Edit Profile** / fields (when API returns user). |
| G4 | Profile load failure | Empty / error state per `useProfile` implementation. |

---

## Browser tools (quick)

- **Console (F12 → Console):** JavaScript errors, failed chunk loads.
- **Network:** `sendOtp`, `verifyOtp`, `profile` requests — status **200** vs **4xx/5xx**; CORS errors if API origin differs from site.
- **Application → Cookies:** `teksage_auth_token` after login.
- **Application → Local Storage:** `teksage-auth-store` (Zustand), `teksage_auth_token` (JWT for axios).

---

## API / CORS note

The browser calls **`NEXT_PUBLIC_API_BASE_URL`** directly. The backend must allow your site origin (e.g. `http://localhost:3000`) via **CORS**. If requests fail with CORS in the console, fix headers on the Python API, not by disabling security in the browser.

---

## Sign-off before next phase

- [ ] A–G executed; failures logged as issues with route + step id (e.g. `B4`).
- [ ] Logo visible on login + OTP.
- [ ] `.env.local` present locally; **not** committed (see `.gitignore`).
- [ ] Team agrees backend URL and OTP contract match real endpoints.

When this checklist is green, proceed to the next feature phase (e.g. full Panchang UI, real profile save, etc.).
