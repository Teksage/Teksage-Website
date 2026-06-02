---
name: Web parity and APIs
overview: |
  Live master document — Teksage website (Next.js) parity with Flutter mobile app + FastAPI backend.
  Updated: 2026-05-27. All Phase A–F complete. Open items: download PDF UI, chat prompts admin, parity doc.
todos:
  - id: fix-api-constants
    content: Reconcile src/lib/constants/api.ts with localhost:8000/openapi.json + Flutter api_endpoints.dart.
    status: completed
  - id: panchang-horoscope
    content: "Implement Panchang and Horoscope routes: services, hooks, UI; subscription/profile gates per Flutter."
    status: completed
  - id: predictions-match
    content: Prediction detail routes (daily/weekly/yearly/life) + match making form/details; share PDF service wired (UI disabled).
    status: completed
  - id: predictions-ui-parity
    content: Flutter UI parity for predictions + match details — yearly/life generate landing, weekly full-bleed, life purple shell, match making pink details.
    status: completed
  - id: consultation-payment
    content: Consultation listing → astrologer detail → slots → book → payment verify + coupon; align types with OpenAPI.
    status: completed
  - id: chat-ws
    content: "AI chat page: WebSocket (/chat), related_queries, chat-history, preferences onboarding."
    status: completed
  - id: settings-subpages
    content: "Settings subpages: FAQ, support, language, push prefs, subscriptions, delete account."
    status: completed
  - id: auth-redirect-mobile
    content: Post-login dialog + home default; ?redirect= on Login Now; mobile OTP tab; session clear on 401.
    status: completed
  - id: astrologer-portal
    content: "Phase F — Astrologer login routing, meetings list/detail, availability scheduler. Done."
    status: completed
  - id: notifications-page
    content: "Build /notifications page — GET /api/notifications + POST /api/notifications/update-status. Flutter: Notification/notificationPage.dart."
    status: completed
  - id: astrologer-answer-questions
    content: "Astrologer answers customer Q&A on meeting detail — PUT /api/astrologer/questions/{id}. Flutter: meetingDetailsPage.dart answer dialog."
    status: completed
  - id: auto-pay-subscription
    content: "Auto-pay subscription cycle — POST /api/payment/subscribe-auto + verify-auto-payment + cancel-auto-pay."
    status: completed
  - id: chat-prompts-admin
    content: "Chat prompts API — GET/POST /api/chat-prompts/ + PUT /api/chat-prompts/status. Admin-facing; not in web yet."
    status: pending
  - id: prediction-pdf-ui
    content: Re-enable Download PDF buttons on daily/weekly/yearly/life/match when product approves (services exist).
    status: pending
  - id: onboarding-flow
    content: "Welcome / onboarding screens (Flutter intro/welcomePage.dart, onboardingPage.dart). Built on web as /welcome + /onboarding with first-visit redirect."
    status: completed
  - id: change-contact
    content: "Change email/mobile flow (Flutter auth/change_email_mobile.dart). Added /settings/change-contact with authenticated OTP send/verify update flow."
    status: completed
  - id: doc-parity-md
    content: Add docs/FLUTTER_WEB_PARITY.md with final endpoint table and feature checklist for the team.
    status: pending
isProject: false
---

# Teksage Website — Master Parity, API & Architecture Document

> **How to use this doc:** Read the folder structure first to understand where things live. Then check the gap tables to know what to build next. All "Done" phases have working routes.

---

## 1. Website Folder Structure

