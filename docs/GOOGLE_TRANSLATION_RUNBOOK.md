# Google Cloud Translation Runbook

Use this runbook with `docs/TRANSLATION_WORKFLOW.md` and
`translate-locales.mjs`.

## API used

The translation script calls Cloud Translation Basic v2 using the NMT text
translation endpoint. Translation runs locally and is never called by the
website or mobile application at runtime.

## Free allowance and pricing

At the time this guide was written:

- The first 500,000 NMT text characters each month are free.
- Google applies this as a monthly credit of up to USD 10.
- Basic and Advanced NMT usage share this allowance.
- Unused allowance does not roll over.
- Usage above 500,000 characters costs USD 20 per million characters.
- Document, Translation LLM and Adaptive Translation pricing is different.

Verify current pricing before every large run:
https://cloud.google.com/products/translate/pricing

The script's `--budget` protection applies to one run. It cannot read the
project's existing monthly usage, so check Google Cloud before translating.

## Create and restrict a key

In Google Cloud Console:

1. Select the correct project.
2. Enable Cloud Translation API.
3. Open **APIs & Services → Credentials**.
4. Create an API key.
5. Restrict the key to Cloud Translation API.
6. Add an IP restriction when practical.

Never paste the key into chat, source code, Git or a committed environment
file.

Load it without displaying it in PowerShell:

```powershell
$secureKey = Read-Host "Enter API key" -AsSecureString
$env:GOOGLE_TRANSLATE_API_KEY = [Net.NetworkCredential]::new("", $secureKey).Password
[bool]$env:GOOGLE_TRANSLATE_API_KEY
```

The final command must return `True`.

## Preview usage

Run a dry-run before any paid API call:

```powershell
node translate-locales.mjs --dry-run --show-keys
```

Review the pending keys and character count. Do not continue if the projected
run plus current monthly usage could exceed the intended budget.

## Monitor usage

In Google Cloud Console:

1. Open **APIs & Services → Cloud Translation API → Metrics** to see requests,
   errors and latency.
2. Open **Cloud Translation API → Quotas & System Limits** to see processed
   character usage.
3. Open **Billing → Reports**, expand filters, and select Cloud Translation
   when available.
4. Use **IAM & Admin → Quotas & System Limits** to lower quotas when required.

Billing data may take 24–48 hours to appear. A service with zero net cost may
not immediately appear in Billing Reports. The free allowance usually does not
have a separate activation badge. Usage below 500,000 characters with zero net
cost indicates that the allowance is being applied.

## Common errors

`ERROR: provide --api-key` means the environment variable is empty.

```powershell
[bool]$env:GOOGLE_TRANSLATE_API_KEY
```

Authentication or permission errors require checking the API restriction,
project selection, billing status and whether Cloud Translation API is enabled.

Never rerun blindly after a partial failure. Validate changed files and run a
dry-run to determine what remains.

## Remove access after completion

```powershell
Remove-Item Env:GOOGLE_TRANSLATE_API_KEY
Remove-Variable secureKey
Clear-History
```

Delete the temporary API key in **APIs & Services → Credentials** when it is no
longer required. Disabling the Cloud Translation API is optional.

