import { LANG_KEY } from '../constants/sheets';
import type { Lang } from '../types';

// Language toggle (Spec §4, §15). Sets <html data-lang>, persists to
// localStorage, and dispatches `cibi:lang` so dynamic renderers can re-render.
// Static markup switches purely via CSS (.lang-en / .lang-zh in global.css).

export function getLang(): Lang {
  const stored = document.documentElement.getAttribute('data-lang');
  return stored === 'zh' ? 'zh' : 'en';
}

function setLang(lang: Lang): void {
  document.documentElement.setAttribute('data-lang', lang);
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    /* private mode — ignore */
  }
  document.dispatchEvent(new CustomEvent<Lang>('cibi:lang', { detail: lang }));
}

export function initLangToggle(): void {
  // Ensure data-lang is set (inline head script normally handles first paint).
  if (!document.documentElement.getAttribute('data-lang')) {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(LANG_KEY);
    } catch {
      /* ignore */
    }
    document.documentElement.setAttribute(
      'data-lang',
      stored === 'zh' ? 'zh' : 'en',
    );
  }

  const btn = document.getElementById('lang-toggle');
  if (!btn || btn.dataset.bound === 'true') return;
  btn.dataset.bound = 'true';
  btn.addEventListener('click', () => {
    setLang(getLang() === 'en' ? 'zh' : 'en');
  });
}
