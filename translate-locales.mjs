#!/usr/bin/env node
/**
 * translate-locales.mjs
 * ─────────────────────
 * Translates passthrough stubs in website JSON locale files AND
 * mobile localeString.dart using Google Cloud Translation API v2 (NMT).
 *
 * Usage:
 *   node translate-locales.mjs --dry-run
 *   node translate-locales.mjs --api-key=YOUR_KEY
 *   node translate-locales.mjs --api-key=YOUR_KEY --lang=ta,hi
 *
 * Options:
 *   --dry-run          Count characters without calling API
 *   --api-key=KEY      Google Cloud Translation API key
 *   --lang=ta,hi,...   Only translate these locales (default: all 6)
 *   --show-keys        Print pending keys during a dry run
 *   --website-only     Skip mobile file
 *   --mobile-only      Skip website files
 *   --budget=500000    Max characters per run (default: 500000 = free tier limit)
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config ────────────────────────────────────────────────────────────────────
const WEBSITE_LOCALES_DIR = path.join(__dirname, 'src/lib/i18n/messages');
const MOBILE_LOCALE_FILE  = path.join(__dirname, '../Teksage-Mobile-App/lib/config/localeString.dart');
const TRANSLATION_CONFIG_FILE = path.join(__dirname, 'scripts/translation-config.json');

const LOCALE_CODES = {
  ta:    'ta',
  hi:    'hi',
  te_IN: 'te',
  kn_IN: 'kn',
  ml_IN: 'ml',
  mr_IN: 'mr',
};

// Placeholders to protect during translation
// These patterns will be replaced with tokens before sending to API
const PLACEHOLDER_RE = /(\{[^}]+\}|@[a-zA-Z_]+|←|→|%s|%d|\\\n)/g;

const FREE_TIER_CHARS = 500_000;
const BATCH_SIZE      = 128; // strings per API call

// ── CLI args ──────────────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);

const DRY_RUN      = 'dry-run' in args;
const API_KEY      = args['api-key'] ?? process.env.GOOGLE_TRANSLATE_API_KEY ?? '';
const BUDGET       = Number(args['budget'] ?? FREE_TIER_CHARS);
const SKIP_WEBSITE = 'mobile-only' in args;
const SKIP_MOBILE  = 'website-only' in args;
const ONLY_LANGS   = args['lang'] ? String(args['lang']).split(',') : Object.keys(LOCALE_CODES);
const SHOW_KEYS    = 'show-keys' in args;
const TRANSLATION_CONFIG = JSON.parse(
  fs.readFileSync(TRANSLATION_CONFIG_FILE, 'utf8'),
);
const INTENTIONAL_SHARED_KEYS = new Set(
  TRANSLATION_CONFIG.intentionallySharedKeys ?? [],
);

if (!DRY_RUN && !API_KEY) {
  console.error('ERROR: provide --api-key=YOUR_KEY or use --dry-run');
  process.exit(1);
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function protectPlaceholders(str) {
  const tokens = [];
  const markers = [];
  const masked = str.replace(PLACEHOLDER_RE, (m) => {
    const idx = tokens.length;
    tokens.push(m);
    const marker = `[[[987654${idx}456789]]]`;
    markers.push(marker);
    return marker;
  });
  return { masked, tokens, markers };
}

function restorePlaceholders(str, protection) {
  let restored = str;
  for (let index = 0; index < protection.tokens.length; index += 1) {
    const marker = protection.markers[index];
    if (!restored.includes(marker)) {
      throw new Error(
        `Translation API altered protected placeholder ${protection.tokens[index]}`,
      );
    }
    restored = restored.split(marker).join(protection.tokens[index]);
  }
  return restored;
}

async function translateBatch(texts, targetLang) {
  if (!texts.length) return [];

  const body = JSON.stringify({
    q: texts,
    source: 'en',
    target: targetLang,
    format: 'text',
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      (res) => {
        let data = '';
        // Decode across chunk boundaries so UTF-8 characters are never
        // replaced when a multibyte sequence spans two network chunks.
        res.setEncoding('utf8');
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            if (json.error) {
              reject(new Error(`API error ${json.error.code}: ${json.error.message}`));
            } else {
              resolve(json.data.translations.map((t) => t.translatedText));
            }
          } catch (e) {
            reject(e);
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

/** HTML entity decode (API may return &amp; &#39; etc.) */
function decodeHtml(str) {
  return str
    .replace(/&amp;/g,  '&')
    .replace(/&lt;/g,   '<')
    .replace(/&gt;/g,   '>')
    .replace(/&#39;/g,  "'")
    .replace(/&quot;/g, '"');
}

// ── Website JSON translation ──────────────────────────────────────────────────
async function translateWebsiteLocale(locale, langCode, sourceMap, totalCharCount) {
  const filePath = path.join(WEBSITE_LOCALES_DIR, `${locale}.json`);
  const targetMap = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Find stubs: keys where target value == source English value (passthrough)
  const stubs = {};
  for (const [key, englishValue] of Object.entries(sourceMap)) {
    if (typeof englishValue !== 'string') continue;
    if (INTENTIONAL_SHARED_KEYS.has(key)) continue;
    if (targetMap[key] === undefined || targetMap[key] === englishValue) {
      stubs[key] = englishValue;
    }
  }

  const keys   = Object.keys(stubs);
  const values = Object.values(stubs);
  const protected_ = values.map(protectPlaceholders);
  const maskedTexts = protected_.map(p => p.masked);

  if (!keys.length) {
    console.log(`  [${locale}] nothing to translate`);
    return totalCharCount;
  }

  const charCount = maskedTexts.reduce((sum, value) => sum + value.length, 0);
  totalCharCount += charCount;
  console.log(`  [${locale}] ${keys.length} stubs, ~${charCount} chars`);
  if (SHOW_KEYS) console.log(`    ${keys.join(' | ')}`);

  if (DRY_RUN) return totalCharCount;
  if (totalCharCount > BUDGET) {
    console.warn(`  [${locale}] SKIPPED — would exceed budget of ${BUDGET} chars`);
    return totalCharCount;
  }

  const translated = [];
  for (let i = 0; i < maskedTexts.length; i += BATCH_SIZE) {
    const batch = maskedTexts.slice(i, i + BATCH_SIZE);
    const results = await translateBatch(batch, langCode);
    translated.push(...results);
    process.stdout.write('.');
  }
  console.log('');

  // Write back
  for (let i = 0; i < keys.length; i++) {
    const raw = decodeHtml(translated[i] ?? values[i]);
    targetMap[keys[i]] = restorePlaceholders(raw, protected_[i]);
  }

  fs.writeFileSync(filePath, JSON.stringify(targetMap, null, 2) + '\n', 'utf8');
  console.log(`  [${locale}] ✓ written`);
  return totalCharCount;
}

// ── Mobile Dart translation ───────────────────────────────────────────────────
/**
 * Parse localeString.dart and extract locale maps as plain JS objects.
 * Returns { en_US: {k:v, ...}, ta: {k:v,...}, ... }
 */
function parseDartLocales(content) {
  const result = {};
  for (const locale of DART_LOCALE_NAMES) {
    const { bodyStart, bodyEnd } = dartLocaleRange(content, locale);
    const block = content.slice(bodyStart, bodyEnd);
    const map    = {};
    const pairRe =
      /(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")\s*:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")/g;
    let p;
    while ((p = pairRe.exec(block)) !== null) {
      const key = (p[1] ?? p[2]).replace(/\\(['"])/g, '$1');
      const value = (p[3] ?? p[4]).replace(/\\(['"])/g, '$1');
      map[key] = value;
    }
    result[locale] = map;
  }
  return result;
}

const DART_LOCALE_NAMES = ['en_US', ...Object.keys(LOCALE_CODES)];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function dartLocaleRange(content, locale) {
  const marker = `'${locale}': {`;
  const markerStart = content.indexOf(marker);
  if (markerStart < 0) throw new Error(`Locale map not found: ${locale}`);
  const bodyStart = markerStart + marker.length;
  const laterStarts = DART_LOCALE_NAMES
    .map((name) => content.indexOf(`'${name}': {`, bodyStart))
    .filter((index) => index >= 0);
  const mapEnd = content.indexOf('\n      };', bodyStart);
  const bodyEnd = Math.min(
    ...laterStarts,
    mapEnd >= 0 ? mapEnd : content.length,
  );
  return { bodyStart, bodyEnd };
}

function replaceDartLocaleValues(content, locale, updates) {
  const { bodyStart, bodyEnd } = dartLocaleRange(content, locale);
  let block = content.slice(bodyStart, bodyEnd);
  for (const [key, value] of Object.entries(updates)) {
    const escapedKey = key.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const escapedDoubleKey = key.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const escapedValue = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const pairPattern = new RegExp(
      `(\\n\\s*(?:'${escapeRegex(escapedKey)}'|"${escapeRegex(escapedDoubleKey)}")\\s*:\\s*)(?:'((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)")(\\s*,)`,
      'g',
    );
    let replacements = 0;
    block = block.replace(pairPattern, (_match, prefix, _singleValue, _doubleValue, suffix) => {
      replacements += 1;
      return `${prefix}'${escapedValue}'${suffix}`;
    });
    if (!replacements) {
      const closingMapIndex = block.lastIndexOf('\n        },');
      if (closingMapIndex < 0) {
        throw new Error(`Could not locate end of mobile locale map: ${locale}`);
      }
      const newEntry = `\n          '${escapedKey}': '${escapedValue}',`;
      block =
        block.slice(0, closingMapIndex) +
        newEntry +
        block.slice(closingMapIndex);
    }
  }
  return content.slice(0, bodyStart) + block + content.slice(bodyEnd);
}

async function translateMobileLocale(locale, langCode, sourceMap, dartContent, totalCharCount) {
  const locales = parseDartLocales(dartContent);
  const targetMap = locales[locale] ?? {};

  const stubs = {};
  for (const [key, englishValue] of Object.entries(sourceMap)) {
    if (typeof englishValue !== 'string') continue;
    if (INTENTIONAL_SHARED_KEYS.has(key)) continue;
    if (targetMap[key] === undefined || targetMap[key] === englishValue) {
      stubs[key] = englishValue;
    }
  }

  const keys   = Object.keys(stubs);
  const values = Object.values(stubs);
  const protected_ = values.map(protectPlaceholders);
  const maskedTexts = protected_.map(p => p.masked);

  if (!keys.length) {
    console.log(`  [mobile/${locale}] nothing to translate`);
    return totalCharCount;
  }

  const charCount = maskedTexts.reduce((sum, value) => sum + value.length, 0);
  totalCharCount += charCount;
  console.log(`  [mobile/${locale}] ${keys.length} stubs, ~${charCount} chars`);
  if (SHOW_KEYS) console.log(`    ${keys.join(' | ')}`);

  // Validate that every existing or missing entry can be updated before
  // spending anything on the Translation API.
  replaceDartLocaleValues(dartContent, locale, stubs);

  if (DRY_RUN) return totalCharCount;
  if (totalCharCount > BUDGET) {
    console.warn(`  [mobile/${locale}] SKIPPED — would exceed budget of ${BUDGET} chars`);
    return totalCharCount;
  }

  const translated = [];
  for (let i = 0; i < maskedTexts.length; i += BATCH_SIZE) {
    const batch = maskedTexts.slice(i, i + BATCH_SIZE);
    const results = await translateBatch(batch, langCode);
    translated.push(...results);
    process.stdout.write('.');
  }
  console.log('');

  // Update only translated entries so comments, ordering and duplicate-key
  // diagnostics in the hand-maintained Dart file remain untouched.
  const updates = {};
  for (let i = 0; i < keys.length; i++) {
    const raw = decodeHtml(translated[i] ?? values[i]);
    updates[keys[i]] = restorePlaceholders(raw, protected_[i]);
  }

  const newContent = replaceDartLocaleValues(dartContent, locale, updates);

  fs.writeFileSync(MOBILE_LOCALE_FILE, newContent, 'utf8');
  console.log(`  [mobile/${locale}] ✓ written`);
  return totalCharCount;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('═══════════════════════════════════════════');
  console.log(' Teksage Locale Translator');
  console.log(DRY_RUN ? ' MODE: DRY-RUN (no API calls)' : ' MODE: TRANSLATE');
  console.log('═══════════════════════════════════════════');

  let totalChars = 0;

  // ── Website ──
  if (!SKIP_WEBSITE) {
    console.log('\n▶ Website JSON files');
    const sourceMap = JSON.parse(
      fs.readFileSync(path.join(WEBSITE_LOCALES_DIR, 'en_US.json'), 'utf8')
    );

    for (const [locale, langCode] of Object.entries(LOCALE_CODES)) {
      if (!ONLY_LANGS.includes(locale)) continue;
      totalChars = await translateWebsiteLocale(locale, langCode, sourceMap, totalChars);
    }
  }

  // ── Mobile ──
  if (!SKIP_MOBILE) {
    console.log('\n▶ Mobile localeString.dart');
    if (!fs.existsSync(MOBILE_LOCALE_FILE)) {
      console.warn('  Mobile locale file not found, skipping.');
    } else {
      let dartContent = fs.readFileSync(MOBILE_LOCALE_FILE, 'utf8');
      const locales = parseDartLocales(dartContent);
      const sourceMap = locales['en_US'] ?? {};

      for (const [locale, langCode] of Object.entries(LOCALE_CODES)) {
        if (!ONLY_LANGS.includes(locale)) continue;
        // Re-read after each write so we have latest content
        dartContent = fs.readFileSync(MOBILE_LOCALE_FILE, 'utf8');
        totalChars = await translateMobileLocale(locale, langCode, sourceMap, dartContent, totalChars);
      }
    }
  }

  console.log('\n═══════════════════════════════════════════');
  console.log(` Total characters: ${totalChars.toLocaleString()}`);
  console.log(` Free-tier budget: ${FREE_TIER_CHARS.toLocaleString()}`);
  console.log(` Budget used: ${((totalChars / FREE_TIER_CHARS) * 100).toFixed(1)}%`);
  if (DRY_RUN) {
    console.log('\n DRY-RUN complete. No files were modified.');
    console.log(' Run with --api-key=YOUR_KEY to apply translations.');
  } else {
    console.log('\n All translations applied!');
  }
  console.log('═══════════════════════════════════════════');
}

main().catch(e => {
  console.error('Fatal error:', e.message);
  process.exit(1);
});
