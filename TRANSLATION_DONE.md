# Teksage Translation Update Report

Date: 16 September 2026

Reusable procedure: `docs/TRANSLATION_WORKFLOW.md`

## Result

Translation catalog preparation and Google Cloud Translation are complete for:

- English (`en_US`) as the unchanged source language
- Tamil (`ta`)
- Hindi (`hi`)
- Telugu (`te_IN`)
- Kannada (`kn_IN`)
- Malayalam (`ml_IN`)
- Marathi (`mr_IN`)

No website or mobile UI layouts/components were changed during this work.

## Website coverage

The website JSON catalogs now contain translated copy for:

- Consultation astrologer details
- Consultation slot selection
- Consultation checkout and payment
- Astrologer dashboard
- Astrologer meetings and meeting details
- Astrologer availability
- Astrologer Ask Requests and answer flow
- Profile details and verification messages
- Subscription plans, auto-renewal and payment
- Daily, weekly, yearly and life prediction states
- Panchang status, error and access messages
- FAQ loading copy
- Shared accessibility labels
- Event Planner
- Full Horoscope

Files updated:

- `src/lib/i18n/messages/en_US.json`
- `src/lib/i18n/messages/ta.json`
- `src/lib/i18n/messages/hi.json`
- `src/lib/i18n/messages/te_IN.json`
- `src/lib/i18n/messages/kn_IN.json`
- `src/lib/i18n/messages/ml_IN.json`
- `src/lib/i18n/messages/mr_IN.json`

## Mobile coverage

`lib/config/localeString.dart` now contains translated copy for:

- Onboarding and app-language copy present in the locale catalog
- Privacy Policy and Terms & Conditions copy
- AI Chat download, sharing and error messages
- Feature-discovery copy
- Astrologer Ask Requests and answer submission
- Astrologer meetings, details and availability
- Horoscope and Panchang sharing/status messages
- Daily, weekly, yearly and life prediction messages
- Match Making validation and sharing
- Consultation booking and language selection
- Subscription and payment flows
- Notifications and Support messages
- Login, permissions, country selection and upgrade messages
- Event Planner
- Full Horoscope entry points

Only `lib/config/localeString.dart` was changed for mobile localization data.

## Translation reuse

For mobile Event Planner and Full Horoscope:

- 70 feature keys were reviewed.
- 60 matching translations per language were reused from the website catalogs.
- Mobile-only keys were translated through Google Cloud Translation.
- Native language names are intentionally displayed in their own scripts for every locale.
- Product names and acronyms such as Teksage, WhatsApp, YouTube, OTP and `24/7` are intentionally preserved where appropriate.

## Google Cloud usage

The work used the Cloud Translation Basic v2 NMT endpoint.

- The first successful full mobile run processed 24,478 source characters.
- The Unicode repair run processed 2,336 source characters.
- The six website runs reported approximately 36,129 source characters.
- One failed-before-write Tamil mobile attempt also reached the API.
- Total observed/estimated usage is about 67,000 characters.
- This remains well below the 500,000-character monthly NMT allowance.

Google Cloud may report a slightly different total because protected placeholder markers are also counted.

## Problems found and fixed

- Fixed UTF-8 response decoding where a multibyte character could be split across network chunks.
- Reset and retranslated 51 corrupted mobile values.
- Added preflight file-update validation before API requests.
- Added support for inserting locale keys missing from a target mobile map.
- Fixed parsing and updating of both single-quoted and double-quoted Dart entries.
- Strengthened placeholder protection so Google cannot translate `{count}`, `@name` or similar tokens silently.
- Corrected the altered Kannada `+{count}` placeholder.
- Added missing `+{count}` parity entries to target website catalogs.

## Validation completed

Website:

- All seven JSON files parse successfully.
- Every target locale contains all 1,010 English source keys.
- All target locales report zero pending translatable stubs.
- Placeholder comparison reports zero mismatches.
- No replacement characters or temporary placeholder markers remain.
- No new linter diagnostics were found.

Mobile:

- Every target map reports zero pending translatable stubs.
- No replacement characters or temporary placeholder markers remain.
- `dart analyze lib/config/localeString.dart` completes with 20 existing duplicate-key/file-name warnings.
- No additional analyzer warning remains from the translation process.
- Git whitespace validation passes.

## Reusable scripts

- `translate-locales.mjs` translates only untranslated values.
- `scripts/translation-config.json` lists intentional shared/native values that must not be sent repeatedly.
- Website and mobile now have always-applied Cursor localization rules.

Examples:

```powershell
# Preview without an API call
node translate-locales.mjs --dry-run --show-keys

# Translate one website file
node translate-locales.mjs --website-only --lang=ta

# Translate new mobile stubs
node translate-locales.mjs --mobile-only
```

## Remaining manual work

- Test every listed page in all six non-English languages on actual website and mobile builds.
- Have native-language reviewers verify astrology terminology and sentence quality.
- Some mobile copy may still require future `.tr` wiring where a UI file currently uses a hardcoded string. That wiring was intentionally not changed because this task prohibited UI changes.
- For future features, add the English source and six target stubs, then run a dry run. The script automatically sends only new stubs, so no feature manifest is needed.

