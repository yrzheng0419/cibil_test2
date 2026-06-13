import type { SheetData } from '../types';
import { SHEET_CSV_URLS, CACHE_KEYS } from '../constants/sheets';
import { parseMembers } from './parse/members';
import { parsePublications } from './parse/publications';
import { parseGallery } from './parse/gallery';

const isBrowser = typeof window !== 'undefined';

/**
 * Fetches one CSV URL as text. In the browser, results are cached in
 * sessionStorage so navigating between pages doesn't re-hit Google.
 * Returns '' on any failure or when the URL is unset (build-resilience,
 * Spec gap #6) — callers degrade to empty arrays.
 */
async function fetchCsv(url: string, cacheKey?: string): Promise<string> {
  if (!url) return '';

  if (isBrowser && cacheKey) {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached !== null) return cached;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    if (isBrowser && cacheKey) sessionStorage.setItem(cacheKey, text);
    return text;
  } catch (err) {
    console.warn(`[fetchSheets] failed to fetch CSV (${url}):`, err);
    return '';
  }
}

/**
 * Fetches + parses all three worksheets into typed data.
 * Used at build time (Node) for prerender and on the client for the
 * background refresh. `forceFresh` bypasses the sessionStorage cache.
 */
export async function fetchAllSheets(forceFresh = false): Promise<SheetData> {
  const keys = forceFresh
    ? { members: undefined, publications: undefined, gallery: undefined }
    : CACHE_KEYS;

  const [membersCsv, publicationsCsv, galleryCsv] = await Promise.all([
    fetchCsv(SHEET_CSV_URLS.members, keys.members),
    fetchCsv(SHEET_CSV_URLS.publications, keys.publications),
    fetchCsv(SHEET_CSV_URLS.gallery, keys.gallery),
  ]);

  return {
    members: parseMembers(membersCsv),
    publications: parsePublications(publicationsCsv),
    gallery: parseGallery(galleryCsv),
  };
}

/** Empty dataset — useful as a guaranteed-safe default. */
export const EMPTY_DATA: SheetData = {
  members: [],
  publications: [],
  gallery: [],
};
