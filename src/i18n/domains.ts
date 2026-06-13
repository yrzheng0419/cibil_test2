import type { Domain } from '../types';

type D = Exclude<Domain, 'NA'>;

/** URL/DOM-safe slug per domain (domain names contain spaces). */
export const DOMAIN_SLUG: Record<D, string> = {
  'Medical Image': 'medical',
  'Smart Agriculture': 'agri',
  'Medical Data': 'data',
  Biosensing: 'biosense',
};

/** Bilingual display labels (Spec §8 / README §9). */
export const DOMAIN_LABELS: Record<D, { en: string; zh: string }> = {
  'Medical Image': { en: 'Medical Image', zh: '醫療影像' },
  'Smart Agriculture': { en: 'Smart Agriculture', zh: '智慧農業' },
  'Medical Data': { en: 'Medical Data', zh: '醫療資料' },
  Biosensing: { en: 'Biosensing', zh: '生物感測' },
};

/** Inline line-icons (24×24, currentColor) for the Research domain tabs. */
export const DOMAIN_ICONS: Record<D, string> = {
  'Medical Image':
    '<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  'Smart Agriculture':
    '<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6"><path d="M12 20c0-6 3-10 8-11-1 6-4 9-8 9z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 20V9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  'Medical Data':
    '<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6"><path d="M4 19V5M4 19h16M7 15l3-4 3 3 4-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  Biosensing:
    '<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M12 4v3.5M12 16.5V20M4 12h3.5M16.5 12H20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
};
