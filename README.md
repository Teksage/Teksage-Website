# Teksage Website

Next.js web app for **Teksage** — mobile-first customer experience mirroring the Flutter app (auth, home, chat, predictions, consultation, Event Planner, settings, and more).

Backend: FastAPI ([Teksage-backend-latest](../Teksage-backend-latest)). Sister apps: [Teksage-Mobile-App](../Teksage-Mobile-App), [Teksage-admin](../Teksage-admin).

---

## Stack

| Piece | Technology |
|-------|------------|
| Framework | Next.js **16** (App Router) |
| UI | React 19, Tailwind, shadcn/ui |
| State / data | Feature hooks, contexts, stores under `src/` |
| i18n | `src/lib/i18n/messages/*.json` + `translate()` |
| Package manager | **npm** (`package-lock.json`) |

> This Next.js version may differ from older tutorials. Prefer docs under `node_modules/next/dist/docs/` and [AGENTS.md](AGENTS.md) before using outdated patterns.

---

## Prerequisites

- Node.js **20+** recommended
- npm
- Running Teksage backend (default `http://127.0.0.1:8000`) for full functionality

---

## Quick start

```bash
cd teksage-website
npm install
```

### Environment

Create `.env.local` in the project root (no committed `.env.example` — use the template below or [`.env.vercel.production.template`](.env.vercel.production.template) for production names).

**Local development example**

```env
# Browser calls same-origin /api/* ; Next rewrites to the backend
NEXT_PUBLIC_API_BASE_URL=same-origin
BACKEND_PROXY_TARGET=http://127.0.0.1:8000
BACKEND_URL=http://127.0.0.1:8000

# WebSocket base (use backend origin; wss:// required on HTTPS hosts)
NEXT_PUBLIC_WS_BASE_URL=http://127.0.0.1:8000

# Optional for local
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_POSTHOG_ENABLE_IN_DEV=false
```

**Production (`my.teksage.app` on Vercel)**

```env
# REST — either direct API or same-origin proxy
NEXT_PUBLIC_API_BASE_URL=same-origin
BACKEND_PROXY_TARGET=https://<your-fastapi-host>

# WebSocket — must be the FastAPI origin (wss:// on HTTPS).
# If omitted, next.config.ts copies BACKEND_PROXY_TARGET into the client bundle.
NEXT_PUBLIC_WS_BASE_URL=https://<your-fastapi-host>
```

Use **`https://`** for the API host in production (becomes **`wss://`** for chat). `http://` backends are auto-upgraded to `https://` when the site is on HTTPS.

`NEXT_PUBLIC_WS_BASE_URL` is **required for AI chat** if you do not set `BACKEND_PROXY_TARGET` — Next.js `/api` rewrites do **not** proxy WebSockets.

**Other public vars** (when features are needed):

- Firebase: `NEXT_PUBLIC_FIREBASE_*`, `NEXT_PUBLIC_FIREBASE_VAPID_KEY`
- Turnstile: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- PostHog: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`
- Server-only: `GOOGLE_PLACES_API_KEY`

Env helpers live in [`src/lib/env.ts`](src/lib/env.ts). **Never hardcode API hosts in components** — use env + [`src/lib/constants/api.ts`](src/lib/constants/api.ts).

### Run

```bash
npm run dev
```

Open **http://localhost:3000**.

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server (webpack) |
| `npm run dev:turbo` | Dev with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

---

## Project structure

```
src/
  app/                 # App Router
    (auth)/            # login, onboarding, welcome
    (main)/            # home, chat, consultation, predictions, …
    api/               # Next route handlers (proxy, places, …)
  components/
    ui/                # shadcn primitives
    common/            # shared app components
    <feature>/         # feature-specific UI
  lib/
    constants/         # colors, typography, routes, api, assets, copy
    i18n/              # locales + translate
    env.ts
  hooks/               # use<Feature>.ts
  contexts/, store/, types/
```

---

## Development conventions

Follow workspace rules (also in `.cursor/rules/`):

- No hardcoded colors / fonts / asset paths / route strings — use `src/lib/constants/*`
- Types and interfaces in `.ts` under `src/types/` — not inside `.tsx`
- Prefer `className` + Tailwind; use `cn()` for conditional classes
- Use shadcn/ui for primitives
- Keep files focused (prefer ≤ ~200 lines; split when needed)
- Mirror Flutter feature naming where useful for parity

### i18n

Add user-visible strings to all locale files under `src/lib/i18n/messages/` (`en_US`, `ta`, `hi`, `te_IN`, `kn_IN`, `ml_IN`, `mr_IN`, …) and look them up via existing translate helpers — do not hardcode product copy in components.

---

## Talking to the backend

1. Start [Teksage-backend-latest](../Teksage-backend-latest) on port **8000**.
2. Set `BACKEND_PROXY_TARGET` / `NEXT_PUBLIC_API_BASE_URL` as above.
3. API path segments only belong in `src/lib/constants/api.ts` (`API_ENDPOINTS`).

---

## Deploy

Production env checklist: [`.env.vercel.production.template`](.env.vercel.production.template).

Typical hosting: Vercel (rewrites `/api/*` → `BACKEND_PROXY_TARGET`).

---

## License

Proprietary — Teksage. All rights reserved.
