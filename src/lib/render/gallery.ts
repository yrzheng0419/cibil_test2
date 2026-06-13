import type { Lang, GalleryItem } from '../../types';
import { escapeHtml, pickField, assetUrl } from '../dom';

// Shared renderer for the Activities timeline (Spec §10). Produces the full
// year-grouped, alternating-aligned structure for a single container.

const TYPE_META: Record<GalleryItem['type'], { en: string; zh: string; cls: string }> = {
  academic: { en: 'Academic', zh: '學術', cls: 'pill-academic' },
  extracurricular: { en: 'Extracurricular', zh: '課外', cls: 'pill-extra' },
};

function card(g: GalleryItem, lang: Lang): string {
  const src = assetUrl('gallery', g.photo_filename, 'default.jpg');
  const fallback = assetUrl('gallery', '', 'default.jpg');
  const title = escapeHtml(pickField(g.title_en, g.title_zh, lang));
  const t = TYPE_META[g.type];
  const typeLabel = lang === 'zh' ? t.zh : t.en;
  const hasRemark = g.remark && g.remark.toUpperCase() !== 'NA';
  const remark = hasRemark
    ? `<div class="mt-2 border-t border-brand-light/60 pt-2 text-xs leading-snug text-body">${escapeHtml(g.remark)}</div>`
    : '';
  return `<div class="w-[180px] shrink-0 overflow-hidden rounded-lg border border-brand-light/60 bg-surface">
      <div class="aspect-[4/3] bg-brand-wash">
        <img src="${src}" alt="${title}" class="h-full w-full object-cover" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">
      </div>
      <div class="p-3">
        <span class="pill-group ${t.cls}">${typeLabel}</span>
        <p class="mt-1.5 text-sm font-medium leading-snug text-heading">${title}</p>
        <p class="mt-0.5 font-mono text-xs text-muted">${escapeHtml(g.date)}</p>
        ${remark}
      </div>
    </div>`;
}

export function renderActivities(gallery: GalleryItem[], lang: Lang): string {
  if (!gallery.length) {
    return `<p class="py-8 text-muted">${lang === 'zh' ? '尚無資料' : 'No records yet'}</p>`;
  }

  const byYear = new Map<string, GalleryItem[]>();
  for (const g of gallery) {
    const y = g.date.slice(0, 4);
    const arr = byYear.get(y);
    if (arr) arr.push(g);
    else byYear.set(y, [g]);
  }
  const years = [...byYear.keys()].sort((a, b) => b.localeCompare(a));

  return years
    .map((y) => {
      // Even years align left, odd years align right (desktop); Spec §10.
      const right = parseInt(y, 10) % 2 !== 0;
      const items = byYear
        .get(y)!
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((g) => card(g, lang))
        .join('');
      return `<div class="year-group ${right ? 'md:ml-auto md:text-right' : 'md:mr-auto'}">
          <h2 class="year-heading">${y}</h2>
          <div class="card-row mt-3 flex gap-4 overflow-x-auto pb-2 text-left ${right ? 'md:justify-end' : ''}">${items}</div>
        </div>`;
    })
    .join('');
}
