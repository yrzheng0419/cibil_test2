// Google Sheets "publish to web" CSV URLs (Spec §13, README §10 troubleshooting).
//
// To obtain these: open the Sheet → File → Share → Publish to web →
// pick each worksheet → CSV. Paste the resulting URLs below.
// Until real URLs are set, the data layer falls back to empty arrays so the
// build never breaks (Spec gap #6).
//
// PLACEHOLDERS — replace before launch (Spec §17 outstanding item).
export const SHEET_CSV_URLS = {
  members: '',
  publications: '',
  gallery: '',
} as const;

/** sessionStorage keys for client-side caching of fetched CSV (per session). */
export const CACHE_KEYS = {
  members: 'cibi:members',
  publications: 'cibi:publications',
  gallery: 'cibi:gallery',
} as const;

/** id of the inline JSON island Astro bakes the build-time dataset into. */
export const DATA_ISLAND_ID = 'cibi-data';

/** localStorage key for the active language preference. */
export const LANG_KEY = 'cibi:lang';
