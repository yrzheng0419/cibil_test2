import type { BiPair } from '../i18n/content';
import type { Lang } from '../types';

/** Escapes a string for safe interpolation into HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Prefixes a path with the configured GitHub Pages base (Spec gap #3). */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/**
 * Builds a URL for an asset under public/assets/<folder>/, using `fallback`
 * when no filename is provided (Spec §10/§14 default placeholders).
 */
export function assetUrl(
  folder: string,
  filename: string | undefined | null,
  fallback: string,
): string {
  const name = filename && filename.trim() && filename.trim() !== 'NA'
    ? filename.trim()
    : fallback;
  return withBase(`assets/${folder}/${name}`);
}

/** Picks a language from a bilingual pair, falling back to EN (Spec §15). */
export function pick(pair: BiPair, lang: Lang): string {
  const value = lang === 'zh' ? pair.zh : pair.en;
  return value && value.trim() ? value : pair.en;
}

/** Picks from raw _en/_zh fields with EN fallback (Spec §15). */
export function pickField(en: string, zh: string, lang: Lang): string {
  if (lang === 'zh') return zh && zh.trim() ? zh : en;
  return en;
}
