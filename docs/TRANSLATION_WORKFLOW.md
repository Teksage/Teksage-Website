# Translation Workflow

Permanent workflow for website and mobile localization. See
`TRANSLATION_DONE.md` for the 16 September 2026 completion report.

## Supported locales

- English source: `en_US`
- Tamil: `ta`
- Hindi: `hi`
- Telugu: `te_IN`
- Kannada: `kn_IN`
- Malayalam: `ml_IN`
- Marathi: `mr_IN`

## Required behavior for new features

Every new feature with user-visible text must include localization during its
initial implementation, even when multilingual support is not explicitly
requested.

1. Reuse an existing translation key when possible.
2. Add every new English source key.
3. Add the same English value as a stub in all six target locales.
4. Wire the UI through the existing localization function.
5. Run the translation dry-run and report the pending character count.
6. Give the user the exact command needed for the next file.

## Adding website keys

Website catalogs are stored in `src/lib/i18n/messages/`.

Add the English text to `en_US.json`:

```json
{
  "Your new feature title": "Your new feature title",
  "Welcome, {name}": "Welcome, {name}"
}
```

Add identical temporary stubs to `ta.json`, `hi.json`, `te_IN.json`,
`kn_IN.json`, `ml_IN.json`, and `mr_IN.json`:

```json
{
  "Your new feature title": "Your new feature title",
  "Welcome, {name}": "Welcome, {name}"
}
```

Use the existing website translation hooks such as `t()` or
`useI18nConstants()`. Do not hardcode a second copy of the text in a component.

## Adding mobile keys

Mobile translations are stored in
`D:\Teksage-Mobile-App\lib\config\localeString.dart`.

Add the English source to the `en_US` map:

```dart
'Your new feature title': 'Your new feature title',
'Welcome, @name': 'Welcome, @name',
```

Add identical English stubs to the `ta`, `hi`, `te_IN`, `kn_IN`, `ml_IN`, and
`mr_IN` maps. Wire the UI with GetX:

```dart
'Your new feature title'.tr
'Welcome, @name'.trParams({'name': userName})
```

Do not create punctuation or apostrophe variants of an existing key.

## Placeholder safety

These values must remain exactly unchanged in every locale:

- Website placeholders: `{name}`, `{count}`
- Mobile placeholders: `@name`, `@count`
- Format tokens: `%s`, `%d`
- URLs, escaped newlines, arrows and interpolation markers

Add intentional native/shared values such as product names or acronyms to
`scripts/translation-config.json` if they must remain identical.

## Dry-run before using Google

Run commands from `D:\teksage-website`.

Preview website work:

```powershell
node translate-locales.mjs --dry-run --website-only --show-keys
```

Preview mobile work:

```powershell
node translate-locales.mjs --dry-run --mobile-only --show-keys
```

The dry-run does not call Google or modify locale files. The script scans the
complete catalogs but sends only values that still match their English source.
Therefore, newly added feature stubs can be translated without a feature
manifest.

## Secure API-key setup

Never paste an API key into chat, source code or a committed environment file.

Use a restricted key that can call only Cloud Translation API:

```powershell
$secureKey = Read-Host "Enter API key" -AsSecureString
```

It ask to enter API key : you can enter it which we get from google cloud console

```powershell
$env:GOOGLE_TRANSLATE_API_KEY = [Net.NetworkCredential]::new("", $secureKey).Password
```

Confirm that a value is loaded without printing it

```powershell
[bool]$env:GOOGLE_TRANSLATE_API_KEY
```

## Translate one physical file at a time

Mobile has one physical catalog containing all target locale maps:

```powershell
node translate-locales.mjs --mobile-only
```

Website locale files should be processed and validated individually:

```powershell
node translate-locales.mjs --website-only --lang=ta
node translate-locales.mjs --website-only --lang=hi
node translate-locales.mjs --website-only --lang=te_IN
node translate-locales.mjs --website-only --lang=kn_IN
node translate-locales.mjs --website-only --lang=ml_IN
node translate-locales.mjs --website-only --lang=mr_IN
```

After each command, run the corresponding dry-run again. It should report
`nothing to translate`.

## Google Cloud free usage and monitoring

See `docs/GOOGLE_TRANSLATION_RUNBOOK.md` for pricing, free allowance, dashboard
monitoring, API-key security and troubleshooting.

## Validation

After each translated file:

- Parse every website JSON file.
- Verify every target includes all `en_US` keys.
- Compare placeholders against the English source.
- Search for Unicode replacement character `�`.
- Search for temporary placeholder markers.
- Run `git diff --check`.

For mobile, also run:

```powershell
dart analyze lib/config/localeString.dart
```

Record existing warnings separately from newly introduced problems.
Automated checks cannot verify linguistic quality, so manually review each
screen with a native-language reviewer before release.

## Remove credentials after translation

```powershell
Remove-Item Env:GOOGLE_TRANSLATE_API_KEY
Remove-Variable secureKey
Clear-History
```

Delete the temporary Google API key when it is no longer required. Disabling
the entire Cloud Translation API is optional.

## Required agent completion message

After implementing localization, the agent must report:

- Feature/pages covered
- Number of English and target keys added
- Dry-run character count
- Exact next translation command
- Google Cloud usage-check location
- Validation results and existing warnings
- Screens requiring manual linguistic QA