```
d:\Teksage-Website\
├── public/
│   └── flutter-assets/          # Shared SVG/PNG assets mirrored from Flutter imageConstant.dart
│       ├── images/              # PNGs (banners, heroes)
│       └── svg/                 # Outline icons, nav icons, decorations
│
├── src/
│   ├── app/                     # Next.js App Router — one folder = one route
│   │   ├── layout.tsx           # Root HTML shell, <AppProviders>
│   │   ├── page.tsx             # "/" → redirects to /home
│   │   ├── globals.css          # Design tokens (@theme), CSS variables, Tailwind base
│   │   ├── api/
│   │   │   └── places/
│   │   │       └── suggestions/route.ts  # Google Places proxy (avoids CORS)
│   │   ├── (auth)/              # Unauthenticated shell (no bottom nav)
│   │   │   ├── layout.tsx
│   │   │   └── login/page.tsx   # OTP login — email + mobile tabs
│   │   └── (main)/              # Authenticated shell (bottom nav + desktop sidebar)
│   │       ├── layout.tsx       # BottomNav + DesktopMainNav + auth guard
│   │       ├── home/page.tsx    # Dashboard — predictions, match card, consultation banner
│   │       ├── panchang/page.tsx
│   │       ├── horoscope/page.tsx
│   │       ├── chat/page.tsx    # AI WebSocket chat + voice input
│   │       ├── profile/page.tsx
│   │       ├── notifications/   # ⚠️ NOT YET BUILT — pending
│   │       ├── predictions/
│   │       │   ├── daily/page.tsx
│   │       │   ├── weekly/page.tsx
│   │       │   ├── yearly/page.tsx
│   │       │   └── life/page.tsx
│   │       ├── matchmaking/
│   │       │   ├── page.tsx     # Match making form
│   │       │   └── details/page.tsx
│   │       ├── consultation/    # Customer consultation booking flow
│   │       │   ├── layout.tsx
│   │       │   ├── page.tsx     # Category selection
│   │       │   ├── language/page.tsx
│   │       │   ├── astrologers/page.tsx   # Listing
│   │       │   ├── astrologer/
│   │       │   │   ├── page.tsx           # Redirect (astrologer login guard)
│   │       │   │   └── [id]/
│   │       │   │       ├── page.tsx       # Astrologer public profile
│   │       │   │       ├── slots/page.tsx
│   │       │   │       └── checkout/page.tsx
│   │       │   └── summary/page.tsx       # Post-booking Q&A
│   │       ├── astrologer/      # Astrologer portal (astrologer login only)
│   │       │   ├── page.tsx     # Dashboard — two cards
│   │       │   ├── meetings/
│   │       │   │   ├── page.tsx           # Upcoming / Completed tabs
│   │       │   │   └── [eventId]/
│   │       │   │       ├── page.tsx       # Meeting detail — green header, Q&A
│   │       │   │       └── horoscope/page.tsx  # Customer horoscope full view
│   │       │   └── availability/page.tsx  # Slot scheduler
│   │       └── settings/
│   │           ├── page.tsx     # Settings menu
│   │           ├── [section]/page.tsx  # profile, faq, support, language,
│   │           │                       # notifications, subscriptions, terms, privacy
│   │           └── subscriptions/payment/page.tsx
│   │
│   ├── components/              # React components — never import hooks from pages directly
│   │   ├── ui/                  # shadcn/ui primitives (Button, Input, Dialog, Sheet…)
│   │   ├── common/              # Shared app-wide chrome
│   │   │   ├── AppHeader.tsx       # Reusable page AppBar with back + action slot
│   │   │   ├── BottomNav.tsx        # Mobile floating pill nav
│   │   │   ├── DesktopMainNav.tsx   # Desktop left rail (role-aware)
│   │   │   ├── DesktopNavItem.tsx
│   │   │   ├── DesktopNavAiChatCard.tsx
│   │   │   ├── DesktopNavPredictionsMenu.tsx
│   │   │   ├── DesktopNavUnlockPremium.tsx
│   │   │   ├── AuthGatedLink.tsx    # Link that prompts login when unauthenticated
│   │   │   ├── LoginPromptDialog.tsx
│   │   │   ├── LoginPromptButton.tsx
│   │   │   ├── ProtectedRoutePrompt.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── Loader.tsx
│   │   │   └── LoadingOverlay.tsx
│   │   ├── auth/
│   │   │   ├── LoginPageContent.tsx  # Tabs + post-login role routing
│   │   │   ├── LoginChrome.tsx
│   │   │   ├── LoginMethodTabs.tsx
│   │   │   ├── EmailLoginForm.tsx
│   │   │   ├── MobileLoginForm.tsx
│   │   │   └── OtpVerifyView.tsx
│   │   ├── home/
│   │   │   ├── HomeDashboardHeader.tsx   # Greeting + notification bell
│   │   │   ├── ConsultationBanner.tsx    # Role-aware hero (Book Now / My Profile)
│   │   │   ├── DailyPredictionCard.tsx
│   │   │   ├── MatchMakingCard.tsx
│   │   │   ├── PredictionCircles.tsx     # Weekly/Yearly/Life circles row
│   │   │   ├── ChatBanner.tsx
│   │   │   └── HomeChatPanel.tsx
│   │   ├── astrologer/              # Astrologer portal components
│   │   │   ├── AstrologerDashboard.tsx
│   │   │   ├── AstrologerMeetingsList.tsx
│   │   │   ├── AstrologerMeetingDetail.tsx      # Full detail with Q&A
│   │   │   ├── AstrologerMeetingDetailPage.tsx  # Page wrapper with searchParams
│   │   │   ├── AstrologerMeetingHoroscopeCard.tsx  # "Horoscope Details" + View button
│   │   │   ├── AstrologerMeetingHoroscope.tsx   # Full horoscope chart + fields
│   │   │   ├── AstrologerMeetingHoroscopePage.tsx
│   │   │   └── AstrologerAvailability.tsx
│   │   ├── consultation/            # Customer consultation flow
│   │   │   ├── ConsultationCategoryView.tsx
│   │   │   ├── ConsultationLanguageView.tsx
│   │   │   ├── ConsultationListingView.tsx
│   │   │   ├── ConsultationAstroCard.tsx
│   │   │   ├── ConsultationAstroShell.tsx
│   │   │   ├── ConsultationDetailProfileCard.tsx
│   │   │   ├── ConsultationSlotsView.tsx
│   │   │   ├── ConsultationSlotsCalendar.tsx
│   │   │   ├── ConsultationSlotsAvailability.tsx
│   │   │   ├── ConsultationSlotsShell.tsx
│   │   │   ├── ConsultationCheckoutView.tsx
│   │   │   ├── ConsultationCheckoutActions.tsx
│   │   │   ├── ConsultationBookingFeesBlock.tsx
│   │   │   ├── ConsultationBookingDetailRow.tsx
│   │   │   ├── ConsultationBookingSectionDivider.tsx
│   │   │   ├── ConsultationFlowCta.tsx
│   │   │   ├── ConsultationFilterChips.tsx
│   │   │   ├── ConsultationAuthGate.tsx
│   │   │   └── ConsultationCurrencyView.tsx (via hook)
│   │   ├── predictions/
│   │   │   ├── DailyPredictionDesktopLayout.tsx
│   │   │   ├── DailyPredictionDesktopCategoryCard.tsx
│   │   │   ├── DailyPredictionBalaPanel.tsx
│   │   │   ├── DailyPredictionConsultStrip.tsx
│   │   │   ├── WeeklyPredictionLayout.tsx
│   │   │   ├── WeeklyPredictionDayCard.tsx
│   │   │   ├── YearlyPredictionLayout.tsx
│   │   │   ├── YearlyOverviewCard.tsx
│   │   │   ├── YearlyHorizontalTrack.tsx
│   │   │   ├── YearlyCategorizedRow.tsx
│   │   │   ├── YearlyPlanetCard.tsx
│   │   │   ├── YearlyPlanetTransitsRow.tsx
│   │   │   ├── YearlyRemediesRow.tsx
│   │   │   ├── YearlyDashedDivider.tsx
│   │   │   ├── LifePredictionShell.tsx
│   │   │   ├── LifePredictionLandingLayout.tsx
│   │   │   ├── LifePredictionCardSwiper.tsx
│   │   │   ├── PredictionLandingHero.tsx
│   │   │   ├── PredictionLandingLayout.tsx
│   │   │   ├── PredictionGenerateLandingDesktop.tsx
│   │   │   └── PredictionBalaSplit.tsx
│   │   ├── panchang/
│   │   │   ├── PanchangDetailView.tsx
│   │   │   ├── PanchangDateRibbon.tsx
│   │   │   ├── PanchangPersonalizedSections.tsx
│   │   │   ├── PanchangSunTimeGrid.tsx
│   │   │   ├── PanchangExtendedTimingCard.tsx
│   │   │   ├── PanchangDottedRow.tsx
│   │   │   └── PanchangPremiumGate.tsx
│   │   ├── horoscope/
│   │   │   ├── HoroscopePage.tsx
│   │   │   ├── HoroscopeChartToggle.tsx
│   │   │   └── HoroscopeChartFrame.tsx
│   │   ├── match-making/
│   │   │   ├── MatchMakingShell.tsx
│   │   │   ├── MatchMakingFormView.tsx
│   │   │   ├── MatchMakingDetailsLayout.tsx
│   │   │   ├── MatchMakingPartnerColumn.tsx
│   │   │   ├── MatchMakingKutaTable.tsx
│   │   │   ├── MatchMakingKutaDetailsList.tsx
│   │   │   └── MatchMakingDashedLine.tsx
│   │   ├── chat/
│   │   │   ├── ChatComposer.tsx
│   │   │   ├── ChatMessageList.tsx
│   │   │   ├── ChatAppBar.tsx
│   │   │   ├── ChatInitialBanner.tsx
│   │   │   ├── ChatIntroText.tsx
│   │   │   ├── ChatStyleMenu.tsx
│   │   │   ├── ChatStyleOptionCard.tsx
│   │   │   ├── ChatOnboardingHeader.tsx
│   │   │   ├── ChatAvatarOnboarding.tsx
│   │   │   ├── ChatAvatarPicker.tsx
│   │   │   ├── ChatEmbedHeader.tsx
│   │   │   ├── ChatConsultStrip.tsx
│   │   │   └── ChatConsultBanner.tsx
│   │   ├── settings/
│   │   │   ├── ProfileDetailsForm.tsx
│   │   │   ├── ProfileDetailsFields.tsx
│   │   │   ├── ProfileAvatar.tsx
│   │   │   ├── ProfileLocationField.tsx
│   │   │   ├── SettingsFaqView.tsx
│   │   │   ├── FaqAccordionItem.tsx
│   │   │   ├── SettingsSupportView.tsx
│   │   │   ├── SettingsLanguageView.tsx
│   │   │   ├── SettingsToggle.tsx
│   │   │   ├── SettingsSubscriptionsView.tsx
│   │   │   ├── SubscriptionPlanPicker.tsx
│   │   │   ├── SubscriptionPaymentFees.tsx
│   │   │   ├── SubscriptionPaymentSummaryView.tsx
│   │   │   ├── SettingsDeleteAccountView.tsx
│   │   │   ├── SettingsLegalView.tsx
│   │   │   ├── SettingsLegalBlock.tsx
│   │   │   ├── SettingsRateDialog.tsx
│   │   │   ├── SettingsSubpageHeader.tsx
│   │   │   └── SettingsNotificationsView.tsx (push prefs)
│   │   └── providers/
│   │       └── AppProviders.tsx      # Zustand, i18n, React Query wrapping
│   │
│   ├── hooks/                   # All data-fetching hooks (use<Feature>.ts pattern)
│   │   ├── useAuth.ts               # Login, OTP, session
│   │   ├── useAuthNavigation.ts     # guardNavigation — login prompt or navigate
│   │   ├── useProfile.ts            # GET/POST profile
│   │   ├── useProfileRashiNakshatra.ts
│   │   ├── useDashboard.ts          # Home — daily prediction, match, panchang
│   │   ├── usePanchang.ts
│   │   ├── useHoroscope.ts
│   │   ├── useConsultationListing.ts
│   │   ├── useConsultationCurrency.ts
│   │   ├── useAstrologerEvents.ts   # Astrologer meetings list + detail
│   │   ├── useAstrologerAvailability.ts  # Slot fetch + save
│   │   ├── useSubscriptionPage.ts
│   │   ├── useChat.ts               # WS connection, history, send
│   │   ├── useChatStream.ts         # Streaming token handler
│   │   ├── useChatPreferences.ts
│   │   ├── useChatVoiceInput.ts
│   │   └── useT.ts                  # i18n constants hook
│   │
│   ├── lib/
│   │   ├── env.ts                   # getPublicApiBaseUrl() — reads NEXT_PUBLIC_API_BASE_URL
│   │   ├── utils.ts                 # cn(), isAstrologerHomeSession()
│   │   ├── auth-cookie.ts           # Token read/write from cookies
│   │   ├── auth-session.ts          # 401 handler, session clear
│   │   ├── login-redirect.ts        # buildLoginRedirectPath()
│   │   ├── razorpay-checkout.ts     # Razorpay SDK loader + open
│   │   ├── astrologer-slot-time.ts  # Slot ISO → display helpers
│   │   ├── astrologer-meeting-display.ts  # Name, initials, query string helpers
│   │   ├── astrologer-horoscope-display.ts  # horoscopeTextFields, hasAstrologerMeetingHoroscope
│   │   ├── horoscope-chart-srcdoc.ts
│   │   ├── horoscope-display-format.ts
│   │   ├── consultation-calendar.ts
│   │   ├── consultation-booking-format.ts
│   │   ├── consultation-categories.ts
│   │   ├── consultation-currency.ts
│   │   ├── consultation-display.ts
│   │   ├── consultation-media.ts
│   │   ├── consultation-pricing.ts
│   │   ├── consultation-session.ts
│   │   ├── chat-helpers.ts
│   │   ├── chat-preference-helpers.ts
│   │   ├── chat-preference-storage.ts
│   │   ├── chat-voice-recorder.ts
│   │   ├── panchang-time-format.ts
│   │   ├── places-suggestions.ts
│   │   ├── prediction-api-parse.ts
│   │   ├── prediction-yearly-parse.ts
│   │   ├── profile-birth-normalize.ts
│   │   ├── settings-language-storage.ts
│   │   ├── subscription-checkout-session.ts
│   │   ├── subscription-payment-totals.ts
│   │   ├── subscription-plan-label.ts
│   │   ├── subscription-plans.ts
│   │   ├── services/                # One file per backend domain
│   │   │   ├── http.ts              # Axios instance + auth interceptor
│   │   │   ├── auth.ts
│   │   │   ├── profile.ts
│   │   │   ├── profile-mapper.ts
│   │   │   ├── profile-rashi.ts
│   │   │   ├── profile-verify.ts
│   │   │   ├── home.ts
│   │   │   ├── panchang.ts
│   │   │   ├── horoscope.ts
│   │   │   ├── predictions.ts
│   │   │   ├── match-making.ts
│   │   │   ├── consultation.ts
│   │   │   ├── astrologer-portal.ts # Astrologer events + slots
│   │   │   ├── chat.ts
│   │   │   ├── chat-websocket-client.ts
│   │   │   ├── chat-transcribe.ts
│   │   │   ├── settings-profile.ts
│   │   │   ├── settings-faq.ts
│   │   │   ├── settings-support.ts
│   │   │   ├── settings-language.ts
│   │   │   ├── settings-notifications.ts
│   │   │   ├── settings-subscription.ts
│   │   │   └── settings-delete.ts
│   │   ├── constants/               # No magic strings in .tsx — define here and import
│   │   │   ├── api.ts               # All API paths (single source)
│   │   │   ├── routes.ts            # All in-app URL paths (ROUTES)
│   │   │   ├── assets.ts            # All public asset paths
│   │   │   ├── colors.ts            # Brand colours
│   │   │   ├── typography.ts        # TYPO / FONT_SIZE tokens
│   │   │   ├── auth-guard.ts        # AUTH_PATH_PREFIXES
│   │   │   ├── main-nav.ts          # Bottom nav items + icons
│   │   │   ├── home-layout.ts       # Layout dimension tokens
│   │   │   ├── home-dashboard.ts    # Home copy constants
│   │   │   ├── home-dashboard-sidebar.ts  # Desktop sidebar copy + icons
│   │   │   ├── home-dashboard-ui.ts
│   │   │   ├── desktop-sidebar-nav.ts   # Sidebar link definitions (role-aware)
│   │   │   ├── astrologer-portal.ts # ASTRO_PORTAL_UI, ASTRO_PORTAL_COLORS, MEETING_DETAIL_QUERY
│   │   │   ├── consultation-*.ts    # Consultation step copy + config
│   │   │   ├── prediction-*.ts      # Prediction screen copy + layout
│   │   │   ├── panchang-screen.ts
│   │   │   ├── horoscope-screen.ts
│   │   │   ├── match-making-screen.ts
│   │   │   ├── chat-*.ts
│   │   │   ├── settings-*.ts
│   │   │   ├── legal/               # Terms and privacy block arrays
│   │   │   └── index.ts             # Re-exports all constants
│   │   └── i18n/                    # Lightweight i18n (Hindi locale stub)
│   │       ├── index.ts
│   │       ├── locale.ts
│   │       ├── translate.ts
│   │       ├── server-locale.ts
│   │       └── messages/
│   │           ├── index.ts
│   │           └── hi.json
│   │
│   ├── types/                   # TypeScript types — .ts only, never in .tsx
│   │   ├── index.ts             # Barrel re-exports everything
│   │   ├── user-profile.ts      # UserProfile, AuthUser
│   │   ├── astrology.ts         # Shared astrology primitives
│   │   ├── astrologer-portal.ts # AstroEvent, AstroEventDetail, AstroHoroscope, AstroSlot
│   │   ├── consultation.ts
│   │   ├── prediction-detail.ts
│   │   ├── prediction-yearly.ts
│   │   ├── match-making.ts
│   │   ├── match-making-ui.ts
│   │   ├── chat.ts
│   │   ├── chat-preferences.ts
│   │   ├── settings.ts
│   │   ├── settings-legal.ts
│   │   ├── login-flow.ts
│   │   └── ui/                  # Component prop types only
│   │       ├── common.ts
│   │       ├── auth.ts
│   │       ├── auth-gated-link.ts
│   │       ├── home.ts
│   │       ├── desktop-nav.ts
│   │       ├── panchang-horoscope.ts
│   │       ├── consultation.ts
│   │       ├── astrologer-portal.ts   # AstrologerMeetingDetailProps etc.
│   │       ├── settings.ts
│   │       ├── chat.ts
│   │       └── loader-display.ts
│   │
│   ├── store/
│   │   └── auth.store.ts        # Zustand — { user, token, setUser, clear }
│   │
│   └── contexts/
│       └── AppLoaderContext.tsx  # Global loading overlay context
│
├── docs/                        # Team-facing documentation
│   ├── MANUAL_TEST_API_ENDPOINTS.md
│   ├── MANUAL_TEST_PANCHANG_HOROSCOPE.md
│   └── MANUAL_TEST_PREDICTIONS_MATCHMAKING.md
│
├── .env.local                   # NEXT_PUBLIC_API_BASE_URL + Razorpay keys (not committed)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 2. Flutter App Screen → Web Page Map

### 2a. Auth

| Flutter screen | Web route | Status |
|---|---|---|
| `auth/login_with_mobile.dart` | `/login` (mobile OTP tab) | ✅ Done |
| `auth/login_with_email.dart` | `/login` (email OTP tab) | ✅ Done |
| `auth/change_email_mobile.dart` | Not built | ⚠️ Pending — see `change-contact` todo |
| `auth/password.dart` | N/A (password unused in production) | — |
| `intro/splashScreen.dart` | N/A (Next.js handles loading) | — |
| `intro/welcomePage.dart` | `app/(auth)/welcome/page.tsx`, `components/onboarding/WelcomePageContent.tsx` | ✅ Implemented (web welcome entry) |
| `intro/onboardingPage.dart` | `app/(auth)/onboarding/page.tsx`, `components/onboarding/OnboardingPageContent.tsx` | ✅ Implemented (carousel + login handoff) |

### 2b. Home & nav

| Flutter screen | Web route | Status |
|---|---|---|
| `Home/homePage.dart` | `/home` | ✅ Done |
| `Home/bottomNavigation.dart` | `BottomNav.tsx` | ✅ Done |
| `Home/bottonNavController.dart` | `(main)/layout.tsx` | ✅ Done |
| `Notification/notificationPage.dart` | `/notifications` | ✅ Done — General + Consultation tabs |

### 2c. Predictions & Panchang

| Flutter screen | Web route | Status |
|---|---|---|
| `Panchang/panchangPage.dart` | `/panchang` | ✅ Done |
| `Panchang/emptyPanchangPage.dart` | `/panchang` empty state | ✅ Done |
| `Horoscope/horoscopePage.dart` | `/horoscope` | ✅ Done |
| `prediction/dailyPrediction.dart` | `/predictions/daily` | ✅ Done |
| `prediction/weeklyPrediction.dart` | `/predictions/weekly` | ✅ Done |
| `prediction/yearlyPrediction.dart` | `/predictions/yearly` | ✅ Done |
| `prediction/lifePrediction.dart` | `/predictions/life` | ✅ Done |
| `MatchMaking/matchMakingPage.dart` | `/matchmaking` | ✅ Done |
| `MatchMaking/matchMakingDetails.dart` | `/matchmaking/details` | ✅ Done |

### 2d. AI Chat

| Flutter screen | Web route | Status |
|---|---|---|
| `Chat/chat.dart` | `/chat` | ✅ Done |
| `Chat/chatAvatar.dart` | `ChatAvatarPicker.tsx` (in chat) | ✅ Done |
| `Chat/chatStyle.dart` | `ChatStyleMenu.tsx` (in chat) | ✅ Done |

### 2e. Consultation — customer flow

| Flutter screen | Web route | Status |
|---|---|---|
| `ConsultationUser/userConsultationHomePage.dart` | `/consultation` | ✅ Done |
| `ConsultationUser/userCategory.dart` | `/consultation` (categories) | ✅ Done |
| `ConsultationUser/userSelectLanguage.dart` | `/consultation/language` | ✅ Done |
| `ConsultationUser/userHome.dart` | `/consultation/astrologers` | ✅ Done |
| `ConsultationUser/astrologerDetailpage.dart` | `/consultation/astrologer/[id]` | ✅ Done |
| `ConsultationUser/userBookingPage.dart` | `/consultation/astrologer/[id]/slots` | ✅ Done |
| `ConsultationUser/userBookingDetailspage.dart` | `/consultation/astrologer/[id]/checkout` | ✅ Done |
| `ConsultationUser/userBookingComplete.dart` | Inline after payment verify | ✅ Done |
| `ConsultationUser/userBookingSummary.dart` | `/consultation/summary` | ✅ Done |
| `ConsultationUser/UserBookingSummaryHome.dart` | `/consultation/summary` (home tab) | ✅ Done |

### 2f. Astrologer portal

| Flutter screen | Web route | Status |
|---|---|---|
| `Astrologer/homePage.dart` | `/astrologer` | ✅ Done |
| `Astrologer/myMeetingsPage.dart` | `/astrologer/meetings` | ✅ Done |
| `Astrologer/meetingDetailsPage.dart` | `/astrologer/meetings/[eventId]` | ✅ Done |
| `Astrologer/horoscopeDetailPage.dart` | `/astrologer/meetings/[eventId]/horoscope` | ✅ Done |
| `Astrologer/myAvailabilityPage.dart` | `/astrologer/availability` | ✅ Done |
| Q&A answer dialog in meeting detail | Not built | ⚠️ Pending — see `astrologer-answer-questions` todo |

### 2g. Settings

| Flutter screen | Web route | Status |
|---|---|---|
| `settings/settings_page.dart` | `/settings` | ✅ Done |
| `settings/profile_page.dart` | `/settings/profile` (or `/profile`) | ✅ Done |
| `settings/faq_page.dart` | `/settings/faq` | ✅ Done |
| `settings/support_page.dart` | `/settings/support` | ✅ Done |
| `settings/t&c_page.dart` | `/settings/terms` | ✅ Done |
| `settings/privacy_page.dart` | `/settings/privacy` | ✅ Done |
| `settings/app_language_page.dart` | `/settings/language` | ✅ Done |
| `settings/pushNotification.dart` | `/settings/notifications` | ✅ Done |
| `settings/DeleteAccount/deleteAccount_mainPage.dart` | `/settings/delete-account` | ✅ Done |
| `settings/DeleteAccount/deleteOTPScreen.dart` | Inline in delete flow | ✅ Done |
| `settings/Subscription/subscription_home_page.dart` | `/settings/subscriptions` | ✅ Done |
| `settings/Subscription/paymentSummary.dart` | `/settings/subscriptions/payment` | ✅ Done |
| `settings/Subscription/subscription_home_page_ios.dart` | N/A — iOS only | — |
| `settings/Subscription/subscription_details_page_IOS.dart` | N/A — iOS only | — |

---

## 3. Backend API → Web Coverage

### 3a. APIs fully covered in `src/lib/constants/api.ts`

| API | Web constant | Used |
|---|---|---|
| `POST /api/auth/otp/request` | `sendOtp` | ✅ Login |
| `POST /api/auth/otp/login-verify` | `verifyOtp` | ✅ Login |
| `POST /api/auth/otp/send-authenticated` | `sendAuthenticatedOtp` | ✅ Delete account flow |
| `POST /api/auth/otp/verify` | `verifyAuthenticatedOtp` | ✅ Delete account flow |
| `POST /api/auth/refresh` | `refreshToken` | ✅ http.ts interceptor |
| `POST /api/auth/logout` | `logout` | ✅ Settings |
| `GET /api/auth/timezone/update` | `timezoneUpdate` | ✅ Profile |
| `GET/PUT /api/auth/maintain_history` | `maintainHistory` | ✅ Chat history toggle |
| `GET /api/auth/profile` | `profile` | ✅ Profile page |
| `POST /api/auth/update-profile` | `updateProfile` | ✅ Profile edit |
| `GET /api/auth/horoscope` | `horoscope` | ✅ Horoscope page |
| `POST /api/auth/rashi-nakshatra` | `rashiNakshatra` | ✅ Profile gate |
| `POST /api/auth/support` | `support` | ✅ Settings support |
| `POST /api/auth/notify-update` | `notifyUpdate` | ✅ Settings push prefs |
| `POST /api/auth/register-token/` | `registerToken` | Wired, optional |
| `POST /api/auth/update-app-language` | `updateAppLanguage` | ✅ Language settings |
| `PUT /api/auth/update-chat-format` | (in `chat.ts`) | ✅ Chat preferences |
| `GET /api/auth/delete/request` | `deleteAccountRequest` | ✅ Delete account |
| `POST /api/auth/delete/confirm` | `deleteAccountConfirm` | ✅ Delete account |
| `GET /api/notifications` | `notifications` | ✅ `/notifications` General tab |
| `POST /api/notifications/update-status` | `notificationsUpdateStatus` | ✅ Mark read + Clear all |
| `GET /api/countries` | `countries` | ✅ Login mobile form |
| `POST /api/share/{type}` | `share*` constants | Service only, UI disabled |
| `GET /api/prediction/daily` | `dailyPrediction` | ✅ |
| `GET /api/prediction/weekly` | `weeklyPrediction` | ✅ |
| `GET /api/prediction/yearly` | `yearlyPrediction` | ✅ |
| `GET /api/prediction/life` | `lifePrediction` | ✅ |
| `GET /api/prediction/panchang` | `panchang` | ✅ |
| `POST /api/prediction/related_queries` | `relatedQueries` | ✅ Chat |
| `GET/POST /api/prediction/compatibility` | `matchMakingCompatibility` | ✅ |
| `GET /api/horoscope/download` | `horoscopeDownload` | Constant only |
| `GET/POST /api/astrologer/filter` | `astrologerFilter` | ✅ Consultation listing |
| `GET /api/astrologer/astrologer/{id}` | `astrologerDetail` | ✅ Consultation detail |
| `POST /api/astrologer/slots` | `astrologerSlots` | ✅ Slots picker + astrologer availability |
| `POST /api/astrologer/slots/create` | `astrologerSlotsCreate` | ✅ Astrologer save slots |
| `POST /api/astrologer/book` | `astrologerBook` | ✅ Consultation checkout |
| `GET /api/astrologer/events` | `astroEvents` | ✅ Astrologer meetings list |
| `GET /api/astrologer/events/{id}` | `astroEvents + "/${id}"` | ✅ Meeting detail |
| `PUT /api/astrologer/questions/{id}` | `astrologerQuestions` | **Not used** — astrologer Q&A answer ⚠️ |
| `GET /api/astrologer/events/{id}/questions` | `astroEvents + "/questions"` | ✅ Customer summary |
| `POST /api/astrologer/events/{id}/questions` | same | ✅ Customer submits questions |
| `POST /api/payment/apply-coupon` | `paymentApplyCoupon` | ✅ Checkout |
| `POST /api/payment/verify-payment/` | `paymentVerify` | ✅ Checkout |
| `POST /api/payment/subscribe` | `paymentSubscribe` | ✅ Subscriptions |
| `GET /api/admin/service-catalogs/` | `serviceCatalogs` | ✅ Subscription plans |
| `GET /api/faq/` | `faq` | ✅ FAQ settings |
| `GET /api/chat-history` | `chatHistory` | ✅ Chat history |
| `POST /api/chat-history/download` | `chatHistoryDownload` | Constant only |
| `GET/POST /api/download-chat-pdf` | `downloadChatPdf` | Constant only |
| `POST /api/transcribe-audio` | `transcribeAudio` | ✅ Voice input |

### 3b. APIs in backend NOT yet in `api.ts` or not implemented

| API | Priority | What it does | Todo |
|---|---|---|---|
| `POST /api/payment/subscribe-auto` | Medium | Auto-pay / recurring subscription | `auto-pay-subscription` |
| `POST /api/payment/verify-auto-payment/` | Medium | Verify auto-pay | same |
| `POST /api/payment/cancel-auto-pay` | Medium | Cancel subscription auto-renewal | same |
| `GET/POST /api/chat-prompts/` | Low | Chat prompt admin CRUD | `chat-prompts-admin` |
| `PUT /api/chat-prompts/status` | Low | Enable/disable prompt | same |
| `PUT /api/astrologer/events/{id}` | Low | Update event status (e.g. mark completed) | — |
| `DELETE /api/astrologer/questions/{id}` | Low | Delete a question | — |
| `GET /api/auth/rashi` / `GET /api/astrologer/nakshatra` | Low | Lookup lists | `astrologerRashi/Nakshatra` already in api.ts |

---

## 4. Pending Work (priority order)

### P1 — Notifications page ✅ Done

**Route:** `/notifications` (optional `?tab=consultation`)

**Files:** `src/app/(main)/notifications/page.tsx`, `src/components/notifications/*`, `src/hooks/useNotifications.ts`, `src/lib/services/notifications.ts`, `src/lib/constants/notifications-screen.ts`

---

### P2 — Astrologer: answer customer questions ✅

**What:** On the meeting detail page, the astrologer can type an answer to each customer question via `PUT /api/astrologer/questions/{question_id}`.

**Flutter ref:** `meetingDetailsPage.dart` → `answerDialog.dart`

**Done (web):** `updateAstrologerQuestionAnswer` in `astrologer-portal.ts`; `AstrologerMeetingQuestionsSection` + `AstrologerAnswerQuestionDialog`; reload via `useAstrologerEventDetail.reload`; post-consultation gate matches Flutter.

---

### P3 — Auto-pay subscription cycle ✅

**What:** Subscription auto-renew — create order via `POST /api/payment/subscribe-auto`, verify via `POST /api/payment/verify-auto-payment/`, cancel via `POST /api/payment/cancel-auto-pay`.

**Done (web):** API constants + `settings-subscription.ts` helpers; Razorpay subscription checkout; auto-renew toggle on subscriptions + payment pages (monthly INR plan); cancel auto-renew on active subscription card.

---

### P4 — Change email / mobile

**What:** Authenticated user changes their contact via OTP — uses `sendAuthenticatedOtp` + `verifyAuthenticatedOtp` (already in `api.ts`).

**Flutter ref:** `auth/change_email_mobile.dart`

**Implementation steps:**
1. Add route `/settings/change-contact` (or modal)
2. Add `src/components/settings/ChangeContactView.tsx`
3. Re-use existing OTP hooks (`useAuth.ts` — `sendAuthenticatedOtp`, `verifyAuthenticatedOtp`)
4. Add link from `/settings` or profile page

---

### P5 — Onboarding / welcome screens

**What:** First-launch welcome + onboarding carousel.

**Flutter ref:** `intro/welcomePage.dart`, `intro/onboardingPage.dart`

**Decision required:** Skip (web handles first visit via `/login`) or build as `/welcome` route only shown pre-login.

---

### P6 — Download PDF UI (predictions / chat)

**What:** Re-enable PDF download buttons on daily / weekly / yearly / life / match making. Services in `predictions.ts` and `match-making.ts` already call `GET /api/share/{type}`. Buttons are commented out pending product approval.

---

## 5. Role-based behaviour quick-reference

| | Customer | Astrologer |
|---|---|---|
| Login | Same OTP flow | Same OTP flow |
| `user_type` in profile | `"customer"` | anything else (e.g. `"astrologer"`) |
| Home banner CTA | **Book Now** → `/consultation` | **My Profile** → `/astrologer` |
| Desktop sidebar (where book link was) | **Book Astrologer Consultation** | **My Profile** |
| `/astrologer` route | Redirected to `/home` | Dashboard (2 cards) |
| `/consultation/*` route | Full booking flow | Blocked (guard redirects) |

---

## 6. Key conventions (must follow in every file)

| Rule | Where |
|---|---|
| No hardcoded colors | `src/lib/constants/colors.ts` or CSS `var(--color-brand-*)` |
| No hardcoded font styles | `TYPO` / `FONT_SIZE` from `typography.ts` |
| No hardcoded asset paths | `PUBLIC_ASSETS`, `DASHBOARD_ASSETS`, `ASTROLOGER_ASSETS`, etc. from `assets.ts` |
| No hardcoded strings/numbers in `.tsx` | Define in `src/lib/constants/*.ts` |
| No inline `style={{}}` | Tailwind classes; dynamic values → `globals.css` `@theme` var |
| No types in `.tsx` | Types in `src/types/**/*.ts` only |
| Route paths | `ROUTES` from `routes.ts` |
| API paths | `API_ENDPOINTS` from `api.ts` |
| Data fetching | `use<Feature>.ts` hook → `src/lib/services/<domain>.ts` → `http.ts` |
| Conditional classes | `cn()` from `src/lib/utils.ts` |
| UI primitives | shadcn/ui in `src/components/ui/` |
| Files ≤200 lines | Split into focused sub-files |
| Backend base URL | `NEXT_PUBLIC_API_BASE_URL` in `.env.local` via `getPublicApiBaseUrl()` |

---

## 7. Manual test docs

| Doc | Scope |
|---|---|
| `docs/MANUAL_TEST_API_ENDPOINTS.md` | Auth, profile, core API smoke |
| `docs/MANUAL_TEST_PANCHANG_HOROSCOPE.md` | Panchang + horoscope tabs |
| `docs/MANUAL_TEST_PREDICTIONS_MATCHMAKING.md` | Daily / weekly / yearly / life + match making |
| Astrologer portal | No dedicated doc yet — use `/astrologer`, `/astrologer/meetings`, `/astrologer/availability` manually |

---

## 8. Flutter quick reference paths

| Concern | Flutter path |
|---|---|
| Role on home | `lib/Screens/Home/homePage.dart` |
| Astrologer home | `lib/Screens/Astrologer/homePage.dart` |
| Meetings | `lib/Screens/Astrologer/myMeetingsPage.dart`, `lib/Components/Astrologer/meetingList.dart` |
| Availability | `lib/Screens/Astrologer/myAvailabilityPage.dart` |
| Meeting detail | `lib/Screens/Astrologer/meetingDetailsPage.dart` |
| Horoscope detail | `lib/Screens/Astrologer/horoscopeDetailPage.dart` |
| Notifications | `lib/Screens/Notification/notificationPage.dart` |
| Events API | `lib/Services/Astrologer-user/eventsService.dart` |
| Slots API | `lib/Services/Astrologer-user/slotService.dart` |
| Flutter endpoints | `lib/config/api_endpoints.dart` |
| Web role helper | `src/lib/utils.ts` → `isAstrologerHomeSession` |
| Web auth store | `src/store/auth.store.ts` → `user.userType` |
